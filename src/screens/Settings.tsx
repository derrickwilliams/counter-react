import { useOutletContext } from "react-router-dom"
import { CatalogControl } from "../data/catalog"

export const Settings = () => {
    const catalog = useOutletContext<CatalogControl>();
    console.log('settings', catalog)

    return <>
        <h2>Settings Screen</h2>
        <pre>{JSON.stringify(catalog.getItems(), null, 2)}</pre>
    </>
}
