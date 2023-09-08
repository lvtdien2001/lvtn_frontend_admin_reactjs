import { useState } from 'react';
import ModalContext from './ModalContext';

const ModalProvider = ({ children }) => {
    const [showModal, setShowModal] = useState(false);
    return (
        <ModalContext.Provider value={{ showModal, setShowModal }}>
            {children}
        </ModalContext.Provider>
    )
}

export default ModalProvider
