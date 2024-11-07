// src/components/Modal.tsx
import React, { useCallback, useRef } from 'react';

interface ModalProps {
    isVisible: boolean;
    onClose: () => void;
    children: React.ReactNode;
}

const Modal: React.FC<ModalProps> = ({ isVisible, onClose, children }) => {
    const modalRef = useRef<HTMLDivElement>(null);

    const handleBackdropClick = useCallback(
        (e: React.MouseEvent<HTMLDivElement>) => {
            // Check if the click was on the backdrop (not on the modal content)
            if (modalRef.current && !modalRef.current.contains(e.target as Node)) {
                onClose();
            }
        },
        [onClose]
    );

    if (!isVisible) return null;

    return (
        // Backdrop
        <div 
            className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 m-0"
            onClick={handleBackdropClick} // Add click handler to backdrop
        >
            {/* Modal Content */}
            <div 
                ref={modalRef}
                className="bg-[#16162d] rounded-[24px] shadow-lg pt-2 pl-6 pr-6 pb-1 overflow-y-auto overflow-x-hidden max-h-[90vh] w-fit relative"
            >
                {/* Close Button */}
                <div className="flex justify-end p-2">
                    <button 
                        onClick={onClose} 
                        className="text-gray-400 hover:text-white text-3xl absolute right-6 z-40"
                    >
                        &times;
                    </button>
                </div>
                {/* Modal Body */}
                <div className="pt-1 pb-4 overflow-y-auto overflow-x-hidden">
                    {children}
                </div>
            </div>
        </div>
    );
};

export default Modal;