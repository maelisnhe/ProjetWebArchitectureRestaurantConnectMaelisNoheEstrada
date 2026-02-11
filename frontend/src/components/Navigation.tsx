import { NavLink } from 'react-router-dom';
import { Utensils } from 'lucide-react';

export default function Navigation() {
    const navItems = [
        { to: '/', label: 'Accueil' },
        { to: '/menu', label: 'Menu' },
        { to: '/reservation', label: 'Réserver' },
        { to: '/admin', label: 'Admin' },
    ];

    return (
        <nav className="nav-fixed">
            <div className="nav-container">
                <NavLink to="/" className="nav-logo">
                    <Utensils size={24} strokeWidth={1.5} style={{ color: '#D4AF37' }} />
                    <span>RestaurantConnect</span>
                </NavLink>

                <div className="nav-links">
                    {navItems.map((item) => (
                        <NavLink
                            key={item.to}
                            to={item.to}
                            className={({ isActive }) =>
                                `nav-link ${isActive ? 'active' : ''}`
                            }
                        >
                            {item.label}
                        </NavLink>
                    ))}
                </div>
            </div>
        </nav>
    );
}
