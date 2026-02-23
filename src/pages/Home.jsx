import React from 'react';
import { useGallery } from '../context/GalleryContext';
import ArtworkCard from '../components/ArtworkCard';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';

const Home = () => {
    const { artworks } = useGallery();
    const featured = artworks.filter(a => a.status === 'approved').slice(0, 3);

    return (
        <div>
            {/* Hero Section */}
            <section style={{
                padding: '10rem 0 6rem',
                textAlign: 'center',
                background: 'linear-gradient(to bottom, #f3f0e8, var(--color-bg))'
            }}>
                <div className="container">
                    <motion.span
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        style={{ textTransform: 'uppercase', letterSpacing: '0.3em', fontSize: '0.8rem', color: 'var(--color-accent)', marginBottom: '1rem', display: 'block' }}
                    >
                        Spring Exhibition 2026
                    </motion.span>
                    <motion.h1
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        style={{ fontSize: '4.5rem', marginBottom: '2rem', maxWidth: '900px', margin: '0 auto 2rem' }}
                    >
                        Where History Meets <span style={{ fontStyle: 'italic', fontWeight: '400' }}>the Heart</span>.
                    </motion.h1>
                    <motion.p
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.2 }}
                        style={{ maxWidth: '600px', margin: '0 auto 3rem', fontSize: '1.2rem', color: 'var(--color-text-muted)' }}
                    >
                        Enter a digital sanctuary where every stroke tells a story. Explore timeless masterpieces curated for the modern soul.
                    </motion.p>
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ delay: 0.4 }}
                    >
                        <Link to="/explore" className="btn btn-primary" style={{ marginRight: '1rem' }}>Explore Gallery</Link>
                        <Link to="/tour" className="btn btn-outline">Start Virtual Tour</Link>
                    </motion.div>
                </div>
            </section>

            {/* Featured Works */}
            <section style={{ padding: '8rem 0' }}>
                <div className="container">
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', marginBottom: '4rem' }}>
                        <div>
                            <h2 style={{ fontSize: '2.5rem' }}>Featured Creations</h2>
                            <p style={{ color: 'var(--color-text-muted)' }}>The highlights of our curated digital collection.</p>
                        </div>
                        <Link to="/explore" className="btn-link" style={{ fontSize: '1rem', borderBottom: '1px solid var(--color-accent)' }}>View all works</Link>
                    </div>

                    <div style={{
                        display: 'grid',
                        gridTemplateColumns: 'repeat(auto-fill, minmax(320px, 1fr))',
                        gap: '3rem'
                    }}>
                        {featured.map(artwork => (
                            <ArtworkCard key={artwork.id} artwork={artwork} />
                        ))}
                    </div>
                </div>
            </section>

            {/* Philosophy Section */}
            <section style={{ padding: '8rem 0', background: 'var(--color-text)', color: 'var(--color-white)' }}>
                <div className="container" style={{ textAlign: 'center' }}>
                    <h2 style={{ fontSize: '3rem', marginBottom: '2rem', opacity: 0.9 }}>Bridges Between Worlds</h2>
                    <p style={{ maxWidth: '700px', margin: '0 auto', fontSize: '1.3rem', fontWeight: '300', opacity: 0.7, lineHeight: '1.8' }}>
                        "Art washing away from the soul the dust of everyday life." Our mission is to democratize high-art through immersion, storytelling, and cultural appreciation.
                    </p>
                </div>
            </section>
        </div>
    );
};

export default Home;
