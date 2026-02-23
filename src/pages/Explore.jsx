import React, { useState } from 'react';
import { useGallery } from '../context/GalleryContext';
import ArtworkCard from '../components/ArtworkCard';
import { Search, Filter } from 'lucide-react';

const Explore = () => {
    const { artworks } = useGallery();
    const [searchTerm, setSearchTerm] = useState('');

    const approvedArt = artworks.filter(a => a.status === 'approved');
    const filteredArt = approvedArt.filter(a =>
        a.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        a.artist.toLowerCase().includes(searchTerm.toLowerCase())
    );

    return (
        <div className="container" style={{ padding: '6rem 0' }}>
            <header style={{ marginBottom: '4rem', textAlign: 'center' }}>
                <h1 style={{ fontSize: '3.5rem', marginBottom: '1rem' }}>The Grand Gallery</h1>
                <p style={{ color: 'var(--color-text-muted)', maxWidth: '600px', margin: '0 auto 3rem' }}>
                    Traverse through our complete collection of digital masterpieces, curated by experts from around the globe.
                </p>

                <div style={{
                    display: 'flex',
                    justifyContent: 'center',
                    gap: '1rem',
                    maxWidth: '600px',
                    margin: '0 auto'
                }}>
                    <div style={{ position: 'relative', flex: 1 }}>
                        <Search size={18} style={{ position: 'absolute', left: '1rem', top: '50%', transform: 'translateY(-50%)', opacity: 0.4 }} />
                        <input
                            type="text"
                            placeholder="Search by title or artist..."
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                            style={{
                                width: '100%',
                                padding: '1rem 1rem 1rem 3rem',
                                border: '1px solid var(--color-border)',
                                borderRadius: '4px',
                                fontFamily: 'var(--font-sans)',
                                fontSize: '1rem'
                            }}
                        />
                    </div>
                    <button className="btn btn-outline" style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                        <Filter size={18} /> Filter
                    </button>
                </div>
            </header>

            {filteredArt.length > 0 ? (
                <div style={{
                    display: 'grid',
                    gridTemplateColumns: 'repeat(auto-fill, minmax(320px, 1fr))',
                    gap: '3rem'
                }}>
                    {filteredArt.map(artwork => (
                        <ArtworkCard key={artwork.id} artwork={artwork} />
                    ))}
                </div>
            ) : (
                <div style={{ textAlign: 'center', padding: '4rem 0', opacity: 0.5 }}>
                    <p>No masterpieces found matching your search.</p>
                </div>
            )}
        </div>
    );
};

export default Explore;
