import { FC } from "react";
import { noop } from "../utils";

export interface ListItem {
    key: string;
    text: string;
    action?: (key: string) => void;
}

interface ListProps {
    items: ListItem[]
}

export const List: FC<ListProps> = ({ items }) => {
    return (
        <ul className="t-list">
            {items.map(({ key, text, action = noop }) => {
                return <li onClick={() => action(key)}>{text}</li>
            })}
        </ul>
    )
}
