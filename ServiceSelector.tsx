
import React from 'react';
import { Service } from '../types';
import Card from './Card';

interface ServiceSelectorProps {
    services: Service[];
    onSelect: (service: Service) => void;
}

const ServiceSelector: React.FC<ServiceSelectorProps> = ({ services, onSelect }) => {
    return (
        <div className="space-y-4">
            {services.map((service) => (
                <Card key={service.id} onClick={() => onSelect(service)}>
                    <h3 className="text-xl font-bold text-pink-700">{service.name}</h3>
                    <p className="text-gray-600 mt-1">{service.description}</p>
                    <p className="text-sm font-medium text-pink-500 mt-2">{service.duration} minuti</p>
                </Card>
            ))}
        </div>
    );
};

export default ServiceSelector;
