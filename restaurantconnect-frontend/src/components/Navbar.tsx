import { Link } from 'react-router-dom';

export default function Navbar() {
    return (
        <nav className="nav-fixed">
            <div className="nav-container">
                <Link to="/" className="nav-logo">
                    <span style={{ color: '#d4af37', fontSize: '2rem' }}>✦</span>
                    RestaurantConnect
                </Link>

                <div className="nav-links">
                    <Link to="/" className="nav-link">Accueil</Link>
                    <Link to="/menu" className="nav-link">Menu</Link>
                    <Link to="/produits" className="nav-link">Nos Produits</Link>
                    <Link to="/histoire" className="nav-link">Notre Histoire</Link>
                    <Link to="/avis" className="nav-link">Avis</Link>
                    <Link to="/reservation" className="nav-link">Réserver</Link>
                </div>
            </div>
        </nav>
    );
}
