const TallyUnit = {
    NONE: 'NONE',
    MINUTE: 'MINUTE',
    SINGLE: 'SINGLE'
} as const

export type TallyUnit = keyof typeof TallyUnit | string

export interface Db {
    trackables: Trackable[];
    tallySets: TallySet[];
    tallySetTrackables: TallySetTrackable[];
    trackingEntries: TrackingEntry[];
}

export interface Trackable {
    id: string;
    name: string;
    unit: TallyUnit;
}

export interface TallySet {
    id: string;
    name: string;
    items: TallySetTrackable[]
}

export interface TallySetTrackable extends Trackable {
    id: string;
    trackableId: string;
    tallySetId: string;
    goal: number;
}

export interface TallySetTrackableWithValue extends TallySetTrackable {
    value: number;
}

export interface TrackingEntry {
    tallySetTrackableId: string;
    date: number;
    value: number;
}
