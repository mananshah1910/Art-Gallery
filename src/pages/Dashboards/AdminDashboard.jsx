import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useGallery } from '../../context/GalleryContext';
import { useAuth } from '../../context/AuthContext';
import { CheckCircle, XCircle, Users, Settings, ShieldCheck, Plus, TrendingUp, Activity } from 'lucide-react';
import AddArtworkForm from '../../components/AddArtworkForm';
import AddExhibitionForm from '../../components/AddExhibitionForm';

const AdminDashboard = () => {
    const { artworks, approveArtwork, exhibitions } = useGallery();
    const { user } = useAuth();
    const [activeView, setActiveView] = useState('overview'); // 'overview', 'artworks', 'exhibitions', 'users'
    const [showArtForm, setShowArtForm] = useState(false);
    const [showExhibitionForm, setShowExhibitionForm] = useState(false);

    const pendingArt = artworks.filter(a => a.status === 'pending');
    const totalValue = artworks.reduce((sum, art) => sum + art.price, 0);

    const containerVariants = {
        hidden: { opacity: 0 },
        visible: {
            opacity: 1,
            transition: {
                staggerChildren: 0.1
            }
        }
    };

    const itemVariants = {
        hidden: { opacity: 0, y: 20 },
        visible: { opacity: 1, y: 0 }
    };

    return (
        <div className="container" style={{ padding: '6rem 0' }}>
            <header style={{ marginBottom: '4rem', display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
                <motion.div initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }}>
                    <h1 style={{ fontSize: '3rem', fontWeight: '700', letterSpacing: '-0.02em' }}>Admin Control</h1>
                    <p style={{ color: 'var(--color-text-muted)', fontSize: '1.1rem' }}>Overseeing the ArtVista ecosystem. Modern governance for timeless art.</p>
                </motion.div>
                <div style={{ display: 'flex', gap: '1rem' }}>
                    <button className="btn btn-outline" onClick={() => setShowExhibitionForm(!showExhibitionForm)}>
                        <Plus size={18} style={{ marginRight: '0.5rem' }} /> {showExhibitionForm ? 'Close' : 'New Exhibition'}
                    </button>
                    <button className="btn btn-primary" onClick={() => setShowArtForm(!showArtForm)}>
                        <Plus size={18} style={{ marginRight: '0.5rem' }} /> {showArtForm ? 'Close' : 'New Artwork'}
                    </button>
                </div>
            </header>

            {showArtForm && (
                <div style={{ marginBottom: '4rem' }}>
                    <AddArtworkForm onSuccess={() => setShowArtForm(false)} />
                </div>
            )}

            {showExhibitionForm && (
                <div style={{ marginBottom: '4rem' }}>
                    <AddExhibitionForm onSuccess={() => setShowExhibitionForm(false)} />
                </div>
            )}

            {/* View Switcher */}
            <div style={{ display: 'flex', gap: '2rem', marginBottom: '3rem', borderBottom: '1px solid var(--color-border)' }}>
                {['overview', 'artworks', 'exhibitions', 'users'].map(view => (
                    <button
                        key={view}
                        onClick={() => setActiveView(view)}
                        style={{
                            padding: '1rem 0',
                            fontSize: '0.9rem',
                            textTransform: 'uppercase',
                            letterSpacing: '0.1em',
                            fontWeight: activeView === view ? '600' : '400',
                            color: activeView === view ? 'var(--color-accent)' : 'var(--color-text-muted)',
                            borderBottom: activeView === view ? '2px solid var(--color-accent)' : 'none',
                            background: 'none',
                            cursor: 'pointer',
                            transition: 'all 0.3s ease',
                            position: 'relative'
                        }}
                    >
                        {view}
                        {activeView === view && (
                            <motion.div
                                layoutId="activeTab"
                                style={{
                                    position: 'absolute',
                                    bottom: '-1px',
                                    left: 0,
                                    right: 0,
                                    height: '2px',
                                    background: 'var(--color-accent)'
                                }}
                            />
                        )}
                    </button>
                ))}
            </div>

            <AnimatePresence mode="wait">
                <motion.div
                    key={activeView}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                    transition={{ duration: 0.2 }}
                >
                    {activeView === 'overview' && (
                        <section>
                            <motion.div
                                variants={containerVariants}
                                initial="hidden"
                                animate="visible"
                                style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: '1.5rem', marginBottom: '4rem' }}
                            >
                                {[
                                    { label: 'Total Artworks', value: artworks.length, icon: ShieldCheck, color: 'var(--color-accent)', trend: '+12% this month' },
                                    { label: 'Pending Approval', value: pendingArt.length, icon: Activity, color: pendingArt.length > 0 ? '#f59e0b' : 'var(--color-text-muted)', trend: 'Action required' },
                                    { label: 'Active Exhibitions', value: exhibitions.length, icon: Settings, color: '#10b981', trend: 'Live now' },
                                    { label: 'Platform Value', value: `₹${(totalValue / 100000).toFixed(1)}L`, icon: TrendingUp, color: 'var(--color-accent)', trend: 'Market estimate' }
                                ].map((stat, i) => (
                                    <motion.div
                                        key={i}
                                        variants={itemVariants}
                                        whileHover={{ y: -5, boxShadow: '0 20px 40px rgba(0,0,0,0.06)' }}
                                        style={{
                                            padding: '2.5rem 2rem',
                                            background: 'var(--color-white)',
                                            border: '1px solid var(--color-border)',
                                            borderRadius: '8px',
                                            display: 'flex',
                                            flexDirection: 'column',
                                            gap: '0.5rem',
                                            transition: 'all 0.3s ease'
                                        }}
                                    >
                                        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1rem' }}>
                                            <div style={{
                                                width: '40px',
                                                height: '40px',
                                                borderRadius: '8px',
                                                background: `${stat.color}15`,
                                                display: 'flex',
                                                alignItems: 'center',
                                                justifyContent: 'center',
                                                color: stat.color
                                            }}>
                                                <stat.icon size={20} />
                                            </div>
                                            <span style={{ fontSize: '0.7rem', color: stat.color === 'var(--color-text-muted)' ? 'var(--color-text-muted)' : stat.color, fontWeight: '600' }}>
                                                {stat.trend}
                                            </span>
                                        </div>
                                        <span style={{ fontSize: '2.2rem', fontWeight: '700', color: 'var(--color-text)' }}>{stat.value}</span>
                                        <span style={{ fontSize: '0.8rem', color: 'var(--color-text-muted)', textTransform: 'uppercase', letterSpacing: '0.1em', fontWeight: '500' }}>{stat.label}</span>
                                    </motion.div>
                                ))}
                            </motion.div>

                            <div style={{ display: 'grid', gridTemplateColumns: '2fr 1fr', gap: '3rem' }}>
                                <motion.div initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.4 }}>
                                    <h3 style={{ marginBottom: '2rem', display: 'flex', alignItems: 'center', gap: '0.8rem', fontSize: '1.4rem' }}>
                                        <Activity size={20} /> Real-time Activity
                                    </h3>
                                    <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                                        {pendingArt.slice(0, 4).map((art, idx) => (
                                            <motion.div
                                                key={art.id}
                                                initial={{ opacity: 0, scale: 0.95 }}
                                                animate={{ opacity: 1, scale: 1 }}
                                                transition={{ delay: 0.5 + (idx * 0.1) }}
                                                style={{
                                                    padding: '1.2rem',
                                                    border: '1px solid var(--color-border)',
                                                    borderRadius: '8px',
                                                    display: 'flex',
                                                    justifyContent: 'space-between',
                                                    alignItems: 'center',
                                                    background: 'var(--color-white)'
                                                }}
                                            >
                                                <div style={{ display: 'flex', gap: '1.2rem', alignItems: 'center' }}>
                                                    <img src={art.image} alt="" style={{ width: '40px', height: '40px', borderRadius: '4px', objectFit: 'cover' }} />
                                                    <div>
                                                        <p style={{ fontSize: '0.9rem', marginBottom: '0.2rem' }}>New submission: <strong>{art.title}</strong></p>
                                                        <p style={{ fontSize: '0.75rem', color: 'var(--color-text-muted)' }}>Artist: {art.artist}</p>
                                                    </div>
                                                </div>
                                                <button
                                                    onClick={() => setActiveView('artworks')}
                                                    className="btn btn-outline"
                                                    style={{ padding: '0.4rem 1rem', fontSize: '0.75rem' }}
                                                >
                                                    REVIEW
                                                </button>
                                            </motion.div>
                                        ))}
                                        <div style={{
                                            padding: '1.2rem',
                                            border: '1px solid var(--color-border)',
                                            borderRadius: '8px',
                                            display: 'flex',
                                            gap: '1rem',
                                            alignItems: 'center',
                                            background: '#f8fafc'
                                        }}>
                                            <div style={{ width: '10px', height: '10px', borderRadius: '50%', background: '#10b981', boxShadow: '0 0 10px #10b98180' }}></div>
                                            <span style={{ fontSize: '0.9rem' }}>Gateway Status: <strong>Operational</strong></span>
                                        </div>
                                    </div>
                                </motion.div>
                                <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.5 }}>
                                    <h3 style={{ marginBottom: '2rem', display: 'flex', alignItems: 'center', gap: '0.8rem', fontSize: '1.4rem' }}>
                                        <ShieldCheck size={20} /> Platform Health
                                    </h3>
                                    <div style={{ padding: '2.5rem 2rem', background: 'var(--color-white)', border: '1px solid var(--color-border)', borderRadius: '8px' }}>
                                        <div style={{ marginBottom: '2rem' }}>
                                            <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '0.8rem' }}>
                                                <span style={{ fontSize: '0.85rem', fontWeight: '500' }}>Curation Queue</span>
                                                <span style={{ fontSize: '0.85rem', color: 'var(--color-text-muted)' }}>{pendingArt.length} items</span>
                                            </div>
                                            <div style={{ height: '6px', width: '100%', background: '#f1f5f9', borderRadius: '3px', overflow: 'hidden' }}>
                                                <motion.div
                                                    initial={{ width: 0 }}
                                                    animate={{ width: `${(pendingArt.length / artworks.length) * 100}%` }}
                                                    style={{ height: '100%', background: '#f59e0b' }}
                                                />
                                            </div>
                                        </div>
                                        <div style={{ marginBottom: '2rem' }}>
                                            <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '0.8rem' }}>
                                                <span style={{ fontSize: '0.85rem', fontWeight: '500' }}>Exhibition Capacity</span>
                                                <span style={{ fontSize: '0.85rem', color: 'var(--color-text-muted)' }}>{exhibitions.length}/10</span>
                                            </div>
                                            <div style={{ height: '6px', width: '100%', background: '#f1f5f9', borderRadius: '3px', overflow: 'hidden' }}>
                                                <motion.div
                                                    initial={{ width: 0 }}
                                                    animate={{ width: `${(exhibitions.length / 10) * 100}%` }}
                                                    style={{ height: '100%', background: '#10b981' }}
                                                />
                                            </div>
                                        </div>
                                        <p style={{ fontSize: '0.8rem', color: 'var(--color-text-muted)', lineHeight: '1.6' }}>
                                            Monthly target is nearing 80%. Consider launching new curatorial calls to maintain momentum.
                                        </p>
                                    </div>
                                </motion.div>
                            </div>
                        </section>
                    )}
                    {activeView === 'artworks' && (
                        <section>
                            <h3 style={{ marginBottom: '2rem', display: 'flex', alignItems: 'center', gap: '0.8rem' }}>
                                <ShieldCheck size={20} /> Pending Submissions
                            </h3>
                            <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
                                {pendingArt.length > 0 ? pendingArt.map(art => (
                                    <div key={art.id} style={{
                                        padding: '1.5rem',
                                        background: 'var(--color-white)',
                                        border: '1px solid var(--color-border)',
                                        borderRadius: '4px',
                                        display: 'flex',
                                        gap: '1.5rem'
                                    }}>
                                        <img src={art.image} alt="" style={{ width: '100px', height: '100px', objectFit: 'cover', borderRadius: '4px' }} />
                                        <div style={{ flex: 1 }}>
                                            <h4 style={{ marginBottom: '0.2rem' }}>{art.title}</h4>
                                            <p style={{ fontSize: '0.85rem', color: 'var(--color-accent)', marginBottom: '0.5rem' }}>by {art.artist}</p>
                                            <p style={{ fontSize: '0.8rem', color: 'var(--color-text-muted)', lineHeight: '1.4' }}>
                                                {art.history.substring(0, 100)}...
                                            </p>
                                        </div>
                                        <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
                                            <button
                                                onClick={() => approveArtwork(art.id)}
                                                style={{ color: '#2e7d32', display: 'flex', alignItems: 'center', gap: '0.4rem', fontSize: '0.8rem', fontWeight: '600' }}
                                            >
                                                <CheckCircle size={18} /> APPROVE
                                            </button>
                                            <button style={{ color: '#d32f2f', display: 'flex', alignItems: 'center', gap: '0.4rem', fontSize: '0.8rem', fontWeight: '600' }}>
                                                <XCircle size={18} /> REJECT
                                            </button>
                                        </div>
                                    </div>
                                )) : (
                                    <div style={{ textAlign: 'center', padding: '3rem', opacity: 0.5, border: '1px dashed var(--color-border)' }}>
                                        No pending submissions to review.
                                    </div>
                                )}
                            </div>
                        </section>
                    )}

                    {activeView === 'exhibitions' && (
                        <section>
                            <h3 style={{ marginBottom: '2rem', display: 'flex', alignItems: 'center', gap: '0.8rem' }}>
                                <Settings size={20} /> Exhibition Management
                            </h3>
                            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))', gap: '2rem' }}>
                                {exhibitions.map(ex => (
                                    <div key={ex.id} style={{ padding: '2rem', border: '1px solid var(--color-border)', background: 'var(--color-white)' }}>
                                        <h4 style={{ marginBottom: '0.5rem' }}>{ex.title}</h4>
                                        <p style={{ fontSize: '0.8rem', color: 'var(--color-accent)', marginBottom: '1rem' }}>Curated by {ex.curator}</p>
                                        <p style={{ fontSize: '0.85rem', color: 'var(--color-text-muted)', lineHeight: '1.6' }}>{ex.description}</p>
                                        <div style={{ marginTop: '1.5rem', display: 'flex', gap: '1rem' }}>
                                            <button style={{ fontSize: '0.75rem', color: 'var(--color-text-muted)' }}>Edit</button>
                                            <button style={{ fontSize: '0.75rem', color: '#d32f2f' }}>Archive</button>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </section>
                    )}

                    {activeView === 'users' && (
                        <section>
                            <h3 style={{ marginBottom: '2rem', display: 'flex', alignItems: 'center', gap: '0.8rem' }}>
                                <Users size={20} /> Platform Users
                            </h3>
                            <div style={{ background: 'var(--color-white)', border: '1px solid var(--color-border)', borderRadius: '4px' }}>
                                {[
                                    { name: 'Elena Vance', role: 'Artist', status: 'Active' },
                                    { name: 'Sarah Jenkins', role: 'Curator', status: 'Active' },
                                    { name: 'Julian Thorne', role: 'Artist', status: 'Active' },
                                    { name: 'Manan Shah', role: 'Admin', status: 'Root' }
                                ].map((u, i) => (
                                    <div key={i} style={{
                                        padding: '1rem 1.5rem',
                                        borderBottom: i < 3 ? '1px solid var(--color-border)' : 'none',
                                        display: 'flex',
                                        justifyContent: 'space-between',
                                        alignItems: 'center'
                                    }}>
                                        <div>
                                            <p style={{ fontWeight: '500' }}>{u.name}</p>
                                            <p style={{ fontSize: '0.75rem', color: 'var(--color-text-muted)' }}>{u.role}</p>
                                        </div>
                                        <div style={{ display: 'flex', gap: '1rem', alignItems: 'center' }}>
                                            <span style={{ fontSize: '0.7rem', color: 'var(--color-text-muted)' }}>{u.status}</span>
                                            <Settings size={14} style={{ opacity: 0.4, cursor: 'pointer' }} />
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </section>
                    )}
                </motion.div>
            </AnimatePresence>
        </div>
    );
};

export default AdminDashboard;
