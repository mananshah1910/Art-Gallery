import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { useAuth } from '../context/AuthContext';
import { useGallery } from '../context/GalleryContext';

const AddArtworkForm = ({ onSuccess }) => {
    const { user } = useAuth();
    const { addArtwork } = useGallery();

    const [formData, setFormData] = useState({
        title: '',
        price: '',
        history: '',
        medium: '',
        year: new Date().getFullYear(),
        image: '',
        artist: user?.role === 'artist' ? user?.name : ''
    });

    const isArtist = user?.role === 'artist';

    const handleSubmit = (e) => {
        e.preventDefault();
        // If not an artist, artists will be what they typed. If artist, it's their name.
        const artistName = isArtist ? user.name : formData.artist;

        addArtwork({
            ...formData,
            artist: artistName,
            price: parseFloat(formData.price),
            status: (user.role === 'admin' || user.role === 'curator') ? 'approved' : 'pending'
        });

        if (onSuccess) onSuccess();

        setFormData({
            title: '',
            price: '',
            history: '',
            medium: '',
            year: new Date().getFullYear(),
            image: '',
            artist: isArtist ? user?.name : ''
        });
    };

    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}
            style={{
                marginBottom: '4rem',
                padding: '3rem',
                border: '1px solid var(--color-accent)',
                background: 'var(--color-white)',
                borderRadius: '4px'
            }}
        >
            <h3 style={{ marginBottom: '2rem' }}>Upload New Masterpiece</h3>
            <form onSubmit={handleSubmit} style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '2rem' }}>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
                    <div>
                        <label style={labelStyle}>Title</label>
                        <input required type="text" value={formData.title} onChange={e => setFormData({ ...formData, title: e.target.value })} style={inputStyle} />
                    </div>

                    {!isArtist && (
                        <div>
                            <label style={labelStyle}>Artist Name</label>
                            <input required type="text" placeholder="Name of the artist" value={formData.artist} onChange={e => setFormData({ ...formData, artist: e.target.value })} style={inputStyle} />
                        </div>
                    )}

                    <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
                        <div>
                            <label style={labelStyle}>Price (₹)</label>
                            <input required type="number" value={formData.price} onChange={e => setFormData({ ...formData, price: e.target.value })} style={inputStyle} />
                        </div>
                        <div>
                            <label style={labelStyle}>Year</label>
                            <input required type="number" value={formData.year} onChange={e => setFormData({ ...formData, year: e.target.value })} style={inputStyle} />
                        </div>
                    </div>
                    <div>
                        <label style={labelStyle}>Image URL</label>
                        <input required type="url" placeholder="https://unsplash.com/..." value={formData.image} onChange={e => setFormData({ ...formData, image: e.target.value })} style={inputStyle} />
                    </div>
                    <div>
                        <label style={labelStyle}>Medium</label>
                        <input required type="text" placeholder="e.g. Oil on Canvas" value={formData.medium} onChange={e => setFormData({ ...formData, medium: e.target.value })} style={inputStyle} />
                    </div>
                </div>
                <div style={{ display: 'flex', flexDirection: 'column' }}>
                    <label style={labelStyle}>Cultural History / Story</label>
                    <textarea
                        required
                        value={formData.history}
                        onChange={e => setFormData({ ...formData, history: e.target.value })}
                        style={{ ...inputStyle, flex: 1, minHeight: '200px', resize: 'none' }}
                        placeholder="Tell the story behind this work..."
                    />
                    <button type="submit" className="btn btn-primary" style={{ marginTop: '1.5rem', width: '100%' }}>
                        {isArtist ? 'Submit for Approval' : 'Add to Gallery'}
                    </button>
                </div>
            </form>
        </motion.div>
    );
};

const labelStyle = { display: 'block', fontSize: '0.8rem', textTransform: 'uppercase', marginBottom: '0.5rem' };
const inputStyle = {
    width: '100%',
    padding: '0.8rem',
    border: '1px solid var(--color-border)',
    borderRadius: '4px',
    fontFamily: 'var(--font-sans)',
    fontSize: '0.9rem',
    background: 'white',
    color: 'black'
};

export default AddArtworkForm;
