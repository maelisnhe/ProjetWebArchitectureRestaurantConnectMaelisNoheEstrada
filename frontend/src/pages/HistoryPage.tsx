import { motion } from 'framer-motion';

export default function HistoryPage() {
    return (
        <div style={{ backgroundColor: '#FDFCFB', minHeight: '100vh' }}>
            {/* Hero Section */}
            <section style={{
                minHeight: '80vh',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                textAlign: 'center',
                padding: '8rem 10% 6rem',
                background: 'linear-gradient(135deg, #2C2416 0%, #1A1A1A 100%)',
                color: '#FDFCFB',
                position: 'relative'
            }}>
                <div style={{
                    position: 'absolute',
                    inset: 0,
                    backgroundImage: 'url(/assets/restaurant_1766.png)',
                    backgroundSize: 'cover',
                    backgroundPosition: 'center',
                    opacity: 0.15,
                    filter: 'blur(2px)'
                }}></div>
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8 }}
                    style={{ position: 'relative', zIndex: 10 }}
                >
                    <div style={{
                        width: '80px',
                        height: '1px',
                        background: 'var(--champagne)',
                        margin: '0 auto 2rem'
                    }}></div>
                    <p style={{
                        fontSize: '1.25rem',
                        fontWeight: 300,
                        letterSpacing: '0.3em',
                        color: 'var(--champagne)',
                        marginBottom: '1.5rem',
                        textTransform: 'uppercase'
                    }}>
                        Depuis 1766
                    </p>
                    <h1 style={{
                        fontFamily: "'Playfair Display', serif",
                        fontSize: 'clamp(3.5rem, 8vw, 7rem)',
                        fontWeight: 800,
                        color: '#FDFCFB',
                        marginBottom: '2rem'
                    }}>
                        Notre Histoire
                    </h1>
                    <p style={{
                        fontSize: '1.5rem',
                        fontWeight: 300,
                        color: 'rgba(253, 252, 251, 0.8)',
                        maxWidth: '900px',
                        margin: '0 auto',
                        lineHeight: 1.8,
                        fontStyle: 'italic'
                    }}>
                        Deux siècles et demi d'élégance intemporelle et de respect des traditions culinaires françaises
                    </p>
                </motion.div>
            </section>

            {/* Section 1 - Les Origines (1766) */}
            <section className="section-spacing" style={{ background: '#FDFCFB' }}>
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '6rem', alignItems: 'center', maxWidth: '1400px', margin: '0 auto' }}>
                    <motion.div
                        initial={{ opacity: 0, x: -30 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.7 }}
                    >
                        <img
                            src="/assets/restaurant_1766.png"
                            alt="RestaurantConnect en 1766"
                            style={{
                                width: '100%',
                                height: '600px',
                                objectFit: 'cover',
                                borderRadius: '2px',
                                filter: 'sepia(0.3) contrast(1.1)'
                            }}
                        />
                    </motion.div>
                    <motion.div
                        initial={{ opacity: 0, x: 30 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.7, delay: 0.2 }}
                    >
                        <p style={{
                            fontSize: '1rem',
                            fontWeight: 300,
                            letterSpacing: '0.2em',
                            color: 'var(--champagne)',
                            marginBottom: '1rem',
                            textTransform: 'uppercase'
                        }}>
                            Chapitre I — 1766
                        </p>
                        <h2 style={{
                            fontFamily: "'Playfair Display', serif",
                            fontSize: 'clamp(2.5rem, 5vw, 4rem)',
                            fontWeight: 700,
                            color: '#1A1A1A',
                            marginBottom: '2rem'
                        }}>
                            Les Origines
                        </h2>
                        <div className="accent-line" style={{ marginBottom: '2rem' }}></div>
                        <p style={{
                            fontSize: '1.125rem',
                            lineHeight: 2,
                            color: 'rgba(26, 26, 26, 0.8)',
                            marginBottom: '1.5rem'
                        }}>
                            Fondé en 1766 au cœur de Paris, RestaurantConnect naît de la vision d'un maître cuisinier  passionné par l'art de la table et le raffinement français. Dans une époque où la gastronomie devient une véritable expression culturelle, notre établissement s'impose rapidement comme un lieu de rencontre pour l'aristocratie et les fins gourmets.
                        </p>
                        <p style={{
                            fontSize: '1.125rem',
                            lineHeight: 2,
                            color: 'rgba(26, 26, 26, 0.8)'
                        }}>
                            Dès ses débuts, la maison se distingue par son exigence de qualité, sa sélection rigoureuse des produits et son respect des traditions culinaires. Ces valeurs, transmises de génération en génération, restent au cœur de notre identité aujourd'hui.
                        </p>
                    </motion.div>
                </div>
            </section>

            {/* Section 2 - Évolution à travers les siècles */}
            <section className="section-spacing" style={{ background: '#F5F3EF' }}>
                <div style={{ maxWidth: '1200px', margin: '0 auto', textAlign: 'center' }}>
                    <motion.div
                        initial={{ opacity: 0, y: 30 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.8 }}
                    >
                        <p style={{
                            fontSize: '1rem',
                            fontWeight: 300,
                            letterSpacing: '0.2em',
                            color: 'var(--champagne)',
                            marginBottom: '1rem',
                            textTransform: 'uppercase'
                        }}>
                            Chapitre II — 18ème - 21ème siècle
                        </p>
                        <h2 style={{
                            fontFamily: "'Playfair Display', serif",
                            fontSize: 'clamp(2.5rem, 5vw, 4rem)',
                            fontWeight: 700,
                            color: '#1A1A1A',
                            marginBottom: '3rem'
                        }}>
                            Une Évolution Majestueuse
                        </h2>
                        <div className="accent-line" style={{ margin: '0 auto 4rem' }}></div>

                        {/* Timeline */}
                        <div style={{ display: 'flex', flexDirection: 'column', gap: '4rem', marginTop: '5rem' }}>
                            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '6rem', alignItems: 'start', textAlign: 'left' }}>
                                <div>
                                    <h3 style={{
                                        fontFamily: "'Playfair Display', serif",
                                        fontSize: '2rem',
                                        color: 'var(--champagne)',
                                        marginBottom: '1rem'
                                    }}>
                                        XIXème Siècle
                                    </h3>
                                    <p style={{ fontSize: '1rem', lineHeight: 1.8, color: 'rgba(26, 26, 26, 0.7)' }}>
                                        L'ère de l'industrialisation marque un tournant. RestaurantConnect maintient sa tradition artisanale tout en modernisant ses cuisines, devenant un symbole de résistance face à la standardisation.
                                    </p>
                                </div>
                                <div>
                                    <h3 style={{
                                        fontFamily: "'Playfair Display', serif",
                                        fontSize: '2rem',
                                        color: 'var(--champagne)',
                                        marginBottom: '1rem'
                                    }}>
                                        XXème Siècle
                                    </h3>
                                    <p style={{ fontSize: '1rem', lineHeight: 1.8, color: 'rgba(26, 26, 26, 0.7)' }}>
                                        À travers les deux guerres mondiales et les bouleversements sociaux, notre maison survit et prospère, devenant un pilier de la gastronomie parisienne, accueillant artistes, écrivains et hommes d'État.
                                    </p>
                                </div>
                            </div>
                        </div>
                    </motion.div>
                </div>
            </section>

            {/* Section 3 - Aujourd'hui */}
            <section className="section-spacing" style={{ background: '#FDFCFB' }}>
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '6rem', alignItems: 'center', maxWidth: '1400px', margin: '0 auto' }}>
                    <motion.div
                        initial={{ opacity: 0, x: -30 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.7 }}
                    >
                        <p style={{
                            fontSize: '1rem',
                            fontWeight: 300,
                            letterSpacing: '0.2em',
                            color: 'var(--champagne)',
                            marginBottom: '1rem',
                            textTransform: 'uppercase'
                        }}>
                            Chapitre III — Aujourd'hui
                        </p>
                        <h2 style={{
                            fontFamily: "'Playfair Display', serif",
                            fontSize: 'clamp(2.5rem, 5vw, 4rem)',
                            fontWeight: 700,
                            color: '#1A1A1A',
                            marginBottom: '2rem'
                        }}>
                            Tradition & Modernité
                        </h2>
                        <div className="accent-line" style={{ marginBottom: '2rem' }}></div>
                        <p style={{
                            fontSize: '1.125rem',
                            lineHeight: 2,
                            color: 'rgba(26, 26, 26, 0.8)',
                            marginBottom: '1.5rem'
                        }}>
                            Aujourd'hui, RestaurantConnect incarne l'alliance parfaite entre héritage et innovation. Nous puisons notre inspiration dans 258 ans d'histoire tout en embrassant les techniques culinaires contemporaines et les attentes d'une clientèle moderne et exigeante.
                        </p>
                        <p style={{
                            fontSize: '1.125rem',
                            lineHeight: 2,
                            color: 'rgba(26, 26, 26, 0.8)'
                        }}>
                            Notre engagement demeure inchangé : offrir une expérience gastronomique d'exception, fidèle aux valeurs qui ont forgé notre réputation depuis le règne de Louis XV. Chaque plat, chaque service, chaque détail reflète cette quête intemporelle de la perfection.
                        </p>
                    </motion.div>
                    <motion.div
                        initial={{ opacity: 0, x: 30 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.7, delay: 0.2 }}
                    >
                        <img
                            src="/assets/rustic_farm.png"
                            alt="Origines rurales - Ferme traditionnelle française"
                            style={{
                                width: '100%',
                                height: '600px',
                                objectFit: 'cover',
                                borderRadius: '2px',
                                filter: 'sepia(0.2) contrast(1.05)'
                            }}
                        />
                    </motion.div>
                </div>
            </section>
        </div>
    );
}
