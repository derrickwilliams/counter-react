import { FC, useState } from "react";
import { Modal, ModalProps } from "../Modal";
import { Calendar } from "../system/icons";

import './TallyListView.css';

enum TallyUnit {
    NONE = 'NONE',
    MINUTES = 'MINUTES'
}

interface TallyItem {
    title: string;
    id: string;
    unit: TallyUnit;
    value: number;
    goal?: number;
}

const counterData: TallyItem[] = [
    {
        title: 'Push-ups',
        id: 'push-ups',
        unit: TallyUnit.NONE,
        value: 23,
        goal: 100
    },
    {
        title: 'Squats',
        id: 'squats',
        unit: TallyUnit.NONE,
        value: 77,
        goal: 100
    },
    {
        title: 'Burpees',
        id: 'burpess',
        unit: TallyUnit.NONE,
        value: 30,
        goal: 100
    },
    {
        title: 'Meditation',
        id: 'meditation',
        unit: TallyUnit.MINUTES,
        value: 12,
        goal: 30
    }
];

interface DatePickerProps {
    currentDate: Date;
    allowNext?: boolean;
    allowPrev?: boolean;
}

const DatePicker = (props: DatePickerProps) => {
    return <div>
        <Calendar className="date-display" /><span className="date-display">{props.currentDate.toDateString()}</span>
    </div>
};


interface TallyItemProps {
    item: TallyItem;
    onClick: (item: TallyItem) => void;
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
    const [selectedModal, setSelectedModal] = useState<TallyItem | null>(null);

    return <>
        <div className="tally-view-action-bar">
            <DatePicker currentDate={new Date()} />
        </div>
        <div className="tally-item-list" >
            {counterData.map((item, idx) =>
                <TallyItem key={idx} onClick={() => setSelectedModal(item)} item={item} />
            )}
        </div>
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
