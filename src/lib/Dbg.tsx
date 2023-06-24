import { FC, PropsWithChildren, useState } from "react";

interface DbgProps {}

export const Dbg: FC<PropsWithChildren<DbgProps>> = ({ children}) => {
    const [isVisible, setIsVisible] = useState<boolean>(false);
    const toggleVisibility = (e) => {
        console.log('it was clicked', e);
        setIsVisible((currentVisibility) => !currentVisibility)
    }
    const visibleAction =
        <a onClick={toggleVisibility}>{isVisible ? 'hide' : 'show'} debug</a>

    return (
        <div>
            <p>{visibleAction}</p>
            {isVisible && children}
        </div>
    );
};

