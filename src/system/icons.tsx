import { ReactComponent as TallyFull }  from '../assets/tally-full.svg';
import { ReactComponent as TallyFullInverse }  from '../assets/tally-full-inverse.svg';
import { ReactComponent as TallyInitial }  from '../assets/tally-initial.svg';
import { ReactComponent as TallyInitialInverse }  from '../assets/tally-initial-inverse.svg';
import { GrAdd as Add, GrCircleQuestion as Question } from 'react-icons/gr';
import { FC } from 'react';
import { noop } from '../utils';


interface TallyBrandProps {
    full?: boolean;
    inverse?: boolean;
    onClick?: () => void;
}
export const TallyBrand: FC<TallyBrandProps> = ({ full = false, inverse = false, onClick = noop }: TallyBrandProps) => {
    const C = full
        ? (inverse ? TallyFullInverse : TallyFull)
        : (inverse ? TallyInitialInverse : TallyInitial)

    return <C onClick={onClick} />
}

const iconKeyMap = {
    "question": Question,
    "add": Add,
} as const

type IconKeyMap = typeof iconKeyMap;

interface IconLinkProps {
    onClick: () => void;
    icon: keyof IconKeyMap;
}

export const IconLink: FC<IconLinkProps> = ({ onClick, icon }) => {
    const I = iconKeyMap[icon] ?? iconKeyMap['question'];

    return <I onClick={onClick} />
}

export { GrAdd as Add, GrCalendar as Calendar } from 'react-icons/gr';
