import { ReactComponent as TallyFull }  from '../assets/tally-full.svg';
import { ReactComponent as TallyFullInverse }  from '../assets/tally-full-inverse.svg';
import { ReactComponent as TallyInitial }  from '../assets/tally-initial.svg';
import { ReactComponent as TallyInitialInverse }  from '../assets/tally-initial-inverse.svg';
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

export { GrCalendar as Calendar } from 'react-icons/gr';
