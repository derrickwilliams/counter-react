 import { CatalogContext, useCatalogData } from '../data/Catalog.tsx';
import { useContext, useEffect, useMemo, useState } from "react";
import { CatalogItemForm } from "../lib/CatalogItemForm";
import { TallyItem } from "../data/types";
import { List } from "../system/Lists";
import { IconLink } from "../system/icons";

export const Settings = () => {
    const catalog = useCatalogData();

    const [target, setTarget] = useState<TallyItem | null>(null);
    const items = useMemo(() => catalog.getTrackableItems(), [catalog]);

    useEffect(() => {
        setTarget(items[0])
    }, [items]);


    const handleItemClicked = (...args) => {
        console.log('handleItemClicked', ...args)
    }

    return <>
        <div className="screen-header">
            <h2>Settings Screen</h2>
            <div className="screen-header-actions">
                <IconLink onClick={() => console.log('you lcicked it')} icon="add" />
            </div>
        </div>
        {/* <pre>{JSON.stringify(items, null, 2)}</pre> */}
        {items && <List items={items.map(i => ({
            text: i.title,
            key: i.id,
            action: handleItemClicked
        }))} />}
        {!!target &&
            <CatalogItemForm isOpen fullscreen target={target} onClose={() => setTarget(null) } />
        }
    </>
}
