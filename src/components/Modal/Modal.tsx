// src/components/Modal.tsx
import React from 'react';

interface ModalProps {
    isVisible: boolean;
    onClose: () => void;
    children: React.ReactNode;
}

const Modal: React.FC<ModalProps> = ({ isVisible, onClose, children }) => {
    if (!isVisible) return null;

    return (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 m-0">
            <div className="bg-[#16162d] rounded-[24px] shadow-lg pt-2 pl-6 pr-6 pb-1 overflow-y-auto overflow-x-hidden max-h-[90vh] w-fit">
                <div className="flex justify-end p-2 overflow-y-auto">
                    <button onClick={onClose} className="text-gray-400 hover:text-white text-3xl absolute">
                        &times;
                    </button>
                </div>
                <div className="pt-1 pb-4 overflow-y-auto overflow-x-hidden">
                    {children}
                </div>
            </div>
        </div>
    );
};

export default Modal;