import { TallyItem, TallyUnit } from './types';

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
