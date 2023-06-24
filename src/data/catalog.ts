// import { TallyItem, TallyItemTrackable, TallySets, Trackable } from "./types"
import catalogData from './catalog.json';
import l from 'lodash';

type EntityId = string;
type IdMap<T> = Record<EntityId, T>;
type HasGoal = { goal: number }

export const TallyUnit = {
    NONE: 'NONE',
    MINUTE: 'MINUTE',
    SINGLE: 'SINGLE'
} as const
export type TallyUnit = keyof typeof TallyUnit | string
export interface Trackable {
    title: string;
    id: string;
    unit: TallyUnit;
}
export type TrackableIdMap = IdMap<Trackable>;
export type SetTrackable = Trackable & HasGoal;
export type SetTrackableIdMap = IdMap<SetTrackable>;
export type TallySet = {
    id: string;
    title: string;
    items: SetTrackableIdMap;
}
export type TallySets = TallySet[];

export interface CatalogData {
    trackables: TrackableIdMap;
    tallySets: TallySets
}

export interface CatalogControl {
    getTrackables: () => TrackableIdMap;
    getTallySets: () => TallySets;
    getTrackableById: (id: string) => Trackable;
}

export const initCatalog = (): Promise<CatalogControl> => {
    const dataInstance: CatalogData = l.cloneDeep(catalogData);

    console.log('dataInstance', dataInstance);

    const getTrackableItems = () => {
        return Object.values(dataInstance.tallyItems);
    };

    const getTallySets = () => {
        return dataInstance.tallySets;
    }

    const getTrackableItemById = (id: string) =>
        dataInstance.tallyItems[id]

    return new Promise((res) => {
        return res({ getTrackableItems, getTallySets, getTrackableItemById });
    });
}
