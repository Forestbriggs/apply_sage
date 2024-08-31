import { JSX } from 'react';
import { useModal } from '../../context/Modal';

interface OpenModalMenuItemProps {
    modalComponent: JSX.Element;
    itemText: string;
    onItemClick?: () => void;
    onModalClose?: () => void;
}

function OpenModalMenuItem({
    modalComponent, // component to render inside the modal
    itemText, // text of the button that opens the modal
    onItemClick, // optional: callback function that will be called once the button that opens the modal is clicked
    onModalClose // optional: callback function that will be called once the modal is closed
}: OpenModalMenuItemProps) {
    const { setModalContent, setOnModalClose } = useModal();

    const onClick = () => {
        if (onModalClose) setOnModalClose(onModalClose);
        setModalContent(modalComponent);
        if (typeof onItemClick === "function") onItemClick();
    };

    return (
        <li onClick={onClick}>{itemText}</li>
    );
}

export default OpenModalMenuItem;
