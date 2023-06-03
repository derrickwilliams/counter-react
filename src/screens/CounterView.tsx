import { FC, useState } from "react";
import { Modal, ModalProps } from "../Modal";
import { NavToDashboard } from "../lib/navButtons"

enum CountUnit {
    NONE = 'NONE',
    MINUTES = 'MINUTES'
}

interface CounterItem {
    title: string;
    id: string;
    unit: CountUnit;
    value: number;
    goal?: number;
}

const counterData: CounterItem[] = [
    {
        title: 'Push-ups',
        id: 'push-ups',
        unit: CountUnit.NONE,
        value: 23,
        goal: 100
    },
    {
        title: 'Squats',
        id: 'squats',
        unit: CountUnit.NONE,
        value: 77,
        goal: 100
    },
    {
        title: 'Burpees',
        id: 'burpess',
        unit: CountUnit.NONE,
        value: 30,
        goal: 100
    },
    {
        title: 'Meditation',
        id: 'meditation',
        unit: CountUnit.MINUTES,
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
    return <div className="date-display">{props.currentDate.toDateString()}</div>;
};


interface CounterItemProps {
    item: CounterItem;
    onClick: (item: CounterItem) => void;
}

const CounterItem: FC<CounterItemProps> = ({ item, onClick }) => {
    return (
        <div className="counter-item-list-item" onClick={() => onClick(item)}>
            <div className="item-title">{item.title}</div>
            <div className="item-value">{item.value}</div>
        </div>
    )
};

export const CounterView = () => {
    const [selectedModal, setSelectedModal] = useState<CounterItem | null>(null);

    return <>
        <div className="counter-view-action-bar">
            <NavToDashboard />
            <DatePicker currentDate={new Date()} />
        </div>
        <div className="counter-item-list" >
            {counterData.map((item, idx) =>
                <CounterItem key={idx} onClick={() => setSelectedModal(item)} item={item} />
            )}
        </div>
        {selectedModal &&
            <CounterItemModal
                item={selectedModal}
                isOpen={true}
                onClose={() => setSelectedModal(null)}
            />
        }
    </>
}

interface CounterItemModalProps extends ModalProps, Omit<CounterItemProps, 'onClick'> {}
const CounterItemModal = ({
    item,
    ...props
}: CounterItemModalProps) => {
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
            <div className="counter-item-view">
                <h2 className="item-title">{item.title}</h2>
                <h3 className="item-value">{currentValue}</h3>
            </div>

            <div className="counter-item-view-actions">
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
