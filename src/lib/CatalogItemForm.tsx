import { FC } from "react";
import { TallyItem } from "../data/types";
import { Modal, ModalProps } from "../Modal";

interface CatalogItemFormProps extends ModalProps {
    target?: TallyItem
}

export const CatalogItemForm: FC<CatalogItemFormProps> = ({
    target,
    ...modalProps
}) => {
    return (
        <Modal {...modalProps}>
            <div> catalog item form </div>
            <pre>{JSON.stringify(target, null, 2)}</pre>
        </Modal>
    )
};
