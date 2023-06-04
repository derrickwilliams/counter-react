export enum TallyUnit {
    NONE = 'NONE',
    MINUTES = 'MINUTES',
    SINGLE = 'SINGLE'
}

export interface TallyItem {
    title: string;
    id: string;
    unit: TallyUnit;
}

export type Catalog = { [id: string]: TallyItem }

export interface Trackable {
    value: number;
    goal?: number;
}

export type TallyItemTrackable = TallyItem & Trackable;
