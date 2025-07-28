
import React from 'react';

interface CardProps {
    children: React.ReactNode;
    onClick?: () => void;
    className?: string;
    isSelected?: boolean;
}

const Card: React.FC<CardProps> = ({ children, onClick, className = '', isSelected = false }) => {
    const baseClasses = 'bg-white rounded-lg shadow-md p-6 border transition-all duration-200';
    const interactiveClasses = onClick ? 'cursor-pointer hover:shadow-lg hover:border-pink-400' : '';
    const selectedClasses = isSelected ? 'border-pink-600 ring-2 ring-pink-500' : 'border-pink-200';
    
    return (
        <div onClick={onClick} className={`${baseClasses} ${interactiveClasses} ${selectedClasses} ${className}`}>
            {children}
        </div>
    );
};

export default Card;
