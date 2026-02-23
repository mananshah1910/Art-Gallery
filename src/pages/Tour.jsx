import React, { useState } from 'react';
import { useGallery } from '../context/GalleryContext';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronLeft, ChevronRight, Info } from 'lucide-react';
import { Link } from 'react-router-dom';

const Tour = () => {
    const { artworks } = useGallery();
    const tourArt = artworks.filter(a => a.status === 'approved');
    const [currentIndex, setCurrentIndex] = useState(0);

    const next = () => setCurrentIndex((prev) => (prev + 1) % tourArt.length);
    const prev = () => setCurrentIndex((prev) => (prev - 1 + tourArt.length) % tourArt.length);

    const currentArt = tourArt[currentIndex];

    return (
        <div style={{
            height: 'calc(100vh - 80px)',
            background: '#121212',
            color: 'white',
            overflow: 'hidden',
            position: 'relative',
            display: 'flex',
            flexDirection: 'column'
        }}>
            <div style={{ flex: 1, position: 'relative', display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '4rem' }}>
                <AnimatePresence mode="wait">
                    <motion.div
                        key={currentIndex}
                        initial={{ opacity: 0, x: 100 }}
                        animate={{ opacity: 1, x: 0 }}
                        exit={{ opacity: 0, x: -100 }}
                        transition={{ duration: 0.6, ease: "circOut" }}
                        style={{ position: 'relative', maxWidth: '80%', maxHeight: '80%' }}
                    >
                        <img
                            src={currentArt.image}
                            alt={currentArt.title}
                            style={{ width: '100%', height: 'auto', maxHeight: '70vh', border: '15px solid #222', boxShadow: '0 30px 60px rgba(0,0,0,0.5)' }}
                        />
                    </motion.div>
                </AnimatePresence>

                {/* Navigation Controls */}
                <button onClick={prev} style={{ position: 'absolute', left: '2rem', padding: '1rem', color: 'white', opacity: 0.5 }}>
                    <ChevronLeft size={48} />
                </button>
                <button onClick={next} style={{ position: 'absolute', right: '2rem', padding: '1rem', color: 'white', opacity: 0.5 }}>
                    <ChevronRight size={48} />
                </button>
            </div>

            <motion.div
                initial={{ y: 100 }}
                animate={{ y: 0 }}
                style={{
                    background: 'rgba(0,0,0,0.8)',
                    backdropFilter: 'blur(20px)',
                    padding: '2rem 4rem',
                    borderTop: '1px solid #333'
                }}
            >
                <div className="container" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                    <div>
                        <span style={{ color: 'var(--color-accent)', textTransform: 'uppercase', letterSpacing: '0.2rem', fontSize: '0.8rem' }}>
                            {currentIndex + 1} / {tourArt.length} — {currentArt.artist}
                        </span>
                        <h2 style={{ fontSize: '2rem', margin: '0.5rem 0' }}>{currentArt.title}</h2>
                        <p style={{ opacity: 0.7, maxWidth: '600px', fontSize: '0.9rem', fontStyle: 'italic' }}>
                            {currentArt.history.substring(0, 150)}...
                        </p>
                    </div>
                    <Link to={`/art/${currentArt.id}`} className="btn btn-outline" style={{ color: 'white', borderColor: 'white' }}>
                        <Info size={18} style={{ marginRight: '0.5rem' }} /> Full Details
                    </Link>
                </div>
            </motion.div>

            <div style={{ position: 'absolute', top: '2rem', left: '50%', transform: 'translateX(-50%)', textAlign: 'center' }}>
                <p style={{ textTransform: 'uppercase', letterSpacing: '0.5em', fontSize: '0.7rem', opacity: 0.5 }}>Virtual Tour Mode</p>
            </div>
        </div>
    );
};

export default Tour;
