import { useEffect, useCallback } from "react";

export const noop = () => undefined;

export const useOnMount = (cb: () => void) => {
    const mountCb = useCallback(() => {
        console.log('new useOnMount callback', cb)
        cb()
    }, [cb]);

    useEffect(mountCb, [mountCb]);
}

export type Empty<T> = T | null | undefined;
