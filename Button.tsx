
import React from 'react';
import Spinner from './Spinner';

interface ButtonProps {
    onClick?: () => void;
    children: React.ReactNode;
    type?: 'button' | 'submit' | 'reset';
    disabled?: boolean;
    isLoading?: boolean;
    variant?: 'primary' | 'secondary';
    className?: string;
}

const Button: React.FC<ButtonProps> = ({ 
    onClick, 
    children, 
    type = 'button', 
    disabled = false, 
    isLoading = false,
    variant = 'primary',
    className = ''
}) => {
    const primaryClasses = "bg-pink-600 text-white hover:bg-pink-700 focus-visible:outline-pink-600";
    const secondaryClasses = "bg-gray-200 text-gray-800 hover:bg-gray-300 focus-visible:outline-gray-400";
    
    const baseClasses = `flex justify-center items-center px-6 py-3 border border-transparent rounded-md shadow-sm text-base font-medium transition-colors duration-150 focus:outline-none focus:ring-2 focus:ring-offset-2`;
    const disabledClasses = "disabled:bg-gray-300 disabled:cursor-not-allowed disabled:text-gray-500";
    
    const variantClasses = variant === 'primary' ? primaryClasses : secondaryClasses;

    return (
        <button
            type={type}
            onClick={onClick}
            disabled={disabled || isLoading}
            className={`${baseClasses} ${variantClasses} ${disabledClasses} ${className}`}
        >
            {isLoading ? <Spinner /> : children}
        </button>
    );
};

export default Button;
