import React, { useState } from 'react';
import { useGallery } from '../../context/GalleryContext';
import { LayoutDashboard, BookOpen, Layers, Award, Plus } from 'lucide-react';
import AddArtworkForm from '../../components/AddArtworkForm';
import AddExhibitionForm from '../../components/AddExhibitionForm';

const CuratorDashboard = () => {
    const { exhibitions } = useGallery();
    const [showArtForm, setShowArtForm] = useState(false);
    const [showExhibitionForm, setShowExhibitionForm] = useState(false);

    return (
        <div className="container" style={{ padding: '6rem 0' }}>
            <header style={{ marginBottom: '4rem', display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
                <div>
                    <h1 style={{ fontSize: '3rem' }}>Curator Atelier</h1>
                    <p style={{ color: 'var(--color-text-muted)' }}>Crafting narratives through visual journeys. Design your next exhibition.</p>
                </div>
                <div style={{ display: 'flex', gap: '1rem' }}>
                    <button className="btn btn-outline" onClick={() => setShowExhibitionForm(!showExhibitionForm)}>
                        <Plus size={18} style={{ marginRight: '0.5rem' }} /> {showExhibitionForm ? 'Close' : 'Launch Exhibition'}
                    </button>
                    <button className="btn btn-primary" onClick={() => setShowArtForm(!showArtForm)}>
                        <Plus size={18} style={{ marginRight: '0.5rem' }} /> {showArtForm ? 'Close' : 'Add Artwork'}
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

            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '2rem', marginBottom: '4rem' }}>
                <div style={{ padding: '2rem', border: '1px solid var(--color-border)', background: 'var(--color-white)' }}>
                    <h3 style={{ display: 'flex', alignItems: 'center', gap: '0.8rem', fontSize: '1.1rem', marginBottom: '1.5rem' }}>
                        <Layers size={18} /> Active Exhibitions
                    </h3>
                    {exhibitions.map(ex => (
                        <div key={ex.id} style={{ marginBottom: '1rem' }}>
                            <p style={{ fontWeight: '600' }}>{ex.title}</p>
                            <p style={{ fontSize: '0.8rem', color: 'var(--color-text-muted)' }}>{ex.description}</p>
                        </div>
                    ))}
                    <button className="btn btn-outline" style={{ width: '100%', marginTop: '1rem', fontSize: '0.75rem' }}>Create New</button>
                </div>

                <div style={{ padding: '2rem', border: '1px solid var(--color-border)', background: 'var(--color-white)' }}>
                    <h3 style={{ display: 'flex', alignItems: 'center', gap: '0.8rem', fontSize: '1.1rem', marginBottom: '1.5rem' }}>
                        <BookOpen size={18} /> Expert Insights
                    </h3>
                    <p style={{ fontSize: '0.85rem', color: 'var(--color-text-muted)', marginBottom: '1.5rem' }}>
                        You have 4 unpublished insights for individual artworks.
                    </p>
                    <div style={{ padding: '1rem', background: '#f9f7f2', borderRadius: '4px', border: '1px solid var(--color-border)' }}>
                        <p style={{ fontSize: '0.8rem', fontWeight: '600' }}>Reviewing "Solitude in Gold"</p>
                        <p style={{ fontSize: '0.75rem', opacity: 0.6 }}>Drafted last Tuesday</p>
                    </div>
                </div>

                <div style={{ padding: '2rem', border: '1px solid var(--color-border)', background: 'var(--color-white)' }}>
                    <h3 style={{ display: 'flex', alignItems: 'center', gap: '0.8rem', fontSize: '1.1rem', marginBottom: '1.5rem' }}>
                        <Award size={18} /> Gallery Themes
                    </h3>
                    <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.5rem' }}>
                        {['Minimalist', 'Baroque', 'Digital Echo', 'Surrealist'].map(theme => (
                            <span key={theme} style={{ padding: '4px 12px', border: '1px solid var(--color-border)', borderRadius: '20px', fontSize: '0.75rem' }}>
                                {theme}
                            </span>
                        ))}
                    </div>
                    <button className="btn btn-primary" style={{ width: '100%', marginTop: '1.5rem', fontSize: '0.75rem' }}>Global Settings</button>
                </div>
            </div>
        </div>
    );
};

export default CuratorDashboard;
