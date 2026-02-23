import React from 'react';
import Navbar from './Navbar';
import { motion, AnimatePresence } from 'framer-motion';
import { useLocation } from 'react-router-dom';

const Layout = ({ children }) => {
    const location = useLocation();

    return (
        <div style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column' }}>
            <Navbar />

            <main style={{ flex: 1 }}>
                <AnimatePresence mode="wait">
                    <motion.div
                        key={location.pathname}
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -10 }}
                        transition={{ duration: 0.4, ease: [0.23, 1, 0.32, 1] }}
                    >
                        {children}
                    </motion.div>
                </AnimatePresence>
            </main>

            <footer style={{
                padding: '4rem 0',
                borderTop: '1px solid var(--color-border)',
                marginTop: '4rem',
                textAlign: 'center'
            }}>
                <div className="container">
                    <h3 style={{ marginBottom: '1rem', opacity: 0.8 }}>ArtVista</h3>
                    <p style={{ color: 'var(--color-text-muted)', fontSize: '0.9rem', maxWidth: '400px', margin: '0 auto 2rem' }}>
                        "Art is the only way to run away without leaving home."
                        <br />
                        <span style={{ fontSize: '0.8rem', fontStyle: 'italic', marginTop: '0.5rem', display: 'block' }}>— Twyla Tharp</span>
                    </p>
                    <div style={{ display: 'flex', justifyContent: 'center', gap: '2rem', fontSize: '0.8rem', opacity: 0.6 }}>
                        <span>© 2026 ArtVista Virtual Gallery</span>
                        <span>Privacy</span>
                        <span>Terms</span>
                    </div>
                </div>
            </footer>
        </div>
    );
};

export default Layout;
