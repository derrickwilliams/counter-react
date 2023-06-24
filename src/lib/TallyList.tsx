import { FC, PropsWithChildren } from 'react';
import { TallySetTrackableWithValue } from '../data/types';
import { TallyListItem } from './TallyListItem';
import { noop } from '../utils';

interface TallyListProps {
    tallies: TallySetTrackableWithValue[];
    onItemSelected: (selected: TallySetTrackableWithValue) => void;
}

export const TallyList: FC<PropsWithChildren<TallyListProps>> = ({
    tallies,
    onItemSelected = noop,
    children,
}) => {
    return (
        <>
            {tallies.length === 0 && children}

            {tallies.length > 0 && (
                <div className="tally-item-list">
                    {tallies.map((item, idx) => (
                        <TallyListItem
                            key={idx}
                            onClick={() => onItemSelected(item)}
                            item={item}
                        />
                    ))}
                </div>
            )}
        </>
    );
};
