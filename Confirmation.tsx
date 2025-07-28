
import React from 'react';
import { Appointment } from '../types';
import Button from './Button';
import Card from './Card';

interface ConfirmationProps {
    appointment: Appointment;
    onNewBooking: () => void;
}

const CalendarIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
    </svg>
);

const Confirmation: React.FC<ConfirmationProps> = ({ appointment, onNewBooking }) => {
    const { service, date, time, userInfo } = appointment;

    const createGoogleCalendarLink = () => {
        // Parse date (DD/MM/YYYY) and time (HH:mm)
        const [day, month, year] = date.split('/').map(Number);
        const [hours, minutes] = time.split(':').map(Number);
        
        // Create date in local timezone. toISOString() will convert it to UTC for the link.
        const startDate = new Date(year, month - 1, day, hours, minutes);
        const endDate = new Date(startDate.getTime() + service.duration * 60000);

        // Format to YYYYMMDDTHHMMSSZ
        const toGoogleFormat = (d: Date) => {
            return d.toISOString().replace(/\.\d+/, "").replace(/[-:]/g, "");
        }
        
        const googleDates = `${toGoogleFormat(startDate)}/${toGoogleFormat(endDate)}`;

        const params = new URLSearchParams({
            action: 'TEMPLATE',
            text: `Appuntamento: ${service.name} - Lash Studio Bella`,
            dates: googleDates,
            details: `Il tuo appuntamento per ${service.name}.\n\nPromemoria: le ricordiamo gentilmente di presentarsi con la zona occhi completamente struccata per garantire la migliore riuscita del trattamento.`,
            location: 'Lash Studio Bella'
        });

        return `https://www.google.com/calendar/render?${params.toString()}`;
    };

    const handleAddToCalendar = () => {
        const url = createGoogleCalendarLink();
        window.open(url, '_blank', 'noopener,noreferrer');
    };

    return (
        <div className="text-center">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-16 w-16 mx-auto text-green-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
            <p className="mt-4 text-lg">
                Grazie, {userInfo.firstName}! Il tuo appuntamento è stato confermato.
            </p>
            
            <Card className="mt-6 text-left">
                <h3 className="text-xl font-bold text-center text-pink-700 mb-4">Riepilogo Prenotazione</h3>
                <div className="space-y-2">
                    <p><strong>Servizio:</strong> {service.name}</p>
                    <p><strong>Data:</strong> {date}</p>
                    <p><strong>Ora:</strong> {time}</p>
                    <p><strong>Cliente:</strong> {userInfo.firstName} {userInfo.lastName}</p>
                    <p><strong>Email:</strong> {userInfo.email}</p>
                </div>
            </Card>

            <div className="mt-8 flex flex-col sm:flex-row-reverse justify-center gap-4">
                <Button onClick={onNewBooking}>
                    Prenota un Altro Appuntamento
                </Button>
                <Button onClick={handleAddToCalendar} variant="secondary">
                    <CalendarIcon />
                    Aggiungi a Google Calendar
                </Button>
            </div>
        </div>
    );
};

export default Confirmation;
