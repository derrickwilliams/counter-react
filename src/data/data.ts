import { TallyItemTrackable, TallyUnit } from "./types";

export const trackedTalliesByDate: { [dateKey: string]: TallyItemTrackable[] } = {
    '2023-06-01': [
        {
            title: 'Push-ups',
            id: 'push-ups',
            unit: TallyUnit.NONE,
            value: 23,
            goal: 22
        },
        {
            title: 'Squats',
            id: 'squats',
            unit: TallyUnit.NONE,
            value: 77,
            goal: 343
        },
        {
            title: 'Burpees',
            id: 'burpess',
            unit: TallyUnit.NONE,
            value: 30,
            goal: 56
        },
        {
            title: 'Meditation',
            id: 'meditation',
            unit: TallyUnit.MINUTES,
            value: 12,
            goal: 77
        }
    ],
    '2023-06-02': [
        {
            title: 'Push-ups',
            id: 'push-ups',
            unit: TallyUnit.NONE,
            value: 31,
            goal: 33
        },
        {
            title: 'Squats',
            id: 'squats',
            unit: TallyUnit.NONE,
            value: 78,
            goal: 45
        },
        {
            title: 'Burpees',
            id: 'burpess',
            unit: TallyUnit.NONE,
            value: 30,
            goal: 89
        },
        {
            title: 'Meditation',
            id: 'meditation',
            unit: TallyUnit.MINUTES,
            value: 12,
            goal: 25
        }
    ]
    ,
    '2023-06-03': [
        {
            title: 'Push-ups',
            id: 'push-ups',
            unit: TallyUnit.NONE,
            value: 100,
            goal: 100
        },
        {
            title: 'Squats',
            id: 'squats',
            unit: TallyUnit.NONE,
            value: 22,
            goal: 32
        },
        {
            title: 'Burpees',
            id: 'burpess',
            unit: TallyUnit.NONE,
            value: 78,
            goal: 65
        },
        {
            title: 'Meditation',
            id: 'meditation',
            unit: TallyUnit.MINUTES,
            value: 23,
            goal: 30
        }
    ]
}

export const getByDateKey = (dateKey: string): TallyItemTrackable[] => {
    const data = trackedTalliesByDate[dateKey] || null;

    return data ?? []
}
