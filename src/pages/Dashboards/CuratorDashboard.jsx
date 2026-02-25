import React, { useState } from 'react';
import { useGallery } from '../../context/GalleryContext';
import { useAuth } from '../../context/AuthContext';
import { useTheme } from '../../context/ThemeContext';
import { Layers, BookOpen, Award, Plus, Eye, BarChart2, Compass, PenTool, CheckCircle, Palette, RotateCcw } from 'lucide-react';
import { motion } from 'framer-motion';
import AddArtworkForm from '../../components/AddArtworkForm';
import AddExhibitionForm from '../../components/AddExhibitionForm';

const CuratorDashboard = () => {
    const { user } = useAuth();
    const { artworks, exhibitions, approveArtwork } = useGallery();
    const { galleryTheme, setGalleryTheme } = useTheme();
    const [showArtForm, setShowArtForm] = useState(false);
    const [showExhibitionForm, setShowExhibitionForm] = useState(false);
    const [activeTab, setActiveTab] = useState('overview');

    const GALLERY_THEMES = [
        { id: 'minimalist', label: 'Minimalist', color: '#111', bg: '#fafafa', description: 'Clean, stripped-back purity' },
        { id: 'baroque', label: 'Baroque', color: '#c9a84c', bg: '#1c1209', description: 'Dark gold drama & opulence' },
        { id: 'digital-echo', label: 'Digital Echo', color: '#7b2fff', bg: '#050d1a', description: 'Neon cyberpunk glow' },
        { id: 'surrealist', label: 'Surrealist', color: '#e85d9c', bg: '#fdf5e6', description: 'Dreamy & otherworldly' },
        { id: 'neo-classical', label: 'Neo-Classical', color: '#8b5e3c', bg: '#f4efe8', description: 'Timeless earthy elegance' },
        { id: 'abstract', label: 'Abstract', color: '#ff6b35', bg: '#1a0a2e', description: 'Bold violet & fire' },
    ];

    const pendingArt = artworks.filter(a => a.status === 'pending');
    const approvedArt = artworks.filter(a => a.status === 'approved');

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
                        Curator Atelier
                    </p>
                    <h1 style={{ fontSize: '3rem', fontWeight: '700', letterSpacing: '-0.02em', marginBottom: '0.5rem' }}>
                        {user?.name || 'Curator'}
                    </h1>
                    <p style={{ color: 'var(--color-text-muted)' }}>
                        Crafting narratives through visual journeys. Design your next exhibition.
                    </p>
                </div>
                <div style={{ display: 'flex', gap: '1rem' }}>
                    <motion.button
                        whileHover={{ scale: 1.03 }}
                        className="btn btn-outline"
                        onClick={() => setShowExhibitionForm(!showExhibitionForm)}
                        style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}
                    >
                        <Plus size={18} /> {showExhibitionForm ? 'Close' : 'New Exhibition'}
                    </motion.button>
                    <motion.button
                        whileHover={{ scale: 1.03 }}
                        className="btn btn-primary"
                        onClick={() => setShowArtForm(!showArtForm)}
                        style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}
                    >
                        <Plus size={18} /> {showArtForm ? 'Close' : 'Add Artwork'}
                    </motion.button>
                </div>
            </motion.header>

            {/* Forms */}
            {showArtForm && (
                <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} style={{ marginBottom: '3rem' }}>
                    <AddArtworkForm onSuccess={() => setShowArtForm(false)} />
                </motion.div>
            )}
            {showExhibitionForm && (
                <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} style={{ marginBottom: '3rem' }}>
                    <AddExhibitionForm onSuccess={() => setShowExhibitionForm(false)} />
                </motion.div>
            )}

            {/* Stats */}
            <motion.div
                variants={containerVariants}
                initial="hidden"
                animate="visible"
                style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '1.5rem', marginBottom: '3rem' }}
            >
                {[
                    { label: 'Total Artworks', value: artworks.length, icon: Eye, color: 'var(--color-accent)', sub: 'across the gallery' },
                    { label: 'Pending Review', value: pendingArt.length, icon: PenTool, color: '#f59e0b', sub: 'needs your eye' },
                    { label: 'Active Exhibitions', value: exhibitions.length, icon: Layers, color: '#10b981', sub: 'live right now' },
                    { label: 'Approved Works', value: approvedArt.length, icon: CheckCircle, color: '#6366f1', sub: 'in public gallery' },
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
                        <p style={{ fontSize: '2rem', fontWeight: '700', marginBottom: '0.2rem' }}>{stat.value}</p>
                        <p style={{ fontSize: '0.8rem', fontWeight: '600', textTransform: 'uppercase', letterSpacing: '0.08em', marginBottom: '0.2rem' }}>{stat.label}</p>
                        <p style={{ fontSize: '0.75rem', color: 'var(--color-text-muted)' }}>{stat.sub}</p>
                    </motion.div>
                ))}
            </motion.div>

            {/* Tab Switcher */}
            <div style={{ display: 'flex', gap: '2rem', borderBottom: '1px solid var(--color-border)', marginBottom: '2.5rem' }}>
                {['overview', 'review', 'exhibitions'].map(tab => (
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
                        {tab === 'review' && pendingArt.length > 0 && (
                            <span style={{
                                marginLeft: '0.5rem',
                                background: '#f59e0b',
                                color: 'white',
                                fontSize: '0.65rem',
                                padding: '1px 6px',
                                borderRadius: '10px',
                                fontWeight: '700'
                            }}>
                                {pendingArt.length}
                            </span>
                        )}
                    </button>
                ))}
            </div>

            <motion.div
                key={activeTab}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.25 }}
            >
                {/* Overview Tab */}
                {activeTab === 'overview' && (
                    <div style={{ display: 'grid', gridTemplateColumns: '1.5fr 1fr', gap: '2.5rem' }}>
                        {/* Exhibition List */}
                        <div>
                            <h3 style={{ marginBottom: '1.5rem', fontSize: '1.2rem', display: 'flex', alignItems: 'center', gap: '0.7rem' }}>
                                <Layers size={18} /> Running Exhibitions
                            </h3>
                            <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                                {exhibitions.length > 0 ? exhibitions.map(ex => (
                                    <motion.div
                                        key={ex.id}
                                        whileHover={{ x: 5 }}
                                        style={{
                                            padding: '1.5rem',
                                            border: '1px solid var(--color-border)',
                                            borderRadius: '8px',
                                            background: 'var(--color-white)',
                                            borderLeft: '4px solid var(--color-accent)',
                                            transition: 'all 0.2s ease'
                                        }}
                                    >
                                        <h4 style={{ marginBottom: '0.3rem', fontSize: '1rem' }}>{ex.title}</h4>
                                        <p style={{ fontSize: '0.8rem', color: 'var(--color-accent)', marginBottom: '0.6rem' }}>
                                            Curated by {ex.curator}
                                        </p>
                                        <p style={{ fontSize: '0.82rem', color: 'var(--color-text-muted)', lineHeight: '1.6' }}>
                                            {ex.description}
                                        </p>
                                    </motion.div>
                                )) : (
                                    <div style={{
                                        textAlign: 'center', padding: '3rem', border: '2px dashed var(--color-border)',
                                        borderRadius: '8px', color: 'var(--color-text-muted)'
                                    }}>
                                        <Compass size={32} style={{ marginBottom: '1rem', opacity: 0.3 }} />
                                        <p>No exhibitions yet. Launch your first one!</p>
                                    </div>
                                )}
                            </div>
                        </div>

                        {/* Gallery Themes */}
                        <div>
                            <h3 style={{ marginBottom: '1.5rem', fontSize: '1.2rem', display: 'flex', alignItems: 'center', gap: '0.7rem' }}>
                                <Award size={18} /> Gallery Themes
                            </h3>
                            <div style={{ padding: '1.5rem', background: 'var(--color-white)', border: '1px solid var(--color-border)', borderRadius: '8px', marginBottom: '1.5rem' }}>
                                <p style={{ fontSize: '0.8rem', color: 'var(--color-text-muted)', marginBottom: '1.2rem', lineHeight: '1.5' }}>
                                    Select a theme to apply it across the entire gallery instantly.
                                </p>
                                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '0.6rem', marginBottom: '1.2rem' }}>
                                    {GALLERY_THEMES.map(t => (
                                        <motion.button
                                            key={t.id}
                                            whileHover={{ scale: 1.03 }}
                                            whileTap={{ scale: 0.97 }}
                                            onClick={() => setGalleryTheme(t.id)}
                                            style={{
                                                display: 'flex',
                                                alignItems: 'center',
                                                gap: '0.6rem',
                                                padding: '0.7rem 0.9rem',
                                                borderRadius: '8px',
                                                border: `2px solid ${galleryTheme === t.id ? t.color : 'var(--color-border)'}`,
                                                background: galleryTheme === t.id ? `${t.color}20` : 'transparent',
                                                cursor: 'pointer',
                                                transition: 'all 0.2s ease',
                                                textAlign: 'left',
                                                fontFamily: 'var(--font-sans)'
                                            }}
                                        >
                                            <div style={{
                                                width: '22px', height: '22px', borderRadius: '50%', flexShrink: 0,
                                                background: `linear-gradient(135deg, ${t.bg}, ${t.color})`,
                                                border: '1px solid rgba(0,0,0,0.1)'
                                            }} />
                                            <div>
                                                <p style={{ fontSize: '0.78rem', fontWeight: '600', color: 'var(--color-text)', lineHeight: 1.2 }}>{t.label}</p>
                                                <p style={{ fontSize: '0.68rem', color: 'var(--color-text-muted)', lineHeight: 1.2 }}>{t.description}</p>
                                            </div>
                                        </motion.button>
                                    ))}
                                </div>
                                {galleryTheme && (
                                    <button
                                        onClick={() => setGalleryTheme(galleryTheme)}
                                        style={{
                                            width: '100%',
                                            padding: '0.7rem',
                                            border: '1px solid var(--color-border)',
                                            borderRadius: '6px',
                                            fontSize: '0.78rem',
                                            color: 'var(--color-text-muted)',
                                            display: 'flex',
                                            alignItems: 'center',
                                            justifyContent: 'center',
                                            gap: '0.4rem',
                                            cursor: 'pointer',
                                            background: 'transparent'
                                        }}
                                    >
                                        <RotateCcw size={13} /> Reset to Default
                                    </button>
                                )}
                            </div>

                            <h3 style={{ marginBottom: '1.5rem', fontSize: '1.2rem', display: 'flex', alignItems: 'center', gap: '0.7rem' }}>
                                <BookOpen size={18} /> Expert Insights
                            </h3>
                            <div style={{ padding: '1.5rem', background: '#f9f7f2', borderRadius: '8px', border: '1px solid var(--color-border)' }}>
                                <p style={{ fontSize: '0.85rem', color: 'var(--color-text-muted)', marginBottom: '1rem', lineHeight: '1.6' }}>
                                    4 unpublished insights awaiting your approval.
                                </p>
                                <div style={{ padding: '1rem', background: 'white', borderRadius: '6px', border: '1px solid var(--color-border)' }}>
                                    <p style={{ fontSize: '0.85rem', fontWeight: '600', marginBottom: '0.3rem' }}>Reviewing "Solitude in Gold"</p>
                                    <p style={{ fontSize: '0.75rem', color: 'var(--color-text-muted)' }}>Drafted last Tuesday</p>
                                </div>
                            </div>
                        </div>
                    </div>
                )}

                {/* Review Tab */}
                {activeTab === 'review' && (
                    <div>
                        <h3 style={{ marginBottom: '1.5rem', fontSize: '1.2rem' }}>
                            Pending Submissions
                            {pendingArt.length > 0 && (
                                <span style={{
                                    marginLeft: '0.8rem', background: '#fef3c7', color: '#92400e',
                                    fontSize: '0.75rem', padding: '3px 10px', borderRadius: '20px', fontWeight: '600'
                                }}>
                                    {pendingArt.length} to review
                                </span>
                            )}
                        </h3>
                        <div style={{ display: 'flex', flexDirection: 'column', gap: '1.2rem' }}>
                            {pendingArt.length > 0 ? pendingArt.map(art => (
                                <motion.div
                                    key={art.id}
                                    initial={{ opacity: 0, x: -10 }}
                                    animate={{ opacity: 1, x: 0 }}
                                    style={{
                                        display: 'flex',
                                        alignItems: 'center',
                                        gap: '1.5rem',
                                        padding: '1.5rem',
                                        background: 'var(--color-white)',
                                        border: '1px solid var(--color-border)',
                                        borderRadius: '8px'
                                    }}
                                >
                                    <img src={art.image} alt={art.title} style={{ width: '90px', height: '90px', objectFit: 'cover', borderRadius: '6px', flexShrink: 0 }} />
                                    <div style={{ flex: 1, minWidth: 0 }}>
                                        <h4 style={{ fontSize: '1.05rem', marginBottom: '0.3rem' }}>{art.title}</h4>
                                        <p style={{ fontSize: '0.82rem', color: 'var(--color-accent)', marginBottom: '0.4rem' }}>by {art.artist}</p>
                                        <p style={{ fontSize: '0.8rem', color: 'var(--color-text-muted)', lineHeight: '1.4' }}>
                                            {art.history?.substring(0, 100)}...
                                        </p>
                                    </div>
                                    <div style={{ flexShrink: 0, display: 'flex', flexDirection: 'column', gap: '0.6rem', alignItems: 'flex-end' }}>
                                        <p style={{ fontSize: '1rem', fontWeight: '600' }}>₹{art.price?.toLocaleString()}</p>
                                        <button
                                            onClick={() => approveArtwork(art.id)}
                                            className="btn btn-primary"
                                            style={{ padding: '0.5rem 1.2rem', fontSize: '0.8rem', display: 'flex', alignItems: 'center', gap: '0.4rem' }}
                                        >
                                            <CheckCircle size={14} /> Approve
                                        </button>
                                    </div>
                                </motion.div>
                            )) : (
                                <div style={{
                                    textAlign: 'center', padding: '5rem 2rem',
                                    border: '2px dashed var(--color-border)', borderRadius: '12px',
                                    color: 'var(--color-text-muted)'
                                }}>
                                    <CheckCircle size={40} style={{ marginBottom: '1rem', opacity: 0.3 }} />
                                    <p style={{ fontSize: '1.1rem', marginBottom: '0.5rem' }}>All caught up!</p>
                                    <p style={{ fontSize: '0.85rem' }}>No submissions pending review.</p>
                                </div>
                            )}
                        </div>
                    </div>
                )}

                {/* Exhibitions Tab */}
                {activeTab === 'exhibitions' && (
                    <div>
                        <h3 style={{ marginBottom: '1.5rem', fontSize: '1.2rem' }}>All Exhibitions</h3>
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
                                    <BarChart2 size={18} style={{ color: 'var(--color-accent)', marginBottom: '1rem' }} />
                                    <h4 style={{ marginBottom: '0.5rem', fontSize: '1.05rem' }}>{ex.title}</h4>
                                    <p style={{ fontSize: '0.8rem', color: 'var(--color-accent)', marginBottom: '0.8rem' }}>
                                        Curated by {ex.curator}
                                    </p>
                                    <p style={{ fontSize: '0.85rem', color: 'var(--color-text-muted)', lineHeight: '1.6', marginBottom: '1.5rem' }}>
                                        {ex.description}
                                    </p>
                                    <div style={{ display: 'flex', gap: '0.8rem' }}>
                                        <button style={{ fontSize: '0.78rem', color: 'var(--color-text-muted)', cursor: 'pointer', background: 'none' }}>Edit</button>
                                        <button style={{ fontSize: '0.78rem', color: '#dc2626', cursor: 'pointer', background: 'none' }}>Archive</button>
                                    </div>
                                </motion.div>
                            ))}
                            {exhibitions.length === 0 && (
                                <div style={{ gridColumn: '1 / -1', textAlign: 'center', padding: '3rem', opacity: 0.5 }}>
                                    No exhibitions yet. Launch your first one above.
                                </div>
                            )}
                        </div>
                    </div>
                )}
            </motion.div>
        </div>
    );
};

export default CuratorDashboard;
