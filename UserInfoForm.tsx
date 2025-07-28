
import React, { useState } from 'react';
import { UserInfo } from '../types';
import Button from './Button';

interface UserInfoFormProps {
    onSubmit: (userInfo: UserInfo) => void;
    isLoading: boolean;
    onBack: () => void;
    error?: string | null;
}

const UserInfoForm: React.FC<UserInfoFormProps> = ({ onSubmit, isLoading, onBack, error }) => {
    const [userInfo, setUserInfo] = useState<UserInfo>({
        firstName: '',
        lastName: '',
        email: '',
        phone: ''
    });

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setUserInfo(prev => ({ ...prev, [name]: value }));
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        onSubmit(userInfo);
    };

    return (
        <form onSubmit={handleSubmit} className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                    <label htmlFor="firstName" className="block text-sm font-medium text-gray-700">Nome</label>
                    <input type="text" name="firstName" id="firstName" required value={userInfo.firstName} onChange={handleChange} className="mt-1 block w-full p-2 border border-gray-300 rounded-md shadow-sm focus:ring-pink-500 focus:border-pink-500" />
                </div>
                <div>
                    <label htmlFor="lastName" className="block text-sm font-medium text-gray-700">Cognome</label>
                    <input type="text" name="lastName" id="lastName" required value={userInfo.lastName} onChange={handleChange} className="mt-1 block w-full p-2 border border-gray-300 rounded-md shadow-sm focus:ring-pink-500 focus:border-pink-500" />
                </div>
            </div>
            <div>
                <label htmlFor="email" className="block text-sm font-medium text-gray-700">Email</label>
                <input type="email" name="email" id="email" required value={userInfo.email} onChange={handleChange} className="mt-1 block w-full p-2 border border-gray-300 rounded-md shadow-sm focus:ring-pink-500 focus:border-pink-500" />
            </div>
            <div>
                <label htmlFor="phone" className="block text-sm font-medium text-gray-700">Numero di Telefono</label>
                <input type="tel" name="phone" id="phone" required value={userInfo.phone} onChange={handleChange} className="mt-1 block w-full p-2 border border-gray-300 rounded-md shadow-sm focus:ring-pink-500 focus:border-pink-500" />
            </div>

            {error && (
                <div className="bg-red-100 border-l-4 border-red-500 text-red-700 p-4 rounded-md" role="alert">
                    <p className="font-bold">Impossibile completare la prenotazione</p>
                    <p>{error}</p>
                </div>
            )}

            <div className="flex flex-col-reverse sm:flex-row gap-4 pt-4">
                <Button onClick={onBack} type="button" variant="secondary" disabled={isLoading} className="w-full sm:w-auto">
                    Indietro
                </Button>
                <Button type="submit" isLoading={isLoading} disabled={isLoading} className="w-full sm:w-auto flex-grow">
                    Conferma Prenotazione
                </Button>
            </div>
        </form>
    );
};

export default UserInfoForm;