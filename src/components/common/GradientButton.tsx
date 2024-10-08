import React from 'react';

const GradientButton = ({ children , onClick, style}) => {
    return (
        <button className={style} onClick={onClick} >
            <span className="absolute inset-0 bg-gradient-to-r from-[#733ec8] to-[#891fca]
                            transition-opacity duration-300 ease-in-out"></span>
            <span className="absolute inset-0 bg-gradient-to-r from-[#80509c] to-[#731baa]
                            opacity-0 group-hover:opacity-100 transition-opacity duration-300 ease-in-out">
            </span>
            <span className="relative z-10">{children}</span>
        </button>
    );
};

export default GradientButton;