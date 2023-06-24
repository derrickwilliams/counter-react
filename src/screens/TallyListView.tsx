import { useEffect, useState } from 'react';

import './TallyListView.css';
import { useCatalogData } from '../data/Catalog.tsx';
import { useParams } from 'react-router-dom';
import {
    TallySetTrackableWithValue,
    TallySetTrackable,
} from '../data/types.ts';
import { Dbg } from '../lib/Dbg.tsx';
import { DatePicker } from '../lib/DatePicker.tsx';
import { TallyItemModal } from '../lib/TallyItemModal.tsx';
import { TallyList } from '../lib/TallyList.tsx';

import trackingData from '../../db/tracking.json';

const calculateTotals = (
    history: typeof trackingData.history,
    items: TallySetTrackable[]
) => {
    const trackableTotals = items.reduce<TrackingTotals>((totals, item) => {
        const itemHistory = history.filter(
            (h) => h.tallySetTrackableId === item.id
        );
        const itemTotal = itemHistory.reduce((total, i) => total + i.value, 0);
        const newTotals = {
            ...totals,
            [item.id]: itemTotal,
        };

        return newTotals;
    }, {});

    return items.map((trackable) => {
        return {
            ...trackable,
            value: trackableTotals[trackable.id],
        };
    });
};

type TrackingTotals = Record<string, number>;

export const TallyListView = () => {
    const { tallySetId } = useParams();
    const [selectedModal, setSelectedModal] =
        useState<TallySetTrackableWithValue | null>(null);
    const [currentDate, setCurrentDate] = useState('2023-06-03');
    const { loadTallySetById, tallySet } = useCatalogData();
    const [tallySetTrackables, setTallySetTrackables] = useState<
        TallySetTrackableWithValue[]
    >([]);

    useEffect(() => {
        tallySetId && loadTallySetById(tallySetId);
    }, [loadTallySetById, tallySetId]);

    useEffect(() => {
        if (!tallySet) {
            return;
        }
        const trackablesWithTotal = calculateTotals(
            trackingData.history,
            tallySet.items
        );
        setTallySetTrackables(trackablesWithTotal);
    }, [tallySet]);

    return (
        <>
            <div className="tally-view-action-bar">
                <DatePicker
                    currentDate={new Date(currentDate)}
                    onDateChanged={(d) => {
                        d.date && setCurrentDate(d.date);
                    }}
                />
            </div>

            <TallyList
                tallies={tallySetTrackables}
                onItemSelected={setSelectedModal}
            >
                <div>no tallies for {currentDate}</div>
            </TallyList>

            <Dbg>
                <pre>{JSON.stringify(tallySet, null, 2)}</pre>
            </Dbg>

            {selectedModal && (
                <TallyItemModal
                    item={selectedModal}
                    isOpen={true}
                    onClose={() => setSelectedModal(null)}
                    onSubmit={(trackableId, value) =>
                        console.log('trackable submitted', trackableId, value)
                    }
                />
            )}
        </>
    );
};
