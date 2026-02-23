import React from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';

const ArtworkCard = ({ artwork }) => {
    return (
        <motion.div
            whileHover={{ y: -10 }}
            style={{
                background: 'var(--color-white)',
                border: '1px solid var(--color-border)',
                overflow: 'hidden',
                display: 'flex',
                flexDirection: 'column'
            }}
        >
            <div style={{ position: 'relative', height: '400px', overflow: 'hidden' }}>
                <img
                    src={artwork.image}
                    alt={artwork.title}
                    style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                />
                <div style={{
                    position: 'absolute',
                    bottom: 0,
                    left: 0,
                    right: 0,
                    padding: '1.5rem',
                    background: 'linear-gradient(to top, rgba(0,0,0,0.4), transparent)',
                    opacity: 0,
                    transition: 'opacity 0.3s ease'
                }} className="hover-reveal">
                    <Link to={`/art/${artwork.id}`} className="btn btn-primary" style={{ fontSize: '0.7rem', color: 'white' }}>
                        View Story
                    </Link>
                </div>
            </div>

            <div style={{ padding: '1.5rem' }}>
                <p style={{ textTransform: 'uppercase', fontSize: '0.7rem', color: 'var(--color-accent)', letterSpacing: '0.1em', marginBottom: '0.5rem' }}>
                    {artwork.artist}
                </p>
                <h3 style={{ fontSize: '1.2rem', marginBottom: '0.5rem' }}>{artwork.title}</h3>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                    <span style={{ fontSize: '1.1rem', fontWeight: '300' }}>₹{artwork.price.toLocaleString()}</span>
                    <Link to={`/art/${artwork.id}`} style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', fontSize: '0.8rem', opacity: 0.6 }}>
                        Details <ArrowRight size={14} />
                    </Link>
                </div>
            </div>

            <style>{`
        div:hover .hover-reveal { opacity: 1; }
      `}</style>
        </motion.div>
    );
};

export default ArtworkCard;
