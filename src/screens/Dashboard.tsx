import { useNavigate } from "react-router-dom";
import { useCatalogData } from "../data/Catalog.tsx";
import { useOnMount } from "../utils.ts";

export const Dashboard = () => {
    const n = useNavigate();
    const { loadTallySet, tallySets } = useCatalogData()
    const goTo = (tallyId: string) => () => {
        n(`tallies/${tallyId}`);
    }

    useOnMount(loadTallySet);

    return <>
        <ul className="t-list">
            {!!tallySets.length && tallySets.map((set) => <li onClick={goTo(set.id)}>{set.name}</li>)}
        </ul>
    </>
};

