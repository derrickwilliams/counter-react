import { useNavigate } from "react-router-dom";

export const Dashboard = () => {
    const n = useNavigate();

    const goTo = (counterId: string) => () => {
        n(`counters/${counterId}`);
    }

    return <>
        <ul className="counter-list">
            <li onClick={goTo('1')}>Counter #1</li>
            <li onClick={goTo('2')}>Counter #2</li>
            <li onClick={goTo('3')}>Counter #3</li>
            <li onClick={goTo('4')}>Counter #4</li>
            <li onClick={goTo('5')}>Counter #5</li>
        </ul>
    </>
};

