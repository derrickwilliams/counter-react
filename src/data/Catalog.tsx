import { PropsWithChildren, createContext, useEffect, useState, FC, useContext, useCallback } from "react";
import { initDb, DbControl } from "./data";
import { TallySet, Trackable } from './types';

export const noopDbControl = (): DbControl => ({
    getTallySets() {
        return []
    },
    getTrackables() {
        return [];
    },
    getTrackableById() {
        return {} as Trackable;
    },
    getTallySetById() {
        return {} as TallySet;
    },
    getTallySetTrackables() {
        return []
    }
});

export const CatalogContext = createContext<DbControl>(noopDbControl());

type CatalogDataProviderProps = PropsWithChildren<object>

export const CatalogDataProvider: FC<CatalogDataProviderProps> = ({ children }) => {
    const [catalog, setCatalog] = useState<DbControl | null>(null);
    useEffect(() => {
        const db = initDb();

        setCatalog(db);
    }, []);

    return catalog
        ? <CatalogContext.Provider value={catalog}>{children}</CatalogContext.Provider>
        : null;

}

interface UseCatalogDataReturn {
    loadTallySet: () => void;
    loadTallySetById: (id: string) => void;
    // loadTrackableItems: () => void;
    tallySet: TallySet | null,
    tallySets: TallySet[];
    // trackableItems: TallyItem[];
}

export const useCatalogData = (): UseCatalogDataReturn => {
    const ctx = useContext(CatalogContext);

    const [tallySets, setTallySets] = useState<TallySet[]>([]);
    const [targetTallySet, setTargetTallySet] = useState<TallySet | null>(null)
    const loadTallySet = useCallback(() => {
        setTimeout(() => setTallySets(ctx.getTallySets()), 0)
    }, [ctx]);
    const loadTallySetById = useCallback((id: string) => {
        const ts = ctx.getTallySetById(id);
        setTargetTallySet(ts);
    }, [ctx]);
    return {
        loadTallySet,
        loadTallySetById,
        // loadTrackableItems: () => setTimeout(() => setTrackableItems(ctx.getTrackableItems()), 0),
        tallySets,
        tallySet: targetTallySet,
        // trackableItems,
    }
}
