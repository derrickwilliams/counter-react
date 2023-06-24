import { FC } from 'react';
import { TallySetTrackableWithValue } from '../data/types';

export interface TallyListItemProps {
    item: TallySetTrackableWithValue;
    onClick: (item: TallySetTrackableWithValue) => void;
}

export const TallyListItem: FC<TallyListItemProps> = ({ item, onClick }) => {
    return (
        <div className="tally-item-list-item" onClick={() => onClick(item)}>
            <div className="item-title">{item.name}</div>
            <div className="item-value">
                {item.value} / {item.goal}
            </div>
        </div>
    );
};
