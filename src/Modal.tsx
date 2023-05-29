import { PropsWithChildren } from "react";
import { NavToDashboard } from "./lib/navButtons";
import { useNavigate } from "react-router-dom";

import { AiOutlineAppstoreAdd as AddIcon } from 'react-icons/ai'

export interface ModalProps extends PropsWithChildren {
    isOpen: boolean;
    onClose: () => void;
    fullscreen?: boolean;
}

export const Modal = ({ isOpen, onClose, fullscreen = false, children }: ModalProps) => {
    const modalContainerClasses = [
        'modal-container',
        'modal-overlay',
        fullscreen && 'fullscreen'
    ].filter(c => !!c).join(' ')

    return !isOpen
        ? null
        : (
            <div className={modalContainerClasses} onClick={() => onClose()}>
                <div className="modal-content" onClick={(e) => e.stopPropagation()}>
                    <a className="close-modal" onClick={() => onClose()}>close</a>
                    <div className="modal-content-body">{children}</div>
                </div>
            </div>
        );
}

export const MenuModal = (props: ModalProps) => {
    const n = useNavigate();
    const handleNav = (path?: string) => () => {
        path && n(path);
        props.onClose();
    };

    return (
        <Modal {...props}>
            <ul className="main-menu-list">
                <li onClick={handleNav()}><NavToDashboard /></li>
                <li><AddIcon /></li>
            </ul>
        </Modal>
    )
};
