import { useOutletContext } from "react-router-dom"
import { CatalogControl } from "../data/catalog"
import { useEffect, useMemo, useState } from "react";
import { CatalogItemForm } from "../lib/CatalogItemForm";
import { TallyItem } from "../data/types";
import { List } from "../system/Lists";
import { IconLink } from "../system/icons";

export const Settings = () => {
    const catalog = useOutletContext<CatalogControl>();
    const [target, setTarget] = useState<TallyItem | null>(null);
    const items = useMemo(() => {
        console.log('catalog is new');

        return catalog.getItems();
    }, [catalog]);

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
