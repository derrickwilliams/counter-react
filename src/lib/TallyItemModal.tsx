import { useState } from 'react';
import { ModalProps, Modal } from '../Modal';
import { TallyListItemProps } from './TallyListItem';
import { noop } from '../utils';

interface TallyItemModalProps
    extends ModalProps,
        Omit<TallyListItemProps, 'onClick'> {
    onSubmit?: (trackableId: string, value: number) => void;
}
export const TallyItemModal = ({
    item,
    onSubmit = noop,
    ...props
}: TallyItemModalProps) => {
    const originalValue = item.value;
    const [currentValue, setCurrentValue] = useState(originalValue);

    const handleIncrement = (amount: number) => () => {
        setCurrentValue((curr) => curr + amount);
    };

    const handleReset = () => {
        setCurrentValue(originalValue);
    };

    return (
        <Modal {...props} fullscreen>
            <div className="tally-item-view">
                <h2 className="item-title">{item.name}</h2>
                <h3 className="item-value">{currentValue}</h3>
            </div>

            <div className="tally-item-view-actions">
                <button onClick={handleIncrement(1)}>+ 1</button>
                <button onClick={handleIncrement(5)}>+ 5</button>
                <button onClick={handleIncrement(10)}>+ 10</button>
                <button className="reset" onClick={handleReset}>
                    ↩︎
                </button>
                <button
                    className="submit"
                    onClick={() => onSubmit(item.id, currentValue)}
                >
                    →
                </button>
            </div>
        </Modal>
    );
};
