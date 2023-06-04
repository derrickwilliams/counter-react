import { FC, useCallback, useEffect, useRef, useState } from "react";
import { Modal, ModalProps } from "../Modal";
import { Calendar } from "../system/icons";

import { TallyItemTrackable as TallyItemInterface } from '../data/types';
import { getByDateKey } from '../data/data';

import './TallyListView.css';

type Empty<T> = T | null | undefined;

interface DatePickerProps {
    currentDate: Date;
    allowNext?: boolean;
    allowPrev?: boolean;
    static?: boolean;
    onDateChanged?: (changed: OnDateChangedArgs) => void;
}

interface OnDateChangedArgs {
    date: Empty<string>;
    timestamp: Empty<number>;
}

const DatePicker = (props: DatePickerProps) => {
    const { onDateChanged } = props;
    const dateInputRef = useRef<HTMLInputElement>(null);
    const handleDateChanged = useCallback(() => {
        console.log('making new callback');
        onDateChanged && onDateChanged({
            date: dateInputRef.current?.value,
            timestamp: dateInputRef.current?.valueAsNumber
        });
    }, [onDateChanged]);

    return <div className="t-date-picker">
        {!props.static &&
            <input type="date" className="t-input" ref={dateInputRef} onChange={handleDateChanged}/>}
        {props.static &&
            <>
                <span className="date-display">{props.currentDate.toDateString()}</span>
                <Calendar className="date-display" />
            </>
        }
    </div>
};
interface TallyItemProps {
    item: TallyItemInterface;
    onClick: (item: TallyItemInterface) => void;
}

const TallyItem: FC<TallyItemProps> = ({ item, onClick }) => {
    return (
        <div className="tally-item-list-item" onClick={() => onClick(item)}>
            <div className="item-title">{item.title}</div>
            <div className="item-value">{item.value}</div>
        </div>
    )
};

export const TallyListView = () => {
    const [selectedModal, setSelectedModal] = useState<TallyItemInterface | null>(null);
    const [currentDate, setCurrentDate] = useState('2023-06-03');
    const [tallies, setTallies] = useState(getByDateKey(currentDate))

    useEffect(() => {
        setTallies(getByDateKey(currentDate))
    }, [currentDate]);

    return <>
        <div className="tally-view-action-bar">
            <DatePicker currentDate={new Date(currentDate)} onDateChanged={(d) => {
                console.log('date changed', d)
                d.date && setCurrentDate(d.date)
            }} />
        </div>
        {tallies.length > 0 &&
            <div className="tally-item-list">
                {tallies.map((item, idx) =>
                    <TallyItem key={idx} onClick={() => setSelectedModal(item)} item={item} />
                )}
            </div>
        }
        {tallies.length === 0 &&
            <div>no tallies for {currentDate}</div>
        }
        {selectedModal &&
            <TallyItemModal
                item={selectedModal}
                isOpen={true}
                onClose={() => setSelectedModal(null)}
            />
        }
    </>
}

interface TallyItemModalProps extends ModalProps, Omit<TallyItemProps, 'onClick'> {}
const TallyItemModal = ({
    item,
    ...props
}: TallyItemModalProps) => {
    const originalValue = item.value;
    const [currentValue, setCurrentValue] = useState(originalValue);

    const handleIncrement = (amount: number) => () => {
        setCurrentValue((curr) => curr + amount);
    };

    const handleReset = () => {
        setCurrentValue(originalValue);
    }

    return (
        <Modal {...props} fullscreen>
            <div className="tally-item-view">
                <h2 className="item-title">{item.title}</h2>
                <h3 className="item-value">{currentValue}</h3>
            </div>

            <div className="tally-item-view-actions">
                <button onClick={handleIncrement(1)}>+ 1</button>
                <button onClick={handleIncrement(5)}>+ 5</button>
                <button onClick={handleIncrement(10)}>+ 10</button>
                <button className="reset" onClick={handleReset}>↩︎</button>
                <button className="submit" onClick={() => {
                    alert(`current value: ${currentValue}`)
                }}>→</button>
            </div>
        </Modal>
    );
}
