
import React, { useMemo } from 'react';
import { Service, Appointment } from '../types';
import { getAvailableSlots } from '../services/appointmentService';
import Button from './Button';

interface DateTimePickerProps {
    service: Service;
    existingAppointments: Appointment[];
    onSelect: (time: string) => void;
    onBack: () => void;
    selectedDate: Date;
    onDateChange: (date: Date) => void;
}

const DateTimePicker: React.FC<DateTimePickerProps> = ({ 
    service, 
    existingAppointments, 
    onSelect, 
    onBack,
    selectedDate,
    onDateChange 
}) => {
    const daysInMonth = useMemo(() => {
        const days = [];
        const date = new Date(selectedDate.getFullYear(), selectedDate.getMonth(), 1);
        while (date.getMonth() === selectedDate.getMonth()) {
            days.push(new Date(date));
            date.setDate(date.getDate() + 1);
        }
        return days;
    }, [selectedDate]);

    const availableSlots = useMemo(() => 
        getAvailableSlots(service.duration, existingAppointments, selectedDate),
        [service.duration, existingAppointments, selectedDate]
    );

    const today = new Date();
    today.setHours(0, 0, 0, 0);

    const isPrevMonthDisabled = useMemo(() => {
        const firstDayOfCurrentMonth = new Date(today.getFullYear(), today.getMonth(), 1);
        const firstDayOfSelectedMonth = new Date(selectedDate.getFullYear(), selectedDate.getMonth(), 1);
        return firstDayOfSelectedMonth <= firstDayOfCurrentMonth;
    }, [selectedDate, today]);

    const handlePrevMonth = () => {
        if (isPrevMonthDisabled) return;
        const targetDate = new Date(selectedDate.getFullYear(), selectedDate.getMonth() - 1, 1);
        const dayOfMonth = selectedDate.getDate();
        const lastDayOfPrevMonth = new Date(selectedDate.getFullYear(), selectedDate.getMonth(), 0).getDate();
        targetDate.setDate(Math.min(dayOfMonth, lastDayOfPrevMonth));
        onDateChange(targetDate);
    };

    const handleNextMonth = () => {
        const targetDate = new Date(selectedDate.getFullYear(), selectedDate.getMonth() + 1, 1);
        const dayOfMonth = selectedDate.getDate();
        const lastDayOfNextMonth = new Date(selectedDate.getFullYear(), selectedDate.getMonth() + 2, 0).getDate();
        targetDate.setDate(Math.min(dayOfMonth, lastDayOfNextMonth));
        onDateChange(targetDate);
    };

    return (
        <div className="flex flex-col items-center">
            <div className="w-full bg-pink-100/50 p-4 rounded-lg mb-6 border border-pink-200">
                <p className="text-center font-semibold text-pink-800">Servizio Selezionato: {service.name}</p>
                <p className="text-center text-sm text-pink-700">Durata: {service.duration} minuti</p>
            </div>
            
            <div className="flex items-center justify-between w-full mb-4">
                <button onClick={handlePrevMonth} disabled={isPrevMonthDisabled} className="p-2 rounded-full hover:bg-pink-100 disabled:opacity-50 disabled:cursor-not-allowed transition-colors">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-pink-600" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" /></svg>
                </button>
                <h3 className="text-lg font-semibold text-gray-700 capitalize">
                    {selectedDate.toLocaleString('it-IT', { month: 'long', year: 'numeric' })}
                </h3>
                <button onClick={handleNextMonth} className="p-2 rounded-full hover:bg-pink-100 transition-colors">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-pink-600" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" /></svg>
                </button>
            </div>

            <div className="w-full overflow-x-auto pb-4 mb-4">
                <div className="flex space-x-3">
                    {daysInMonth.map((day) => {
                        const isPast = day < today;
                        const isSelected = day.toDateString() === selectedDate.toDateString();
                        
                        let dayClasses = "flex flex-col items-center justify-center w-14 h-20 rounded-lg border-2 p-2 cursor-pointer transition-all duration-200 shrink-0 ";
                        if (isPast) {
                            dayClasses += "bg-gray-100 text-gray-400 cursor-not-allowed border-gray-200";
                        } else if (isSelected) {
                            dayClasses += "bg-pink-600 text-white font-bold border-pink-700 shadow-md";
                        } else {
                            dayClasses += "bg-white text-gray-700 border-pink-200 hover:bg-pink-50 hover:border-pink-400";
                        }

                        return (
                            <button
                                key={day.toISOString()}
                                onClick={() => !isPast && onDateChange(day)}
                                disabled={isPast}
                                className={dayClasses}
                            >
                                <span className="text-xs uppercase font-medium">{day.toLocaleString('it-IT', { weekday: 'short' })}</span>
                                <span className="text-2xl">{day.getDate()}</span>
                            </button>
                        );
                    })}
                </div>
            </div>

            <h3 className="text-lg font-semibold mb-4 text-gray-700">Orari disponibili per {selectedDate.toLocaleDateString('it-IT', { weekday: 'long', day: 'numeric', month: 'long' })}:</h3>
            
            {availableSlots.length > 0 ? (
                <div className="grid grid-cols-3 sm:grid-cols-4 gap-3 w-full">
                    {availableSlots.map((slot) => (
                        <button
                            key={slot}
                            onClick={() => onSelect(slot)}
                            className="p-3 bg-white text-pink-700 font-semibold rounded-md border-2 border-pink-200 hover:bg-pink-100 hover:border-pink-500 transition-all"
                        >
                            {slot}
                        </button>
                    ))}
                </div>
            ) : (
                <p className="text-center text-gray-500 p-4 bg-gray-100 rounded-md w-full">
                    Siamo spiacenti, non ci sono orari disponibili in questa data.
                </p>
            )}

            <div className="mt-8 w-full">
                <Button onClick={onBack} variant="secondary">
                    Indietro
                </Button>
            </div>
        </div>
    );
};

export default DateTimePicker;
