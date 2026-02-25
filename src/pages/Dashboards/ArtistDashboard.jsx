import React, { useState } from 'react';
import { useGallery } from '../../context/GalleryContext';
import { useAuth } from '../../context/AuthContext';
import { Plus, Trash2, Image as ImageIcon, TrendingUp, Eye, CheckCircle, Clock, Palette } from 'lucide-react';
import { motion } from 'framer-motion';
import AddArtworkForm from '../../components/AddArtworkForm';

const ArtistDashboard = () => {
    const { user } = useAuth();
    const { artworks, exhibitions } = useGallery();
    const [showForm, setShowForm] = useState(false);
    const [activeTab, setActiveTab] = useState('portfolio');

    const artistArt = artworks.filter(a => a.artist === user?.name);
    const approvedArt = artistArt.filter(a => a.status === 'approved');
    const pendingArt = artistArt.filter(a => a.status === 'pending');
    const totalValue = artistArt.reduce((sum, a) => sum + (a.price || 0), 0);

    const containerVariants = {
        hidden: { opacity: 0 },
        visible: { opacity: 1, transition: { staggerChildren: 0.1 } }
    };
    const itemVariants = {
        hidden: { opacity: 0, y: 20 },
        visible: { opacity: 1, y: 0 }
    };

    return (
        <div className="container" style={{ padding: '6rem 0' }}>
            {/* Header */}
            <motion.header
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '4rem' }}
            >
                <div>
                    <p style={{ fontSize: '0.8rem', textTransform: 'uppercase', letterSpacing: '0.2em', color: 'var(--color-accent)', marginBottom: '0.5rem' }}>
                        Artist Studio
                    </p>
                    <h1 style={{ fontSize: '3rem', fontWeight: '700', letterSpacing: '-0.02em', marginBottom: '0.5rem' }}>
                        {user?.name || 'Artist'}
                    </h1>
                    <p style={{ color: 'var(--color-text-muted)' }}>
                        Manage your creative legacy. Every work tells a story.
                    </p>
                </div>
                <motion.button
                    whileHover={{ scale: 1.03 }}
                    whileTap={{ scale: 0.97 }}
                    className="btn btn-primary"
                    onClick={() => setShowForm(!showForm)}
                    style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}
                >
                    <Plus size={18} /> {showForm ? 'Close Form' : 'Submit Artwork'}
                </motion.button>
            </motion.header>

            {/* Stats Grid */}
            <motion.div
                variants={containerVariants}
                initial="hidden"
                animate="visible"
                style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '1.5rem', marginBottom: '3rem' }}
            >
                {[
                    { label: 'Total Works', value: artistArt.length, icon: ImageIcon, color: 'var(--color-accent)', sub: 'in your portfolio' },
                    { label: 'Approved', value: approvedArt.length, icon: CheckCircle, color: '#10b981', sub: 'live in gallery' },
                    { label: 'Pending Review', value: pendingArt.length, icon: Clock, color: '#f59e0b', sub: 'awaiting curation' },
                    { label: 'Portfolio Value', value: `₹${(totalValue / 100000).toFixed(1)}L`, icon: TrendingUp, color: 'var(--color-accent)', sub: 'market estimate' },
                ].map((stat, i) => (
                    <motion.div
                        key={i}
                        variants={itemVariants}
                        whileHover={{ y: -4, boxShadow: '0 12px 30px rgba(0,0,0,0.06)' }}
                        style={{
                            padding: '2rem',
                            border: '1px solid var(--color-border)',
                            borderRadius: '8px',
                            background: 'var(--color-white)',
                            transition: 'all 0.3s ease'
                        }}
                    >
                        <div style={{
                            width: '40px', height: '40px', borderRadius: '8px',
                            background: `${stat.color}18`,
                            display: 'flex', alignItems: 'center', justifyContent: 'center',
                            color: stat.color, marginBottom: '1.2rem'
                        }}>
                            <stat.icon size={20} />
                        </div>
                        <p style={{ fontSize: '2rem', fontWeight: '700', color: 'var(--color-text)', marginBottom: '0.2rem' }}>{stat.value}</p>
                        <p style={{ fontSize: '0.8rem', fontWeight: '600', textTransform: 'uppercase', letterSpacing: '0.08em', marginBottom: '0.2rem' }}>{stat.label}</p>
                        <p style={{ fontSize: '0.75rem', color: 'var(--color-text-muted)' }}>{stat.sub}</p>
                    </motion.div>
                ))}
            </motion.div>

            {/* Add Artwork Form */}
            {showForm && (
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    style={{ marginBottom: '3rem' }}
                >
                    <AddArtworkForm onSuccess={() => setShowForm(false)} />
                </motion.div>
            )}

            {/* Tab Switcher */}
            <div style={{ display: 'flex', gap: '2rem', borderBottom: '1px solid var(--color-border)', marginBottom: '2.5rem' }}>
                {['portfolio', 'exhibitions'].map(tab => (
                    <button
                        key={tab}
                        onClick={() => setActiveTab(tab)}
                        style={{
                            padding: '0.8rem 0',
                            fontSize: '0.85rem',
                            textTransform: 'uppercase',
                            letterSpacing: '0.1em',
                            fontWeight: activeTab === tab ? '700' : '400',
                            color: activeTab === tab ? 'var(--color-accent)' : 'var(--color-text-muted)',
                            borderBottom: activeTab === tab ? '2px solid var(--color-accent)' : '2px solid transparent',
                            background: 'none',
                            cursor: 'pointer',
                            transition: 'all 0.2s ease'
                        }}
                    >
                        {tab}
                    </button>
                ))}
            </div>

            <motion.div
                key={activeTab}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.25 }}
            >
                {activeTab === 'portfolio' && (
                    <div>
                        <h3 style={{ marginBottom: '1.5rem', fontSize: '1.3rem' }}>Your Collection</h3>

                        {/* Pending works banner */}
                        {pendingArt.length > 0 && (
                            <div style={{
                                background: '#fffbeb',
                                border: '1px solid #fde68a',
                                borderRadius: '8px',
                                padding: '1rem 1.5rem',
                                marginBottom: '1.5rem',
                                display: 'flex',
                                alignItems: 'center',
                                gap: '0.8rem',
                                fontSize: '0.9rem',
                                color: '#92400e'
                            }}>
                                <Clock size={16} />
                                <span>You have <strong>{pendingArt.length}</strong> artwork(s) pending admin approval.</span>
                            </div>
                        )}

                        <div style={{ display: 'flex', flexDirection: 'column', gap: '1.2rem' }}>
                            {artistArt.length > 0 ? artistArt.map(art => (
                                <motion.div
                                    key={art.id}
                                    whileHover={{ x: 4 }}
                                    style={{
                                        display: 'flex',
                                        alignItems: 'center',
                                        padding: '1.5rem',
                                        background: 'var(--color-white)',
                                        border: '1px solid var(--color-border)',
                                        borderRadius: '8px',
                                        gap: '1.5rem',
                                        transition: 'all 0.2s ease'
                                    }}
                                >
                                    <img
                                        src={art.image}
                                        alt={art.title}
                                        style={{ width: '80px', height: '80px', objectFit: 'cover', borderRadius: '6px', flexShrink: 0 }}
                                    />
                                    <div style={{ flex: 1, minWidth: 0 }}>
                                        <h4 style={{ fontSize: '1.05rem', marginBottom: '0.3rem' }}>{art.title}</h4>
                                        <p style={{ color: 'var(--color-text-muted)', fontSize: '0.8rem' }}>
                                            {art.medium} • {art.year}
                                        </p>
                                    </div>
                                    <div style={{ textAlign: 'right', flexShrink: 0 }}>
                                        <p style={{ fontSize: '1.1rem', fontWeight: '600', marginBottom: '0.4rem' }}>₹{art.price?.toLocaleString()}</p>
                                        <span style={{
                                            fontSize: '0.7rem',
                                            textTransform: 'uppercase',
                                            letterSpacing: '0.05em',
                                            color: art.status === 'approved' ? '#059669' : '#d97706',
                                            background: art.status === 'approved' ? '#d1fae5' : '#fef3c7',
                                            padding: '3px 10px',
                                            borderRadius: '20px',
                                            fontWeight: '600'
                                        }}>
                                            {art.status === 'approved' ? '✓ Approved' : '⏳ Pending'}
                                        </span>
                                    </div>
                                </motion.div>
                            )) : (
                                <div style={{
                                    textAlign: 'center',
                                    padding: '5rem 2rem',
                                    border: '2px dashed var(--color-border)',
                                    borderRadius: '12px',
                                    color: 'var(--color-text-muted)'
                                }}>
                                    <Palette size={40} style={{ marginBottom: '1rem', opacity: 0.3 }} />
                                    <p style={{ fontSize: '1.1rem', marginBottom: '0.5rem' }}>No artworks yet</p>
                                    <p style={{ fontSize: '0.85rem' }}>Click "Submit Artwork" to add your first piece.</p>
                                </div>
                            )}
                        </div>
                    </div>
                )}

                {activeTab === 'exhibitions' && (
                    <div>
                        <h3 style={{ marginBottom: '1.5rem', fontSize: '1.3rem' }}>Your Exhibitions</h3>
                        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))', gap: '1.5rem' }}>
                            {exhibitions.map(ex => (
                                <motion.div
                                    key={ex.id}
                                    whileHover={{ y: -4 }}
                                    style={{
                                        padding: '2rem',
                                        border: '1px solid var(--color-border)',
                                        borderRadius: '8px',
                                        background: 'var(--color-white)',
                                        transition: 'all 0.3s ease'
                                    }}
                                >
                                    <Eye size={16} style={{ color: 'var(--color-accent)', marginBottom: '1rem' }} />
                                    <h4 style={{ marginBottom: '0.5rem', fontSize: '1.05rem' }}>{ex.title}</h4>
                                    <p style={{ fontSize: '0.8rem', color: 'var(--color-accent)', marginBottom: '0.8rem' }}>
                                        Curated by {ex.curator}
                                    </p>
                                    <p style={{ fontSize: '0.85rem', color: 'var(--color-text-muted)', lineHeight: '1.6' }}>
                                        {ex.description}
                                    </p>
                                </motion.div>
                            ))}
                            {exhibitions.length === 0 && (
                                <div style={{ gridColumn: '1 / -1', textAlign: 'center', padding: '3rem', opacity: 0.5 }}>
                                    No exhibitions running yet.
                                </div>
                            )}
                        </div>
                    </div>
                )}
            </motion.div>
        </div>
    );
};

export default ArtistDashboard;
