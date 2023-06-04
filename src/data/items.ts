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

export interface Trackable {
    value: number;
    goal?: number;
}

export type TallyItemTrackable = TallyItem & Trackable;

export const items: TallyItem[] = [
    {
        title: 'Push-ups',
        id: 'push-ups',
        unit: TallyUnit.SINGLE
    },
    {
        title: 'Squats',
        id: 'squats',
        unit: TallyUnit.NONE
    },
    {
        title: 'Burpees',
        id: 'burpess',
        unit: TallyUnit.NONE
    },
    {
        title: 'Meditation',
        id: 'meditation',
        unit: TallyUnit.MINUTES
    }
]
