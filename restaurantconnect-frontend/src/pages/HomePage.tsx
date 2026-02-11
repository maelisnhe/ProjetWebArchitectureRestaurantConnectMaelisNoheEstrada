import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';

export default function HomePage() {
    return (
        <div style={{ backgroundColor: '#FDFCFB' }}>
            {/* Hero Section - 50% Text / 50% Image */}
            <section style={{
                display: 'flex',
                minHeight: '100vh',
                paddingTop: '5rem'
            }}>
                {/* Left: Text Content */}
                <div style={{
                    width: '50%',
                    display: 'flex',
                    flexDirection: 'column',
                    justifyContent: 'center',
                    padding: '0 8%',
                    paddingRight: '5rem',
                    marginRight: '3rem',
                    maxWidth: '700px'
                }}>
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8, ease: [0.25, 0.1, 0.25, 1] }}
                        style={{
                            width: '80px',
                            height: '1px',
                            background: '#d4af37',
                            margin: '2rem 0'
                        }}>
                    </motion.div>

                    <motion.h1
                        initial={{ opacity: 0, y: 30 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.9, delay: 0.2, ease: [0.25, 0.1, 0.25, 1] }}
                        style={{
                            fontFamily: "'Playfair Display', serif",
                            fontSize: 'clamp(3rem, 8vw, 6rem)',
                            fontWeight: 800,
                            lineHeight: 1.1,
                            marginBottom: '2rem',
                            color: '#1A1A1A'
                        }}>
                        L'Art de la<br />Gastronomie
                    </motion.h1>

                    <p style={{
                        fontSize: '1.25rem',
                        fontWeight: 300,
                        color: 'rgba(26, 26, 26, 0.8)',
                        lineHeight: 1.8,
                        maxWidth: '500px',
                        marginBottom: '3rem'
                    }}>
                        Une expérience culinaire d'exception où chaque plat raconte une histoire,
                        et chaque ingrédient est sélectionné avec soin.
                    </p>

                    <Link
                        to="/reservation"
                        className="btn-luxury"
                        style={{
                            display: 'inline-block',
                            width: 'fit-content'
                        }}
                    >
                        Réserver une Table
                    </Link>
                </div>

                <div style={{ width: '50%', position: 'relative', overflow: 'hidden' }}>
                    <img
                        src="https://images.unsplash.com/photo-1414235077428-338989a2e8c0?q=80&w=2070"
                        alt="Haute Cuisine"
                        className="w-full h-[300px] md:h-[calc(100vh-5rem)] object-cover"
                        style={{
                            width: '100%',
                            height: 'calc(100vh - 5rem)',
                            objectFit: 'cover',
                            filter: 'brightness(1.1)'
                        }}
                    />
                </div>
            </section>

            <section style={{
                position: 'relative',
                height: '60vh',
                overflow: 'hidden',
                display: 'flex',
                alignItems: 'center'
            }}>
                {/* Background Image with Zoom Animation */}
                <motion.div
                    initial={{ scale: 1 }}
                    whileInView={{ scale: 1.05 }}
                    transition={{ duration: 8, ease: "linear" }}
                    viewport={{ once: true, amount: 0.3 }}
                    style={{
                        position: 'absolute',
                        inset: 0,
                        backgroundImage: 'url(https://images.unsplash.com/photo-1600565193348-f74bd3c7ccdf?q=80&w=2070)',
                        backgroundSize: 'cover',
                        backgroundPosition: 'center',
                        zIndex: 0
                    }}
                />
                {/* Dark Overlay */}
                <div style={{
                    position: 'absolute',
                    inset: 0,
                    background: 'linear-gradient(to right, rgba(0,0,0,0.6), rgba(0,0,0,0.3))',
                    zIndex: 1
                }}></div>

                {/* Text Content */}
                <div style={{
                    position: 'relative',
                    zIndex: 2,
                    padding: '0 10%',
                    maxWidth: '1400px',
                    margin: '0 auto',
                    width: '100%'
                }}>
                    <motion.h2
                        initial={{ opacity: 0, y: 30 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8, ease: [0.25, 0.1, 0.25, 1] }}
                        viewport={{ once: true, amount: 0.5 }}
                        style={{
                            fontFamily: "'Playfair Display', serif",
                            fontSize: 'clamp(2.5rem, 6vw, 4rem)',
                            fontWeight: 800,
                            marginBottom: '1rem',
                            color: 'white',
                            textShadow: '0 2px 10px rgba(0,0,0,0.3)'
                        }}>
                        La Passion du Geste
                    </motion.h2>
                    <p style={{
                        fontSize: '1.25rem',
                        fontWeight: 300,
                        maxWidth: '500px',
                        color: 'white',
                        textShadow: '0 1px 5px rgba(0,0,0,0.5)'
                    }}>
                        Chaque création est le fruit d'années de maîtrise et d'amour pour la cuisine.
                    </p>
                </div>
            </section>

            {/* Notre Philosophie Section */}
            <section style={{
                background: 'white',
                padding: '8rem 10%'
            }}>
                <div style={{
                    maxWidth: '1000px',
                    margin: '0 auto',
                    textAlign: 'center'
                }}>
                    <div style={{
                        width: '80px',
                        height: '1px',
                        background: '#d4af37',
                        margin: '0 auto 2rem'
                    }}></div>

                    <motion.h2
                        initial={{ opacity: 0, y: 30 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8, ease: [0.25, 0.1, 0.25, 1] }}
                        viewport={{ once: true, amount: 0.5 }}
                        style={{
                            fontFamily: "'Playfair Display', serif",
                            fontSize: 'clamp(2.5rem, 6vw, 4rem)',
                            fontWeight: 800,
                            marginBottom: '2rem',
                            color: '#1A1A1A'
                        }}>
                        Notre Philosophie
                    </motion.h2>

                    <p style={{
                        fontSize: '1.25rem',
                        fontWeight: 300,
                        color: 'rgba(26, 26, 26, 0.7)',
                        lineHeight: 2,
                        marginBottom: '3rem',
                        fontStyle: 'italic'
                    }}>
                        Nous croyons en l'art de sublimer les produits de nos terroirs. Chaque matin,
                        nous sélectionnons auprès de producteurs locaux les ingrédients les plus frais
                        et les plus nobles. Notre cuisine célèbre les saisons, respecte la nature,
                        et honore les traditions tout en embrassant l'innovation.
                    </p>

                    <p style={{
                        fontSize: '1.25rem',
                        fontWeight: 300,
                        color: 'rgba(26, 26, 26, 0.7)',
                        lineHeight: 2,
                        fontStyle: 'italic'
                    }}>
                        L'art de recevoir est au cœur de notre démarche. Dans un cadre intime et raffiné,
                        nous vous invitons à partager un moment suspendu, où le temps s'arrête
                        pour laisser place à la contemplation et au plaisir des sens.
                    </p>
                </div>
            </section>

            <section style={{
                position: 'relative',
                height: '70vh',
                overflow: 'hidden',
                display: 'flex',
                alignItems: 'center'
            }}>
                {/* Background Image with Zoom Animation */}
                <motion.div
                    initial={{ scale: 1 }}
                    whileInView={{ scale: 1.05 }}
                    transition={{ duration: 8, ease: "linear" }}
                    viewport={{ once: true, amount: 0.3 }}
                    style={{
                        position: 'absolute',
                        inset: 0,
                        backgroundImage: 'url(https://images.unsplash.com/photo-1592861956120-e524fc739696?q=80&w=2070)',
                        backgroundSize: 'cover',
                        backgroundPosition: 'center',
                        zIndex: 0
                    }}
                />
                {/* Dark Overlay */}
                <div style={{
                    position: 'absolute',
                    inset: 0,
                    background: 'linear-gradient(to right, rgba(0,0,0,0.5), transparent)',
                    zIndex: 1
                }}></div>

                {/* Text Content */}
                <div style={{
                    position: 'relative',
                    zIndex: 2,
                    padding: '0 10%',
                    maxWidth: '1400px',
                    margin: '0 auto',
                    width: '100%'
                }}>
                    <motion.h2
                        initial={{ opacity: 0, y: 30 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8, ease: [0.25, 0.1, 0.25, 1] }}
                        viewport={{ once: true, amount: 0.5 }}
                        style={{
                            fontFamily: "'Playfair Display', serif",
                            fontSize: 'clamp(2.5rem, 6vw, 4rem)',
                            fontWeight: 800,
                            marginBottom: '1rem',
                            color: 'white',
                            textShadow: '0 2px 10px rgba(0,0,0,0.3)'
                        }}>
                        Une Ambiance Intime
                    </motion.h2>
                    <p style={{
                        fontSize: '1.25rem',
                        fontWeight: 300,
                        maxWidth: '500px',
                        color: 'white',
                        textShadow: '0 1px 5px rgba(0,0,0,0.5)'
                    }}>
                        Un écrin de raffinement pour célébrer vos moments précieux.
                    </p>
                </div>
            </section>

            {/* Excellence Grid */}
            <section style={{ padding: '8rem 10%' }}>
                <div style={{ maxWidth: '1400px', margin: '0 auto' }}>
                    <div style={{
                        display: 'grid',
                        gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
                        gap: '4rem'
                    }}>
                        {[
                            {
                                title: 'Excellence',
                                description: 'Chaque plat est une œuvre d\'art culinaire, préparée avec une précision d\'orfèvre et un souci du détail absolu.'
                            },
                            {
                                title: 'Authenticité',
                                description: 'Des produits de saison, soigneusement sélectionnés auprès des meilleurs maraîchers et producteurs de notre région.'
                            },
                            {
                                title: 'Élégance',
                                description: 'Un service discret et attentionné dans un cadre raffiné où chaque détail est pensé pour votre confort.'
                            }
                        ].map((item, idx) => (
                            <div key={idx} style={{ marginBottom: '2rem' }}>
                                <div style={{
                                    width: '80px',
                                    height: '1px',
                                    background: '#d4af37',
                                    margin: '2rem 0'
                                }}></div>
                                <h3 style={{
                                    fontFamily: "'Playfair Display', serif",
                                    fontSize: '2rem',
                                    fontWeight: 700,
                                    marginBottom: '1rem',
                                    color: '#1A1A1A'
                                }}>
                                    {item.title}
                                </h3>
                                <p style={{
                                    fontSize: '1rem',
                                    fontWeight: 300,
                                    color: 'rgba(26, 26, 26, 0.7)',
                                    lineHeight: 1.9
                                }}>
                                    {item.description}
                                </p>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Call to Action */}
            <section style={{
                textAlign: 'center',
                background: '#F5F3EF',
                padding: '8rem 10%'
            }}>
                <div style={{ maxWidth: '1400px', margin: '0 auto' }}>
                    <div style={{
                        width: '80px',
                        height: '1px',
                        background: '#d4af37',
                        margin: '0 auto 2rem'
                    }}></div>

                    <motion.h2
                        initial={{ opacity: 0, y: 30 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8, ease: [0.25, 0.1, 0.25, 1] }}
                        viewport={{ once: true, amount: 0.5 }}
                        style={{
                            fontFamily: "'Playfair Display', serif",
                            fontSize: 'clamp(2.5rem, 6vw, 4rem)',
                            fontWeight: 800,
                            marginBottom: '2rem',
                            color: '#1A1A1A'
                        }}>
                        Une Expérience Inoubliable
                    </motion.h2>

                    <p style={{
                        fontSize: '1.25rem',
                        fontWeight: 300,
                        color: 'rgba(26, 26, 26, 0.7)',
                        maxWidth: '600px',
                        margin: '0 auto 3rem',
                        lineHeight: 1.8
                    }}>
                        Laissez-vous transporter dans un voyage culinaire exceptionnel.
                    </p>

                    <Link
                        to="/menu"
                        className="btn-luxury"
                        style={{
                            display: 'inline-block'
                        }}
                    >
                        Découvrir Notre Menu
                    </Link>
                </div>
            </section>

        </div>
    );
}
