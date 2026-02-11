import { motion } from 'framer-motion';

export default function ProductsPage() {
    return (
        <div style={{ backgroundColor: '#FDFCFB', minHeight: '100vh' }}>
            {/* Hero Section */}
            <section style={{
                minHeight: '70vh',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                textAlign: 'center',
                padding: '8rem 10% 6rem',
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
                        marginBottom: '2rem'
                    }}>
                        Nos Produits d'Exception
                    </h1>
                    <p style={{
                        fontSize: '1.5rem',
                        fontWeight: 300,
                        color: 'rgba(26, 26, 26, 0.7)',
                        maxWidth: '900px',
                        margin: '0 auto',
                        lineHeight: 1.8,
                        fontStyle: 'italic'
                    }}>
                        La fraîcheur et la qualité au cœur de chaque création culinaire
                    </p>
                </motion.div>
            </section>

            {/* Section 1 - Fraîcheur & Saison */}
            <section className="section-spacing" style={{ background: '#FDFCFB' }}>
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '6rem', alignItems: 'center', maxWidth: '1400px', margin: '0 auto' }}>
                    <motion.div
                        initial={{ opacity: 0, x: -30 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.7 }}
                    >
                        <img
                            src="/assets/chef_fresh_produce.png"
                            alt="Chef sélectionnant des produits frais"
                            style={{
                                width: '100%',
                                height: '600px',
                                objectFit: 'cover',
                                borderRadius: '2px',
                                filter: 'brightness(1.05) contrast(1.05)'
                            }}
                        />
                    </motion.div>
                    <motion.div
                        initial={{ opacity: 0, x: 30 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.7, delay: 0.2 }}
                    >
                        <h2 style={{
                            fontFamily: "'Playfair Display', serif",
                            fontSize: 'clamp(2.5rem, 5vw, 4rem)',
                            fontWeight: 700,
                            color: '#1A1A1A',
                            marginBottom: '2rem'
                        }}>
                            Fraîcheur & Saison
                        </h2>
                        <div className="accent-line" style={{ marginBottom: '2rem' }}></div>
                        <p style={{
                            fontSize: '1.125rem',
                            lineHeight: 2,
                            color: 'rgba(26, 26, 26, 0.8)',
                            marginBottom: '1.5rem'
                        }}>
                            Chaque matin, nos chefs sélectionnent avec soin les produits les plus frais du marché. Légumes croquants, herbes aromatiques, fruits juteux : tout est choisi au sommet de sa maturité pour garantir des saveurs incomparables.
                        </p>
                        <p style={{
                            fontSize: '1.125rem',
                            lineHeight: 2,
                            color: 'rgba(26, 26, 26, 0.8)'
                        }}>
                            Notre cuisine suit le rythme des saisons, célébrant les produits de chaque période de l'année dans des créations qui révèlent toute leur authenticité et leur caractère.
                        </p>
                    </motion.div>
                </div>
            </section>

            {/* Section 2 - Importations de France */}
            <section className="section-spacing" style={{ background: '#F5F3EF' }}>
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '6rem', alignItems: 'center', maxWidth: '1400px', margin: '0 auto' }}>
                    <motion.div
                        initial={{ opacity: 0, x: -30 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.7 }}
                    >
                        <h2 style={{
                            fontFamily: "'Playfair Display', serif",
                            fontSize: 'clamp(2.5rem, 5vw, 4rem)',
                            fontWeight: 700,
                            color: '#1A1A1A',
                            marginBottom: '2rem'
                        }}>
                            L'Excellence des Terroirs Français
                        </h2>
                        <div className="accent-line" style={{ marginBottom: '2rem' }}></div>
                        <p style={{
                            fontSize: '1.125rem',
                            lineHeight: 2,
                            color: 'rgba(26, 26, 26, 0.8)',
                            marginBottom: '1.5rem'
                        }}>
                            Pour certains de nos produits d'exception, nous travaillons directement avec des producteurs français renommés. Fromages AOC de Normandie, vins de Bordeaux et de Bourgogne, huile d'olive de Provence : chaque produit raconte l'histoire d'un terroir unique.
                        </p>
                        <p style={{
                            fontSize: '1.125rem',
                            lineHeight: 2,
                            color: 'rgba(26, 26, 26, 0.8)'
                        }}>
                            Ces partenariats nous permettent de vous offrir une expérience gastronomique authentiquement française, fidèle aux traditions culinaires que nous célébrons depuis 1766.
                        </p>
                    </motion.div>
                    <motion.div
                        initial={{ opacity: 0, x: 30 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.7, delay: 0.2 }}
                    >
                        <img
                            src="/assets/french_vineyard.png"
                            alt="Vignobles français au coucher du soleil"
                            style={{
                                width: '100%',
                                height: '600px',
                                objectFit: 'cover',
                                borderRadius: '2px',
                                filter: 'brightness(1.05) contrast(1.05)'
                            }}
                        />
                    </motion.div>
                </div>
            </section>

            {/* Section 3 - Excellence Quotidienne */}
            <section className="section-spacing" style={{ background: '#FDFCFB', textAlign: 'center' }}>
                <div style={{ maxWidth: '1000px', margin: '0 auto' }}>
                    <motion.div
                        initial={{ opacity: 0, y: 30 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.8 }}
                    >
                        <h2 style={{
                            fontFamily: "'Playfair Display', serif",
                            fontSize: 'clamp(2.5rem, 5vw, 4rem)',
                            fontWeight: 700,
                            color: '#1A1A1A',
                            marginBottom: '2rem'
                        }}>
                            Notre Engagement Quotidien
                        </h2>
                        <div className="accent-line" style={{ margin: '0 auto 3rem' }}></div>
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-12 md:gap-16 mt-20" style={{
                            display: 'grid',
                            gridTemplateColumns: 'repeat(3, 1fr)',
                            gap: '4rem',
                            marginTop: '5rem'
                        }}>
                            <div>
                                <h3 style={{
                                    fontFamily: "'Playfair Display', serif",
                                    fontSize: '1.75rem',
                                    color: 'var(--champagne)',
                                    marginBottom: '1rem'
                                }}>
                                    100% Frais
                                </h3>
                                <p style={{ fontSize: '1rem', lineHeight: 1.8, color: 'rgba(26, 26, 26, 0.7)' }}>
                                    Aucun produit surgelé ou en conserve. Tout est préparé le jour même avec des ingrédients frais.
                                </p>
                            </div>
                            <div>
                                <h3 style={{
                                    fontFamily: "'Playfair Display', serif",
                                    fontSize: '1.75rem',
                                    color: 'var(--champagne)',
                                    marginBottom: '1rem'
                                }}>
                                    Tracabilité
                                </h3>
                                <p style={{ fontSize: '1rem', lineHeight: 1.8, color: 'rgba(26, 26, 26, 0.7)' }}>
                                    Nous connaissons l'origine de chaque produit et entretenons des relations directes avec nos fournisseurs.
                                </p>
                            </div>
                            <div>
                                <h3 style={{
                                    fontFamily: "'Playfair Display', serif",
                                    fontSize: '1.75rem',
                                    color: 'var(--champagne)',
                                    marginBottom: '1rem'
                                }}>
                                    Respect
                                </h3>
                                <p style={{ fontSize: '1rem', lineHeight: 1.8, color: 'rgba(26, 26, 26, 0.7)' }}>
                                    Respect des producteurs, respect des saisons, respect des traditions culinaires françaises.
                                </p>
                            </div>
                        </div>
                    </motion.div>
                </div>
            </section>
        </div>
    );
}
