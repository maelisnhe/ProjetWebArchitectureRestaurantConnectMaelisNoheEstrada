import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Bar, Pie } from 'react-chartjs-2';
import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    BarElement,
    ArcElement,
    PointElement,
    LineElement,
    Title,
    Tooltip,
    Legend
} from 'chart.js';
import { ratingsAPI, menuItemsAPI } from '../services/ratingsAPI';
import { Star } from 'lucide-react';

// Register Chart.js components
ChartJS.register(
    CategoryScale,
    LinearScale,
    BarElement,
    ArcElement,
    PointElement,
    LineElement,
    Title,
    Tooltip,
    Legend
);

interface Rating {
    id: number;
    menuItem: {
        id: number;
        name: string;
    };
    rating: number;
    userId: number;
    createdAt: string;
}

interface MenuItem {
    id: number;
    name: string;
    description: string;
    price: number;
    category: string;
}

export default function ReviewsPage() {
    const [ratings, setRatings] = useState<Rating[]>([]);
    const [menuItems, setMenuItems] = useState<MenuItem[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        loadData();
    }, []);

    const loadData = async () => {
        try {
            const [ratingsRes, menuRes] = await Promise.all([
                ratingsAPI.getAll(),
                menuItemsAPI.getAll()
            ]);
            setRatings(ratingsRes.data);
            setMenuItems(menuRes.data);
            setLoading(false);
        } catch (error) {
            console.error('Error loading data:', error);
            setLoading(false);
        }
    };

    // Get menu item name (fallback)
    const getMenuItemName = (rating: Rating) => {
        return rating.menuItem?.name || `Plat #${rating.id}`;
    };

    // Calculate average rating per dish
    const getRatingsByDish = () => {
        const dishRatings: { [key: number]: { total: number, count: number } } = {};

        ratings.forEach(r => {
            const mId = r.menuItem?.id;
            if (!mId) return;
            if (!dishRatings[mId]) {
                dishRatings[mId] = { total: 0, count: 0 };
            }
            dishRatings[mId].total += r.rating;
            dishRatings[mId].count += 1;
        });

        return Object.entries(dishRatings)
            .map(([id, data]) => ({
                id: parseInt(id),
                name: menuItems.find(m => m.id === parseInt(id))?.name || `Plat #${id}`,
                average: data.total / data.count
            }))
            .sort((a, b) => b.average - a.average)
            .slice(0, 5);
    };

    // Distribution of ratings
    const getRatingDistribution = () => {
        const dist = [0, 0, 0, 0, 0]; // 1-5 stars
        ratings.forEach(r => {
            if (r.rating >= 1 && r.rating <= 5) {
                dist[r.rating - 1]++;
            }
        });
        return dist;
    };

    const topDishes = getRatingsByDish();
    const distribution = getRatingDistribution();

    // Chart data with gradient colors
    const barChartData = {
        labels: topDishes.map(d => d.name),
        datasets: [{
            label: 'Note Moyenne',
            data: topDishes.map(d => d.average),
            backgroundColor: 'rgba(212, 175, 55, 0.8)',
            borderColor: '#d4af37',
            borderWidth: 1
        }]
    };

    const pieChartData = {
        labels: ['1★', '2★', '3★', '4★', '5★'],
        datasets: [{
            data: distribution,
            backgroundColor: [
                'rgba(245, 243, 239, 0.8)',
                'rgba(232, 214, 178, 0.8)',
                'rgba(220, 188, 120, 0.8)',
                'rgba(212, 175, 55, 0.9)',
                'rgba(184, 134, 11, 1)'
            ],
            borderColor: '#d4af37',
            borderWidth: 2
        }]
    };

    const chartOptions = {
        responsive: true,
        plugins: {
            legend: {
                labels: {
                    color: '#1A1A1A',
                    font: { family: 'Montserrat', size: 12 }
                }
            }
        },
        scales: {
            y: {
                beginAtZero: true,
                max: 5,
                ticks: { color: '#1A1A1A' }
            },
            x: {
                ticks: { color: '#1A1A1A' }
            }
        }
    };

    if (loading) {
        return <div style={{ minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>Chargement...</div>;
    }

    return (
        <div style={{ backgroundColor: '#FDFCFB', minHeight: '100vh', paddingTop: '5rem' }}>
            {/* Hero */}
            <section style={{
                textAlign: 'center',
                padding: '6rem 10% 4rem',
                background: 'linear-gradient(135deg, #FDFCFB 0%, #F5F3EF 100%)'
            }}>
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8 }}
                >
                    <div className="accent-line" style={{ margin: '0 auto 2rem' }}></div>
                    <h1 style={{
                        fontFamily: "'Playfair Display', serif",
                        fontSize: 'clamp(3rem, 8vw, 6rem)',
                        fontWeight: 800,
                        color: '#1A1A1A',
                        marginBottom: '1.5rem'
                    }}>
                        Avis de nos Clients
                    </h1>
                    <p style={{
                        fontSize: '1.25rem',
                        color: 'rgba(26, 26, 26, 0.7)',
                        fontStyle: 'italic'
                    }}>
                        {ratings.length} notes enregistrées
                    </p>
                </motion.div>
            </section>

            {/* Charts Section */}
            <section className="section-spacing" style={{ maxWidth: '1400px', margin: '0 auto' }}>
                <div style={{
                    display: 'grid',
                    gridTemplateColumns: 'repeat(auto-fit, minmax(400px, 1fr))',
                    gap: '3rem'
                }}>
                    {/* Bar Chart */}
                    <motion.div
                        initial={{ opacity: 0, y: 30 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.6 }}
                        style={{
                            background: 'white',
                            padding: '2rem',
                            borderRadius: '8px',
                            boxShadow: '0 4px 20px rgba(0,0,0,0.05)'
                        }}
                    >
                        <h3 style={{
                            fontFamily: "'Playfair Display', serif",
                            fontSize: '1.75rem',
                            marginBottom: '2rem',
                            color: '#1A1A1A'
                        }}>
                            Top 5 Plats
                        </h3>
                        <Bar data={barChartData} options={chartOptions} />
                    </motion.div>

                    {/* Pie Chart */}
                    <motion.div
                        initial={{ opacity: 0, y: 30 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.6, delay: 0.2 }}
                        style={{
                            background: 'white',
                            padding: '2rem',
                            borderRadius: '8px',
                            boxShadow: '0 4px 20px rgba(0,0,0,0.05)'
                        }}
                    >
                        <h3 style={{
                            fontFamily: "'Playfair Display', serif",
                            fontSize: '1.75rem',
                            marginBottom: '2rem',
                            color: '#1A1A1A'
                        }}>
                            Distribution des Notes
                        </h3>
                        <Pie data={pieChartData} />
                    </motion.div>
                </div>
            </section>

            {/* Reviews Wall - Limited to 8 with horizontal scroll */}
            <section className="section-spacing" style={{ background: '#F5F3EF', paddingTop: '6rem', paddingBottom: '6rem' }}>
                <div style={{ maxWidth: '1400px', margin: '0 auto' }}>
                    <h2 style={{
                        fontFamily: "'Playfair Display', serif",
                        fontSize: 'clamp(2.5rem, 5vw, 4rem)',
                        textAlign: 'center',
                        marginBottom: '4rem',
                        color: '#1A1A1A'
                    }}>
                        Dernières Évaluations
                    </h2>
                    <div className="flex gap-8 overflow-x-auto pb-4 scroll-smooth" style={{
                        display: 'flex',
                        gap: '2rem',
                        overflowX: 'auto',
                        paddingBottom: '1rem',
                        scrollSnapType: 'x mandatory'
                    }}>
                        {[...ratings]
                            .sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime())
                            .slice(0, 8)
                            .map((rating, index) => (
                                <motion.div
                                    key={rating.id}
                                    initial={{ opacity: 0, x: 20 }}
                                    whileInView={{ opacity: 1, x: 0 }}
                                    viewport={{ once: true }}
                                    transition={{ duration: 0.5, delay: index * 0.05 }}
                                    style={{
                                        minWidth: '300px',
                                        background: 'white',
                                        padding: '2rem',
                                        borderRadius: '8px',
                                        boxShadow: '0 2px 10px rgba(0,0,0,0.05)',
                                        scrollSnapAlign: 'start'
                                    }}
                                >
                                    {/* Read-only stars */}
                                    <div style={{ marginBottom: '1rem', display: 'flex', gap: '0.25rem' }}>
                                        {[1, 2, 3, 4, 5].map((star) => (
                                            <Star
                                                key={star}
                                                size={20}
                                                fill={star <= rating.rating ? '#d4af37' : 'none'}
                                                stroke={star <= rating.rating ? '#d4af37' : 'rgba(212, 175, 55, 0.3)'}
                                            />
                                        ))}
                                    </div>
                                    <p style={{
                                        fontSize: '1rem',
                                        fontWeight: 600,
                                        color: '#1A1A1A',
                                        marginBottom: '0.5rem'
                                    }}>
                                        {rating.menuItem?.name || `Plat d'Exception`}
                                    </p>
                                    <p style={{
                                        fontSize: '0.9rem',
                                        color: 'rgba(26, 26, 26, 0.6)',
                                        margin: 0
                                    }}>
                                        Note: {rating.rating}/5
                                    </p>
                                    <p style={{
                                        fontSize: '0.75rem',
                                        color: 'rgba(26, 26, 26, 0.4)',
                                        marginTop: '0.5rem'
                                    }}>
                                        {new Date(rating.createdAt).toLocaleDateString('fr-FR')}
                                    </p>
                                </motion.div>
                            ))}
                    </div>
                </div>
            </section>
        </div>
    );
}
