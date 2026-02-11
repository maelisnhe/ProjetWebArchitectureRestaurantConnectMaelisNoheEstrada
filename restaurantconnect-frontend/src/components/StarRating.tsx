import { useState, useEffect } from 'react';
import { Star } from 'lucide-react';
import { ratingsAPI } from '../services/ratingsAPI';
import toast from 'react-hot-toast';

interface StarRatingProps {
    menuItemId: number;
    userId?: number;
    size?: number;
}

export default function StarRating({ menuItemId, userId = 1, size = 24 }: StarRatingProps) {
    const [rating, setRating] = useState(0);
    const [hover, setHover] = useState(0);
    const [averageRating, setAverageRating] = useState(0);

    useEffect(() => {
        loadAverageRating();
    }, [menuItemId]);

    const loadAverageRating = async () => {
        if (!menuItemId) return;
        try {
            const response = await ratingsAPI.getAverageByMenuItem(menuItemId);
            setAverageRating(response.data.average || 0);
        } catch (error) {
            console.error('Error loading average rating:', error);
        }
    };

    const handleClick = async (value: number) => {
        if (!menuItemId || !value) return;
        try {
            await ratingsAPI.create({
                menuItem: { id: menuItemId },
                rating: value,
                user: { id: 1 }
            });
            setRating(value);
            loadAverageRating(); // Refresh average
            toast.success('Note enregistrée !', {
                duration: 2000,
                style: {
                    background: 'linear-gradient(135deg, #d4af37 0%, #f4d077 100%)',
                    color: '#fff',
                    fontWeight: 500
                }
            });
        } catch (error) {
            console.error('Error saving rating:', error);
            toast.error('Erreur lors de l\'enregistrement');
        }
    };

    return (
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
            <div style={{ display: 'flex', gap: '0.25rem' }}>
                {[1, 2, 3, 4, 5].map((value) => (
                    <Star
                        key={value}
                        size={size}
                        fill={(hover || rating) >= value ? '#d4af37' : 'none'}
                        stroke={(hover || rating) >= value ? '#d4af37' : 'rgba(212, 175, 55, 0.3)'}
                        style={{
                            cursor: 'pointer',
                            transition: 'all 0.2s ease',
                            transform: hover === value ? 'scale(1.2)' : 'scale(1)'
                        }}
                        onMouseEnter={() => setHover(value)}
                        onMouseLeave={() => setHover(0)}
                        onClick={() => handleClick(value)}
                    />
                ))}
            </div>
            {averageRating > 0 && (
                <span style={{
                    fontSize: '0.9rem',
                    color: '#d4af37',
                    fontWeight: 500,
                    marginLeft: '0.5rem'
                }}>
                    {averageRating.toFixed(1)}
                </span>
            )}
        </div>
    );
}
