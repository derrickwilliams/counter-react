import { cloneDeep } from 'lodash';
import DB from '../../db/db.json';
import { Db as DbInterface, Trackable, TallySet, TallySetTrackable } from './types';

export interface DbControl {
    getTrackables: () => Trackable[];
    getTrackableById: (id: string) => Trackable | null;
    getTallySets: () => TallySet[];
    getTallySetById: (id: string) => TallySet | null;
    getTallySetTrackables: (setId: string) => TallySetTrackable[];
}

export const initDb = () => {
    const DATA = cloneDeep(DB) as DbInterface

    const getTrackables = () => DATA.trackables;
    const getTrackableById = (id: string) => getTrackables().find(
        t => {
            return t.id === id
        }
    ) ?? null;
    const getTallySets = () => DATA.tallySets;
    const getTallySetById = (id: string) => {
        const trackableForSet = getTallySetTrackables(id);

        return {
            ...getTallySets().find(ts => ts.id === id) ?? {},
            items: trackableForSet
        };
    }
    const getTallySetTrackables = (setId: string) => {
        const allTrackables = DB.tallySetTrackables;

        const setTrackbles = allTrackables.filter(tt => {
            return tt.tallySetId === setId
        });

        return setTrackbles.reduce<TallySetTrackable[]>((all, t) => {
            const trackableFull = getTrackableById(t.trackableId);

            if (!trackableFull) {
                const err = `Trackable not found ${t.id}`;
                console.error(err);
                throw new Error(err);
            }

            return [
                ...all,
                {
                    ...t,
                    ...trackableFull,
                    id: t.id
                }
            ];
        }, [])
    }

    return {
        getTrackables,
        getTrackableById,
        getTallySets,
        getTallySetById,
        getTallySetTrackables
    };
}
