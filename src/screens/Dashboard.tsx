import { useNavigate } from "react-router-dom";

export const Dashboard = () => {
    const n = useNavigate();

    const goTo = (tallyId: string) => () => {
        n(`tallies/${tallyId}`);
    }

    return <>
        <ul className="counter-list">
            <li onClick={goTo('1')}>Tally #1</li>
            <li onClick={goTo('2')}>Tally #2</li>
            <li onClick={goTo('3')}>Tally #3</li>
            <li onClick={goTo('4')}>Tally #4</li>
            <li onClick={goTo('5')}>Tally #5</li>
        </ul>
    </>
};

