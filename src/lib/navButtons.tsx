import { useNavigate } from "react-router-dom"
import { GoGear, GoHome } from 'react-icons/go';
import { FC } from "react";

export const NavToSettings = () => <NavTo path="/settings" Icon={GoGear}/>

export const NavToDashboard = () => <NavTo path="/" Icon={GoHome} />

export const NavTo = ({ text, path, Icon}: { text?: string, path: string, Icon?: FC }) => {
    const n = useNavigate();

    return <button onClick={() => n(path)}>{Icon ? <Icon /> : text ? text : ''}</button>
}
