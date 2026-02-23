import React, { createContext, useContext, useState, useEffect } from 'react';

const GalleryContext = createContext();

const initialArtworks = [
    {
        id: 1,
        title: "Ethereal Whispers",
        artist: "Elena Vance",
        price: 99000,
        history: "Inspired by the misty mornings of the Scottish Highlands, this piece explores the thin line between reality and dreams. It represents the transient nature of memory.",
        medium: "Oil on Canvas",
        year: "2023",
        image: "https://images.unsplash.com/photo-1579783902614-a3fb3927b6a5?q=80&w=1000",
        status: "approved"
    },
    {
        id: 2,
        title: "Vibrant Chaos",
        artist: "Julian Thorne",
        price: 70000,
        history: "A study of urban rhythm and color. Thorne painted this live in the heart of Montmartre, capturing the raw energy of modern street life mixed with classical techniques.",
        medium: "Acrylic and Mixed Media",
        year: "2024",
        image: "https://images.unsplash.com/photo-1541963463532-d68292c34b19?q=80&w=1000",
        status: "approved"
    },
    {
        id: 3,
        title: "Solitude in Gold",
        artist: "Marcus Aurelius",
        price: 265000,
        history: "A neo-classical masterpiece following the Byzantine tradition of using gold leaf to represent divinity. It reflects the inner peace found in moments of silence.",
        medium: "Gold Leaf and Tempura",
        year: "2022",
        image: "https://images.unsplash.com/photo-1578301978693-85fa9c0320b9?q=80&w=1000",
        status: "approved"
    },
    {
        id: 4,
        title: "Celestial Dance",
        artist: "Aria Sol",
        price: 125000,
        history: "A cosmic journey through swirls of stardust and nebulae. Aria uses a unique layering technique to create a sense of infinite depth and movement.",
        medium: "Acrylic on canvas",
        year: "2024",
        image: "https://images.unsplash.com/photo-1534796636912-3b95b3ab5986?q=80&w=1000",
        status: "approved"
    },
    {
        id: 5,
        title: "Rustic Serenity",
        artist: "Thomas Miller",
        price: 45000,
        history: "Capturing the timeless beauty of a countryside sunset. This piece aims to transport the viewer to a place of quiet reflection and natural harmony.",
        medium: "Oil on Linen",
        year: "2023",
        image: "https://images.unsplash.com/photo-1500382017468-9049fed747ef?q=80&w=1000",
        status: "approved"
    },
    {
        id: 6,
        title: "Inner Reflection",
        artist: "Zoe Chen",
        price: 82000,
        history: "A psychological portrait exploring the layers of the subconscious. Zoe uses reflection and transparency to reveal the hidden complexities of the soul.",
        medium: "Mixed media",
        year: "2024",
        image: "https://images.unsplash.com/photo-1518709268805-4e9042af9f23?q=80&w=1000",
        status: "approved"
    },
    {
        id: 7,
        title: "Urban Pulse",
        artist: "Dexter Volt",
        price: 58000,
        history: "The electric energy of the modern metropolis at dusk. Neon streaks and blurred figures capture the frantic yet beautiful pace of city life.",
        medium: "Digital painting printed on aluminum",
        year: "2024",
        image: "https://images.unsplash.com/photo-1514565131-fce0801e5785?q=80&w=1000",
        status: "approved"
    },
    {
        id: 8,
        title: "Verdant Dreams",
        artist: "Luna Green",
        price: 110000,
        history: "A deep dive into the heart of an ancient forest. Luna's masterwork celebrates the raw power and intricate beauty of the natural world.",
        medium: "Oil on canvas",
        year: "2023",
        image: "https://images.unsplash.com/photo-1441974231531-c6227db76b6e?q=80&w=1000",
        status: "approved"
    }
];

export const GalleryProvider = ({ children }) => {
    const [artworks, setArtworks] = useState(initialArtworks);
    const [cart, setCart] = useState(() => {
        const savedCart = localStorage.getItem('art_gallery_cart');
        return savedCart ? JSON.parse(savedCart) : [];
    });

    const [exhibitions, setExhibitions] = useState([
        { id: 1, title: "Modern Echoes", description: "Highlighting contemporary abstract masters.", curator: "Sarah Jenkins" }
    ]);

    useEffect(() => {
        const savedArtworks = localStorage.getItem('art_gallery_artworks');
        if (savedArtworks) {
            const parsed = JSON.parse(savedArtworks);
            // Merge logic: Add initial artworks that are missing or update them if they match initialArtworks IDs
            const merged = [...parsed];
            initialArtworks.forEach(initial => {
                const index = merged.findIndex(a => a.id === initial.id);
                if (index === -1) {
                    merged.push(initial);
                } else if (merged[index].image !== initial.image) {
                    // Update if the image URL has changed (to fix broken links for example)
                    merged[index] = { ...merged[index], ...initial };
                }
            });
            setArtworks(merged);
            if (merged.length !== parsed.length) {
                localStorage.setItem('art_gallery_artworks', JSON.stringify(merged));
            }
        } else {
            setArtworks(initialArtworks);
            localStorage.setItem('art_gallery_artworks', JSON.stringify(initialArtworks));
        }

        const savedExhibitions = localStorage.getItem('art_gallery_exhibitions');
        if (savedExhibitions) {
            setExhibitions(JSON.parse(savedExhibitions));
        }
    }, []);

    useEffect(() => {
        localStorage.setItem('art_gallery_cart', JSON.stringify(cart));
    }, [cart]);

    const addArtwork = (artwork) => {
        const newArtworks = [...artworks, { status: 'pending', ...artwork, id: Date.now() }];
        setArtworks(newArtworks);
        localStorage.setItem('art_gallery_artworks', JSON.stringify(newArtworks));
    };

    const approveArtwork = (id) => {
        const updated = artworks.map(art => art.id === id ? { ...art, status: 'approved' } : art);
        setArtworks(updated);
        localStorage.setItem('art_gallery_artworks', JSON.stringify(updated));
    };

    const addToCart = (artwork) => {
        setCart([...cart, artwork]);
    };

    const removeFromCart = (id) => {
        setCart(cart.filter(item => item.id !== id));
    };

    const clearCart = () => {
        setCart([]);
    };

    const addExhibition = (exhibition) => {
        const newExhibitions = [...exhibitions, { ...exhibition, id: Date.now() }];
        setExhibitions(newExhibitions);
        localStorage.setItem('art_gallery_exhibitions', JSON.stringify(newExhibitions));
    };

    return (
        <GalleryContext.Provider value={{
            artworks,
            addArtwork,
            approveArtwork,
            cart,
            addToCart,
            removeFromCart,
            clearCart,
            exhibitions,
            setExhibitions,
            addExhibition
        }}>
            {children}
        </GalleryContext.Provider>
    );
};

export const useGallery = () => useContext(GalleryContext);
