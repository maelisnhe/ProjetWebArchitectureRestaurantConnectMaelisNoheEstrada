import { Link } from 'react-router-dom';

export default function Footer() {
    return (
        <footer className="footer">
            <div style={{ maxWidth: '1400px', margin: '0 auto' }}>
                <div className="footer-content">
                    <div className="footer-section">
                        <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', marginBottom: '1rem' }}>
                            <span className="footer-logo">✦</span>
                            <p style={{
                                fontFamily: "'Playfair Display', serif",
                                fontSize: '1.5rem',
                                color: '#d4af37',
                                margin: 0
                            }}>
                                RestaurantConnect
                            </p>
                        </div>
                        <p>L'art de la gastronomie française dans un écrin d'élégance.</p>
                    </div>

                    <div className="footer-section">
                        <h4>Horaires</h4>
                        <p>Déjeuner: 12h00 - 14h30</p>
                        <p>Dîner: 19h00 - 22h30</p>
                        <p style={{ fontSize: '0.8rem', color: 'rgba(253, 252, 251, 0.5)' }}>
                            Fermé dimanche et lundi
                        </p>
                    </div>

                    <div className="footer-section">
                        <h4>Contact</h4>
                        <p>12 Rue de la Paix</p>
                        <p>75001 Paris, France</p>
                        <p>+33 1 42 86 82 82</p>
                        <p>contact@restaurantconnect.fr</p>
                    </div>

                    <div className="footer-section">
                        <h4>Suivez-nous</h4>
                        <a href="#">Instagram</a>
                        <a href="#">Facebook</a>
                        <a href="#">TripAdvisor</a>
                    </div>
                </div>

                <div className="footer-bottom">
                    <p>© 2026 RestaurantConnect. Tous droits réservés.</p>
                </div>
            </div>
        </footer>
    );
}
