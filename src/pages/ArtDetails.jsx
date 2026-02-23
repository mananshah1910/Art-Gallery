import React from 'react';
import { useParams, Link } from 'react-router-dom';
import { useGallery } from '../context/GalleryContext';
import { motion } from 'framer-motion';
import { ShoppingBag, ArrowLeft, History, Palette } from 'lucide-react';

const ArtDetails = () => {
    const { id } = useParams();
    const { artworks, addToCart } = useGallery();
    const artwork = artworks.find(a => a.id === parseInt(id));

    if (!artwork) return <div className="container" style={{ padding: '8rem 0' }}>Artwork not found.</div>;

    return (
        <div className="container" style={{ padding: '6rem 0' }}>
            <Link to="/explore" style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '4rem', color: 'var(--color-text-muted)' }}>
                <ArrowLeft size={16} /> Back to Gallery
            </Link>

            <div style={{ display: 'grid', gridTemplateColumns: '1.2fr 1fr', gap: '6rem' }}>
                <motion.div
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                >
                    <img
                        src={artwork.image}
                        alt={artwork.title}
                        style={{ width: '100%', borderRadius: '4px', boxShadow: 'var(--shadow-lg)' }}
                    />
                </motion.div>

                <div style={{ display: 'flex', flexDirection: 'column', gap: '2.5rem' }}>
                    <div>
                        <motion.p
                            initial={{ opacity: 0 }} animate={{ opacity: 1 }}
                            style={{ textTransform: 'uppercase', letterSpacing: '0.2em', color: 'var(--color-accent)', marginBottom: '0.5rem' }}
                        >
                            {artwork.artist} — {artwork.year}
                        </motion.p>
                        <motion.h1
                            initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }}
                            style={{ fontSize: '3.5rem', marginBottom: '1rem' }}
                        >
                            {artwork.title}
                        </motion.h1>
                        <h2 style={{ fontSize: '2rem', fontWeight: '300' }}>₹{artwork.price.toLocaleString()}</h2>
                    </div>

                    <motion.div
                        initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.3 }}
                        style={{ background: '#f0ede4', padding: '2.5rem', borderRadius: '4px' }}
                    >
                        <h3 style={{ display: 'flex', alignItems: 'center', gap: '0.8rem', fontSize: '1.2rem', marginBottom: '1rem' }}>
                            <History size={18} /> The Cultural Journey
                        </h3>
                        <p style={{ color: 'var(--color-text-muted)', lineHeight: '1.8', fontStyle: 'italic' }}>
                            {artwork.history}
                        </p>
                    </motion.div>

                    <div style={{ display: 'flex', gap: '4rem' }}>
                        <div>
                            <p style={{ fontSize: '0.8rem', textTransform: 'uppercase', color: 'var(--color-text-muted)', marginBottom: '0.5rem' }}>Medium</p>
                            <p style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}><Palette size={16} /> {artwork.medium}</p>
                        </div>
                        <div>
                            <p style={{ fontSize: '0.8rem', textTransform: 'uppercase', color: 'var(--color-text-muted)', marginBottom: '0.5rem' }}>Provenance</p>
                            <p>Digital Original</p>
                        </div>
                    </div>

                    <button
                        onClick={() => addToCart(artwork)}
                        className="btn btn-primary"
                        style={{ width: '100%', padding: '1.5rem', fontSize: '1rem', letterSpacing: '0.2em' }}
                    >
                        <ShoppingBag size={20} style={{ marginRight: '1rem' }} /> Acquire Artwork
                    </button>
                </div>
            </div>
        </div>
    );
};

export default ArtDetails;
