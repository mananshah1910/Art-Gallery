import React, { useState } from 'react';
import { useGallery } from '../../context/GalleryContext';
import { useAuth } from '../../context/AuthContext';
import { Plus, Trash2, Edit3, Image as ImageIcon, BarChart2 } from 'lucide-react';
import { motion } from 'framer-motion';
import AddArtworkForm from '../../components/AddArtworkForm';

const ArtistDashboard = () => {
    const { user } = useAuth();
    const { artworks } = useGallery();
    const [showForm, setShowForm] = useState(false);

    const artistArt = artworks.filter(a => a.artist === user?.name);

    return (
        <div className="container" style={{ padding: '6rem 0' }}>
            <header style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '4rem' }}>
                <div>
                    <h1 style={{ fontSize: '3rem' }}>Artist Studio</h1>
                    <p style={{ color: 'var(--color-text-muted)' }}>Welcome back, {user?.name}. Manage your creative legacy here.</p>
                </div>
                <button className="btn btn-primary" onClick={() => setShowForm(!showForm)}>
                    <Plus size={18} style={{ marginRight: '0.5rem' }} /> {showForm ? 'Close Form' : 'New Discovery'}
                </button>
            </header>

            {/* Stats Area */}
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '2rem', marginBottom: '4rem' }}>
                {[
                    { label: 'Total Works', value: artistArt.length, icon: <ImageIcon size={20} /> },
                    { label: 'Exhibitions', value: '2', icon: <BarChart2 size={20} /> },
                    { label: 'Active Collectors', value: '12', icon: <BarChart2 size={20} /> }
                ].map((stat, i) => (
                    <div key={i} style={{ padding: '2rem', border: '1px solid var(--color-border)', borderRadius: '4px', background: 'var(--color-white)' }}>
                        <p style={{ textTransform: 'uppercase', fontSize: '0.7rem', color: 'var(--color-text-muted)', letterSpacing: '0.1em', marginBottom: '1rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                            {stat.icon} {stat.label}
                        </p>
                        <h2 style={{ fontSize: '2.5rem' }}>{stat.value}</h2>
                    </div>
                ))}
            </div>

            {showForm && (
                <AddArtworkForm onSuccess={() => setShowForm(false)} />
            )}

            <div>
                <h3 style={{ marginBottom: '2rem' }}>Your Collection</h3>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                    {artistArt.length > 0 ? artistArt.map((art) => (
                        <div key={art.id} style={{
                            display: 'flex',
                            alignItems: 'center',
                            padding: '1.5rem',
                            background: 'var(--color-white)',
                            border: '1px solid var(--color-border)',
                            borderRadius: '4px'
                        }}>
                            <img src={art.image} alt={art.title} style={{ width: '80px', height: '80px', objectFit: 'cover', borderRadius: '4px', marginRight: '2rem' }} />
                            <div style={{ flex: 1 }}>
                                <h4 style={{ fontSize: '1.1rem' }}>{art.title}</h4>
                                <p style={{ color: 'var(--color-text-muted)', fontSize: '0.85rem' }}>{art.medium} • {art.year}</p>
                            </div>
                            <div style={{ textAlign: 'right', marginRight: '3rem' }}>
                                <p style={{ fontSize: '1.1rem' }}>₹{art.price.toLocaleString()}</p>
                                <span style={{
                                    fontSize: '0.7rem',
                                    textTransform: 'uppercase',
                                    letterSpacing: '0.1em',
                                    color: art.status === 'approved' ? '#2e7d32' : '#ed6c02',
                                    background: art.status === 'approved' ? '#e8f5e9' : '#fff3e0',
                                    padding: '2px 8px',
                                    borderRadius: '10px'
                                }}>
                                    {art.status}
                                </span>
                            </div>
                            <div style={{ display: 'flex', gap: '1rem' }}>
                                <button title="Edit"><Edit3 size={18} opacity={0.5} /></button>
                                <button title="Delete" style={{ color: '#d32f2f' }}><Trash2 size={18} opacity={0.5} /></button>
                            </div>
                        </div>
                    )) : (
                        <p style={{ textAlign: 'center', padding: '4rem', opacity: 0.5, border: '1px dashed var(--color-border)' }}>No artworks in your collection yet.</p>
                    )}
                </div>
            </div>
        </div>
    );
};

const inputStyle = {
    width: '100%',
    padding: '0.8rem',
    border: '1px solid var(--color-border)',
    borderRadius: '4px',
    fontFamily: 'var(--font-sans)',
    fontSize: '0.9rem'
};

export default ArtistDashboard;
