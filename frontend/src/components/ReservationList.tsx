import React, { useEffect, useState } from 'react';
import { fetchReservations } from '../services/api';
import { Reservation } from '../types/reservation';

const ReservationList: React.FC = () => {
    const [reservations, setReservations] = useState<Reservation[]>([]);
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        const getReservations = async () => {
            try {
                const data = await fetchReservations();
                setReservations(data);
            } catch (err) {
                setError('Failed to fetch reservations');
            } finally {
                setLoading(false);
            }
        };

        getReservations();
    }, []);

    if (loading) {
        return <div>Loading...</div>;
    }

    if (error) {
        return (
            <div style={{ padding: '20px', color: 'red' }}>
                <p><strong>{error}</strong></p>
                <p>Backend may not be available. Frontend is working!</p>
            </div>
        );
    }

    if (reservations.length === 0) {
        return <div>No reservations available</div>;
    }

    return (
        <ul>
            {reservations.map((reservation) => (
                <li key={reservation.id}>
                    <p>Date: {reservation.date}</p>
                    <p>Table: {reservation.table}</p>
                    <p>Number of People: {reservation.numberOfPeople}</p>
                    <p>Status: {reservation.status}</p>
                </li>
            ))}
        </ul>
    );
};

export default ReservationList;