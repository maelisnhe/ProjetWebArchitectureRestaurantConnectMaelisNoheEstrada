import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { menuItemsAPI } from '../services/ratingsAPI';
import StarRating from '../components/StarRating';
import { Toaster } from 'react-hot-toast';

interface MenuItem {
    id: number;
    name: string;
    description: string;
    price: number;
    category: string;
    imageUrl: string;
    vegetarian: boolean;
    available: boolean;
}

export default function MenuPage() {
    const [menuItems, setMenuItems] = useState<MenuItem[]>([]);
    const [activeFilter, setActiveFilter] = useState('TOUS');
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        loadMenuItems();
    }, []);

    const loadMenuItems = async (filter?: { category?: string; vegetarian?: boolean }) => {
        try {
            setLoading(true);
            const response = await menuItemsAPI.getAll(filter);
            setMenuItems(response.data);
        } catch (error) {
            console.error('Error loading menu items:', error);
        } finally {
            setLoading(false);
        }
    };

    const handleFilterClick = (filter: string) => {
        setActiveFilter(filter);

        if (filter === 'TOUS') {
            loadMenuItems();
        } else if (filter === 'VEGETARIEN') {
            loadMenuItems({ vegetarian: true });
        } else {
            loadMenuItems({ category: filter });
        }
    };

    const filterButtons = [
        { id: 'TOUS', label: 'Tous' },
        { id: 'ENTREES', label: 'Entrées' },
        { id: 'PLATS', label: 'Plats' },
        { id: 'DESSERTS', label: 'Desserts' },
        { id: 'BOISSONS', label: 'Boissons' },
        { id: 'VEGETARIEN', label: 'Végétarien' }
    ];

    if (loading) {
        return (
            <div style={{
                minHeight: '100vh',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                backgroundColor: '#FDFCFB'
            }}>
                <p style={{ fontSize: '1.5rem', color: '#d4af37' }}>Chargement du menu...</p>
            </div>
        );
    }

    return (
        <div style={{ backgroundColor: '#FDFCFB', minHeight: '100vh', paddingTop: '6rem' }}>
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
                        Notre Carte
                    </h1>
                    <p style={{
                        fontSize: '1.25rem',
                        color: 'rgba(26, 26, 26, 0.7)',
                        fontStyle: 'italic'
                    }}>
                        Une sélection raffinée de plats d'exception
                    </p>
                </motion.div>
            </section>

            {/* Filter Bar - Refined Design */}
            <section style={{ padding: '3rem 10%' }}>
                <div style={{
                    display: 'flex',
                    gap: '2.5rem',
                    justifyContent: 'center',
                    flexWrap: 'wrap'
                }}>
                    {filterButtons.map((button) => (
                        <button
                            key={button.id}
                            onClick={() => handleFilterClick(button.id)}
                            style={{
                                padding: '0.5rem 0',
                                fontSize: '0.9rem',
                                fontWeight: 300,
                                fontFamily: "'Montserrat', sans-serif",
                                letterSpacing: '0.15em',
                                textTransform: 'uppercase',
                                background: 'transparent',
                                color: activeFilter === button.id ? '#d4af37' : 'rgba(26, 26, 26, 0.6)',
                                border: 'none',
                                borderBottom: activeFilter === button.id ? '1px solid #d4af37' : '1px solid transparent',
                                cursor: 'pointer',
                                transition: 'all 0.3s ease',
                                position: 'relative'
                            }}
                            onMouseEnter={(e) => {
                                if (activeFilter !== button.id) {
                                    e.currentTarget.style.color = '#d4af37';
                                    e.currentTarget.style.borderBottom = '1px solid rgba(212, 175, 55, 0.5)';
                                }
                            }}
                            onMouseLeave={(e) => {
                                if (activeFilter !== button.id) {
                                    e.currentTarget.style.color = 'rgba(26, 26, 26, 0.6)';
                                    e.currentTarget.style.borderBottom = '1px solid transparent';
                                }
                            }}
                        >
                            {button.label}
                        </button>
                    ))}
                </div>
            </section>

            {/* Menu Items */}
            <section className="section-spacing" style={{ maxWidth: '1200px', margin: '0 auto' }}>
                <div style={{
                    display: 'grid',
                    gridTemplateColumns: 'repeat(auto-fit, minmax(350px, 1fr))',
                    gap: '3rem'
                }}>
                    {menuItems.map((item, index) => (
                        <motion.div
                            key={item.id}
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.5, delay: index * 0.05 }}
                            style={{
                                background: 'white',
                                borderRadius: '8px',
                                overflow: 'hidden',
                                boxShadow: '0 4px 20px rgba(0,0,0,0.05)',
                                transition: 'transform 0.3s ease, box-shadow 0.3s ease'
                            }}
                            onMouseEnter={(e) => {
                                e.currentTarget.style.transform = 'translateY(-5px)';
                                e.currentTarget.style.boxShadow = '0 8px 30px rgba(0,0,0,0.1)';
                            }}
                            onMouseLeave={(e) => {
                                e.currentTarget.style.transform = 'translateY(0)';
                                e.currentTarget.style.boxShadow = '0 4px 20px rgba(0,0,0,0.05)';
                            }}
                        >
                            {/* Image */}
                            <div className="relative h-[200px] md:h-[250px] overflow-hidden" style={{ position: 'relative', height: '250px', overflow: 'hidden' }}>
                                <img
                                    src={item.imageUrl}
                                    alt={item.name}
                                    style={{
                                        width: '100%',
                                        height: '100%',
                                        objectFit: 'cover'
                                    }}
                                />
                                {item.vegetarian && (
                                    <div style={{
                                        position: 'absolute',
                                        top: '1rem',
                                        right: '1rem',
                                        background: 'rgba(76, 175, 80, 0.9)',
                                        color: 'white',
                                        padding: '0.5rem 1rem',
                                        borderRadius: '20px',
                                        fontSize: '0.75rem',
                                        fontWeight: 600,
                                        letterSpacing: '0.05em',
                                        textTransform: 'uppercase'
                                    }}>
                                        Végétarien
                                    </div>
                                )}
                            </div>

                            {/* Content */}
                            <div style={{ padding: '2rem' }}>
                                <h3 style={{
                                    fontFamily: "'Playfair Display', serif",
                                    fontSize: '1.5rem',
                                    fontWeight: 600,
                                    color: '#1A1A1A',
                                    marginBottom: '0.75rem'
                                }}>
                                    {item.name}
                                </h3>

                                <p style={{
                                    fontSize: '0.9rem',
                                    color: 'rgba(26, 26, 26, 0.65)',
                                    lineHeight: 1.7,
                                    marginBottom: '1.5rem',
                                    fontStyle: 'italic'
                                }}>
                                    {item.description}
                                </p>

                                <div style={{
                                    display: 'flex',
                                    justifyContent: 'space-between',
                                    alignItems: 'center',
                                    marginBottom: '1rem'
                                }}>
                                    <span style={{
                                        fontFamily: "'Montserrat', sans-serif",
                                        fontSize: '1.5rem',
                                        fontWeight: 300,
                                        color: '#d4af37'
                                    }}>
                                        {item.price}€
                                    </span>
                                    <span style={{
                                        fontSize: '0.75rem',
                                        color: 'rgba(26, 26, 26, 0.5)',
                                        textTransform: 'uppercase',
                                        letterSpacing: '0.1em'
                                    }}>
                                        {item.category}
                                    </span>
                                </div>

                                {/* Star Rating */}
                                <StarRating menuItemId={item.id} />
                            </div>
                        </motion.div>
                    ))}
                </div>

                {menuItems.length === 0 && (
                    <div style={{ textAlign: 'center', padding: '4rem 0' }}>
                        <p style={{ fontSize: '1.25rem', color: 'rgba(26, 26, 26, 0.5)' }}>
                            Aucun plat disponible dans cette catégorie
                        </p>
                    </div>
                )}
            </section>

            <Toaster position="top-center" />
        </div>
    );
}
