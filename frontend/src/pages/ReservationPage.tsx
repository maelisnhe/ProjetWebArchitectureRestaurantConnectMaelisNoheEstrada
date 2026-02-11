import { useState } from 'react';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import { reservationsAPI } from '../services/api';
import { Toaster, toast } from 'react-hot-toast';
import { motion } from 'framer-motion';

export default function ReservationPage() {
    const [selectedDate, setSelectedDate] = useState<Date | null>(null);
    const [formData, setFormData] = useState({
        userId: 1,
        reservationTime: '',
        numberOfPeople: 2,
    });
    const [loading, setLoading] = useState(false);

    const isValidServiceTime = (time: string): boolean => {
        if (!time) return false;
        const [hours, minutes] = time.split(':').map(Number);
        const totalMinutes = hours * 60 + minutes;

        // Lunch: 12:00-14:30 (720-870 minutes)
        const lunchStart = 12 * 60;
        const lunchEnd = 14 * 60 + 30;

        // Dinner: 19:00-22:30 (1140-1350 minutes)
        const dinnerStart = 19 * 60;
        const dinnerEnd = 22 * 60 + 30;

        return (totalMinutes >= lunchStart && totalMinutes <= lunchEnd) ||
            (totalMinutes >= dinnerStart && totalMinutes <= dinnerEnd);
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!selectedDate) {
            toast.error('Veuillez sélectionner une date', {
                style: { minWidth: '450px', textAlign: 'center' }
            });
            return;
        }

        if (!formData.reservationTime) {
            toast.error('Veuillez sélectionner une heure', {
                style: { minWidth: '450px', textAlign: 'center' }
            });
            return;
        }

        setLoading(true);
        try {
            // Format date properly for backend
            const year = selectedDate.getFullYear();
            const month = String(selectedDate.getMonth() + 1).padStart(2, '0');
            const day = String(selectedDate.getDate()).padStart(2, '0');
            const formattedDate = `${year}-${month}-${day}`;

            const reservationData = {
                userId: formData.userId,
                reservationDate: formattedDate,
                reservationTime: formData.reservationTime,
                numberOfPeople: formData.numberOfPeople
            };

            console.log('📤 Données envoyées:', reservationData);
            console.log('📅 Date sélectionnée:', selectedDate);
            console.log('📅 Date formatée:', formattedDate);
            console.log('🕐 Heure:', formData.reservationTime);

            const response = await reservationsAPI.create(reservationData);
            console.log('✅ Réponse backend:', response.data);

            toast.success('Réservation confirmée !', {
                duration: 3000,
                style: {
                    background: 'linear-gradient(135deg, #d4af37 0%, #f4d077 100%)',
                    color: '#fff',
                    padding: '16px',
                    fontSize: '16px',
                    fontWeight: 500
                }
            });

            // Reset form
            setSelectedDate(null);
            setFormData({
                userId: 1,
                reservationTime: '',
                numberOfPeople: 2
            });

            console.log('✅ Réservation enregistrée en BDD');
        } catch (err: any) {
            console.error('❌ Erreur réservation:', err);
            // Try to get error message from detail or message fields
            const backendMessage = err.response?.data?.detail || err.response?.data?.message;

            // Handle specific error codes
            if (err.response?.status === 400) {
                if (backendMessage === 'CAPACITY_EXCEEDED' || backendMessage === 'COMPLET') {
                    toast.error('Désolé, notre établissement est complet pour ce créneau (limite de 30 convives atteinte). Veuillez sélectionner un autre horaire.', {
                        duration: 5000,
                        style: {
                            minWidth: '450px',
                            textAlign: 'center',
                            background: '#1A1A1A',
                            color: '#d4af37',
                            border: '1px solid #d4af37'
                        }
                    });
                } else if (backendMessage === 'OUT_OF_OPENING_HOURS') {
                    toast.error('Le restaurant est fermé à cette heure-là. Services : 12h-14h30 et 19h-22h30', {
                        duration: 5000,
                        style: {
                            minWidth: '450px',
                            textAlign: 'center',
                            background: '#1A1A1A',
                            color: '#d4af37',
                            border: '1px solid #d4af37'
                        }
                    });
                } else {
                    toast.error(backendMessage || 'Une erreur est survenue', {
                        style: { minWidth: '450px', textAlign: 'center' }
                    });
                }
            } else {
                toast.error(backendMessage || 'Une erreur est survenue', {
                    style: { minWidth: '450px', textAlign: 'center' }
                });
            }
        } finally {
            setLoading(false);
        }
    };

    return (
        <div style={{ backgroundColor: '#FDFCFB', minHeight: '100vh', position: 'relative', paddingTop: '7rem' }}>
            <div className="section-spacing" style={{ position: 'relative', zIndex: 10 }}>
                <div style={{ maxWidth: '800px', margin: '0 auto' }}>
                    {/* Header */}
                    <motion.div
                        initial={{ opacity: 0, y: 30 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8 }}
                        style={{ marginBottom: '4rem' }}
                    >
                        <div className="accent-line"></div>
                        <h1 style={{
                            fontFamily: "'Playfair Display', serif",
                            fontSize: 'clamp(3rem, 8vw, 5rem)',
                            fontWeight: 800,
                            marginBottom: '2rem',
                            color: '#1A1A1A'
                        }}>
                            Réservation
                        </h1>
                        <p style={{
                            fontSize: '1.25rem',
                            fontWeight: 300,
                            color: 'rgba(26, 26, 26, 0.7)',
                            lineHeight: 1.8,
                            fontStyle: 'italic'
                        }}>
                            Réservez votre table et préparez-vous à vivre une expérience culinaire inoubliable
                            dans un cadre d'exception.
                        </p>
                    </motion.div>

                    {/* Form */}
                    <form onSubmit={handleSubmit} style={{
                        background: 'linear-gradient(135deg, #2C2416 0%, #1A1A1A 100%)',
                        padding: '4rem',
                        borderRadius: '8px',
                        boxShadow: '0 10px 40px rgba(0,0,0,0.15)'
                    }}>
                        <div style={{ display: 'flex', flexDirection: 'column', gap: '3rem' }}>
                            {/* DatePicker */}
                            <div>
                                <label style={{
                                    display: 'block',
                                    fontSize: '0.9rem',
                                    fontWeight: 500,
                                    letterSpacing: '0.1em',
                                    textTransform: 'uppercase',
                                    marginBottom: '1.5rem',
                                    color: '#d4af37'
                                }}>
                                    Date de votre visite
                                </label>
                                <div style={{ display: 'flex', justifyContent: 'center' }}>
                                    <DatePicker
                                        selected={selectedDate}
                                        onChange={(date: Date | null) => setSelectedDate(date)}
                                        minDate={new Date()}
                                        dateFormat="dd MMMM yyyy"
                                        inline
                                        calendarClassName="luxury-calendar"
                                    />
                                </div>
                            </div>

                            {/* Time Slot Selector */}
                            <div>
                                <label className="input-label" style={{ color: '#d4af37' }}>
                                    Heure souhaitée
                                </label>
                                <select
                                    required
                                    value={formData.reservationTime}
                                    onChange={(e) => setFormData({ ...formData, reservationTime: e.target.value })}
                                    className="input-luxury"
                                    style={{
                                        cursor: 'pointer',
                                        background: 'rgba(253, 252, 251, 0.05)',
                                        border: '1px solid rgba(212, 175, 55, 0.3)',
                                        color: '#FDFCFB',
                                        padding: '1rem',
                                        fontSize: '1rem',
                                        borderRadius: '4px'
                                    }}
                                >
                                    <option value="" style={{ background: '#1A1A1A' }}>Sélectionnez un créneau</option>
                                    <optgroup label="Service Déjeuner (12h-14h)" style={{ background: '#1A1A1A', color: '#d4af37' }}>
                                        <option value="12:00" style={{ background: '#1A1A1A' }}>12:00</option>
                                        <option value="12:30" style={{ background: '#1A1A1A' }}>12:30</option>
                                        <option value="13:00" style={{ background: '#1A1A1A' }}>13:00</option>
                                        <option value="13:30" style={{ background: '#1A1A1A' }}>13:30</option>
                                        <option value="14:00" style={{ background: '#1A1A1A' }}>14:00</option>
                                    </optgroup>
                                    <optgroup label="Service Dîner (19h-22h)" style={{ background: '#1A1A1A', color: '#d4af37' }}>
                                        <option value="19:00" style={{ background: '#1A1A1A' }}>19:00</option>
                                        <option value="19:30" style={{ background: '#1A1A1A' }}>19:30</option>
                                        <option value="20:00" style={{ background: '#1A1A1A' }}>20:00</option>
                                        <option value="20:30" style={{ background: '#1A1A1A' }}>20:30</option>
                                        <option value="21:00" style={{ background: '#1A1A1A' }}>21:00</option>
                                        <option value="21:30" style={{ background: '#1A1A1A' }}>21:30</option>
                                        <option value="22:00" style={{ background: '#1A1A1A' }}>22:00</option>
                                    </optgroup>
                                </select>
                            </div>

                            {/* Number of People */}
                            <div>
                                <label className="input-label" style={{ color: '#d4af37' }}>
                                    Nombre de convives
                                </label>
                                <select
                                    required
                                    value={formData.numberOfPeople}
                                    onChange={(e) => setFormData({ ...formData, numberOfPeople: parseInt(e.target.value) })}
                                    className="input-luxury"
                                    style={{
                                        cursor: 'pointer',
                                        background: 'rgba(253, 252, 251, 0.05)',
                                        border: '1px solid rgba(212, 175, 55, 0.3)',
                                        color: '#FDFCFB'
                                    }}
                                >
                                    {[1, 2, 3, 4, 5, 6, 7, 8].map(num => (
                                        <option key={num} value={num} style={{ background: '#1A1A1A' }}>
                                            {num} {num === 1 ? 'personne' : 'personnes'}
                                        </option>
                                    ))}
                                </select>
                            </div>

                            {/* Submit */}
                            <div style={{ paddingTop: '2rem' }}>
                                <button
                                    type="submit"
                                    disabled={loading}
                                    className="btn-luxury"
                                    style={{
                                        width: '100%',
                                        opacity: loading ? 0.5 : 1,
                                        cursor: loading ? 'not-allowed' : 'pointer',
                                        background: 'linear-gradient(135deg, #d4af37 0%, #f4d077 100%)',
                                        color: '#1A1A1A',
                                        border: 'none'
                                    }}
                                >
                                    {loading ? 'Réservation en cours...' : 'Confirmer la Réservation'}
                                </button>
                            </div>
                        </div>
                    </form>
                </div>
            </div>
            <Toaster position="top-center" />
        </div>
    );
}
