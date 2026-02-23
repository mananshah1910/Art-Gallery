import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { useGallery } from '../context/GalleryContext';
import { useTheme } from '../context/ThemeContext';
import { ShoppingCart, User, LogOut, Sun, Moon, Sparkles } from 'lucide-react';

const Navbar = () => {
    const { user, logout } = useAuth();
    const { cart } = useGallery();
    const { theme, toggleTheme } = useTheme();
    const navigate = useNavigate();
    const [themeMenuOpen, setThemeMenuOpen] = useState(false);

    const handleLogout = () => {
        logout();
        navigate('/');
    };

    const themes = [
        { id: 'light', icon: <Sun size={16} />, label: 'Light' },
        { id: 'dark', icon: <Moon size={16} />, label: 'Dark' },
        { id: 'midnight', icon: <Sparkles size={16} />, label: 'Midnight' }
    ];

    return (
        <nav className="glass" style={{
            position: 'sticky',
            top: 0,
            zIndex: 100,
            padding: '1.2rem 0',
            borderBottom: '1px solid var(--color-border)',
            transition: 'var(--transition-smooth)'
        }}>
            <div className="container" style={{
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center'
            }}>
                <Link to="/" style={{
                    fontSize: '1.5rem',
                    fontWeight: '600',
                    letterSpacing: '0.1em',
                    textTransform: 'uppercase',
                    fontFamily: 'var(--font-serif)',
                    color: 'var(--color-text)'
                }}>
                    ArtVista <span style={{ fontWeight: '300', color: 'var(--color-accent)' }}>Gallery</span>
                </Link>

                <div style={{ display: 'flex', alignItems: 'center', gap: '2rem' }}>
                    <Link to="/explore" className="nav-link">Explore</Link>
                    <Link to="/tour" className="nav-link">Virtual Tour</Link>

                    {user?.role === 'artist' && <Link to="/artist" className="nav-link">Studio</Link>}
                    {user?.role === 'curator' && <Link to="/curator" className="nav-link">Curate</Link>}
                    {user?.role === 'admin' && <Link to="/admin" className="nav-link">Admin</Link>}

                    <div style={{ display: 'flex', alignItems: 'center', gap: '1.5rem', marginLeft: '1rem' }}>
                        {/* Theme Switcher */}
                        <div style={{ position: 'relative' }}>
                            <button
                                onClick={() => setThemeMenuOpen(!themeMenuOpen)}
                                title="Change Theme"
                                style={{ color: 'var(--color-text)', display: 'flex', alignItems: 'center' }}
                            >
                                {theme === 'light' ? <Sun size={20} /> : theme === 'dark' ? <Moon size={20} /> : <Sparkles size={20} />}
                            </button>

                            {themeMenuOpen && (
                                <div style={{
                                    position: 'absolute',
                                    top: '100%',
                                    right: 0,
                                    marginTop: '1rem',
                                    background: 'var(--color-white)',
                                    border: '1px solid var(--color-border)',
                                    borderRadius: '4px',
                                    padding: '0.5rem',
                                    boxShadow: 'var(--shadow-md)',
                                    minWidth: '120px',
                                    display: 'flex',
                                    flexDirection: 'column',
                                    gap: '0.2rem',
                                    zIndex: 100
                                }}>
                                    {themes.map((t) => (
                                        <button
                                            key={t.id}
                                            onClick={() => {
                                                toggleTheme(t.id);
                                                setThemeMenuOpen(false);
                                            }}
                                            style={{
                                                display: 'flex',
                                                alignItems: 'center',
                                                gap: '0.8rem',
                                                padding: '0.5rem 0.8rem',
                                                fontSize: '0.85rem',
                                                color: theme === t.id ? 'var(--color-accent)' : 'var(--color-text)',
                                                background: theme === t.id ? 'rgba(0,0,0,0.05)' : 'transparent',
                                                borderRadius: '4px',
                                                textAlign: 'left'
                                            }}
                                        >
                                            {t.icon} {t.label}
                                        </button>
                                    ))}
                                </div>
                            )}
                        </div>

                        <Link to="/cart" style={{ position: 'relative', color: 'var(--color-text)' }}>
                            <ShoppingCart size={20} />
                            {cart.length > 0 && (
                                <span style={{
                                    position: 'absolute',
                                    top: '-8px',
                                    right: '-8px',
                                    background: 'var(--color-accent)',
                                    color: 'white',
                                    fontSize: '0.7rem',
                                    padding: '2px 6px',
                                    borderRadius: '10px'
                                }}>{cart.length}</span>
                            )}
                        </Link>

                        {user ? (
                            <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
                                <span style={{ fontSize: '0.9rem', color: 'var(--color-text-muted)' }}>{user.name}</span>
                                <button onClick={handleLogout} title="Logout" style={{ color: 'var(--color-text)' }}>
                                    <LogOut size={20} />
                                </button>
                            </div>
                        ) : (
                            <Link to="/login" title="Login" style={{ color: 'var(--color-text)' }}>
                                <User size={20} />
                            </Link>
                        )}
                    </div>
                </div>
            </div>

            <style>{`
        .nav-link {
          font-size: 0.9rem;
          text-transform: uppercase;
          letter-spacing: 0.05em;
          font-weight: 500;
          color: var(--color-text-muted);
        }
        .nav-link:hover {
          color: var(--color-text);
        }
      `}</style>
        </nav>
    );
};

export default Navbar;
