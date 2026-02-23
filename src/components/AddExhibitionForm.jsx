import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { useGallery } from '../context/GalleryContext';

const AddExhibitionForm = ({ onSuccess }) => {
    const { addExhibition } = useGallery();
    const [formData, setFormData] = useState({
        title: '',
        description: '',
        curator: ''
    });

    const handleSubmit = (e) => {
        e.preventDefault();
        addExhibition(formData);
        if (onSuccess) onSuccess();
        setFormData({ title: '', description: '', curator: '' });
    };

    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            style={{
                padding: '3rem',
                border: '1px solid var(--color-accent)',
                background: 'var(--color-white)',
                borderRadius: '4px'
            }}
        >
            <h3 style={{ marginBottom: '2rem' }}>Launch New Exhibition</h3>
            <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
                <div>
                    <label style={labelStyle}>Exhibition Title</label>
                    <input
                        required
                        type="text"
                        placeholder="e.g. Modern Echoes"
                        value={formData.title}
                        onChange={e => setFormData({ ...formData, title: e.target.value })}
                        style={inputStyle}
                    />
                </div>
                <div>
                    <label style={labelStyle}>Curator Name</label>
                    <input
                        required
                        type="text"
                        placeholder="Assign an expert curator"
                        value={formData.curator}
                        onChange={e => setFormData({ ...formData, curator: e.target.value })}
                        style={inputStyle}
                    />
                </div>
                <div>
                    <label style={labelStyle}>Exhibition Description</label>
                    <textarea
                        required
                        value={formData.description}
                        onChange={e => setFormData({ ...formData, description: e.target.value })}
                        style={{ ...inputStyle, minHeight: '120px', resize: 'none' }}
                        placeholder="What is the narrative of this journey?"
                    />
                </div>
                <button type="submit" className="btn btn-primary" style={{ width: '100%' }}>
                    Publish Exhibition
                </button>
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

export default AddExhibitionForm;
