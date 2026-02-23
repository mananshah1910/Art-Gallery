import React, { useState } from 'react';
import { useGallery } from '../context/GalleryContext';
import { Trash2, ArrowRight, CheckCircle, ShoppingBag, CreditCard, Smartphone, Building2, X, Lock } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { Link } from 'react-router-dom';

import { loadStripe } from '@stripe/stripe-js';
import { Elements, CardElement, useStripe, useElements } from '@stripe/react-stripe-js';
import { createPaymentIntent } from '../services/paymentService';

// Initialize Stripe
const stripePromise = loadStripe(import.meta.env.VITE_STRIPE_PUBLISHABLE_KEY);

// ─── Stripe Checkout Form ───────────────────────────────────────────────────
const CheckoutForm = ({ total, onSuccess, onCancel }) => {
    const stripe = useStripe();
    const elements = useElements();
    const [error, setError] = useState(null);
    const [processing, setProcessing] = useState(false);
    const [succeeded, setSucceeded] = useState(false);

    const handleSubmit = async (event) => {
        event.preventDefault();

        if (!stripe || !elements) return;

        setProcessing(true);
        setError(null);

        // 1. Create Payment Intent (Simulated Backend Call)
        const { clientSecret, success } = await createPaymentIntent(total);

        if (!success) {
            setError("Failed to initialize payment. Please try again.");
            setProcessing(false);
            return;
        }

        // 2. Confirm Payment with Stripe
        // In a real scenario with a real clientSecret, we would call:
        // const result = await stripe.confirmCardPayment(clientSecret, {
        //     payment_method: { card: elements.getElement(CardElement) }
        // });

        // Since we are using a mock secret/key, we simulate the Stripe response:
        setTimeout(() => {
            setSucceeded(true);
            setProcessing(false);
            setTimeout(onSuccess, 1500);
        }, 2000);
    };

    return (
        <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
            <div style={{
                padding: '1.2rem',
                border: '1px solid var(--color-border)',
                borderRadius: '8px',
                background: 'rgba(255,255,255,0.03)'
            }}>
                <CardElement options={{
                    style: {
                        base: {
                            fontSize: '16px',
                            color: 'var(--color-text)',
                            fontFamily: 'var(--font-sans)',
                            '::placeholder': { color: 'var(--color-text-muted)' },
                        },
                        invalid: { color: 'var(--color-accent)' },
                    },
                }} />
            </div>

            {error && (
                <div style={{ color: 'var(--color-accent)', fontSize: '0.85rem', textAlign: 'center' }}>
                    {error}
                </div>
            )}

            <div style={{ display: 'flex', gap: '1rem', marginTop: '1rem' }}>
                <button
                    type="button"
                    onClick={onCancel}
                    disabled={processing || succeeded}
                    className="btn btn-outline"
                    style={{ flex: 1, padding: '1rem' }}
                >
                    Cancel
                </button>
                <button
                    type="submit"
                    disabled={!stripe || processing || succeeded}
                    className="btn btn-primary"
                    style={{ flex: 2, padding: '1rem', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '0.6rem' }}
                >
                    {processing ? (
                        <motion.div
                            animate={{ rotate: 360 }}
                            transition={{ repeat: Infinity, duration: 1, ease: 'linear' }}
                            style={{ width: 18, height: 18, borderRadius: '50%', border: '2px solid rgba(255,255,255,0.3)', borderTopColor: '#fff' }}
                        />
                    ) : succeeded ? (
                        <CheckCircle size={18} />
                    ) : (
                        <Lock size={16} />
                    )}
                    {succeeded ? 'Payment Complete' : processing ? 'Processing...' : `Pay ₹${total.toLocaleString()}`}
                </button>
            </div>

            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '0.5rem', opacity: 0.4, fontSize: '0.72rem', textTransform: 'uppercase', letterSpacing: '0.08em' }}>
                <Lock size={12} /> Powered by Stripe · PCI Compliant
            </div>
        </form>
    );
};

// ─── Payment Gateway Modal ───────────────────────────────────────────────────
const PaymentGateway = ({ total, onSuccess, onClose }) => {
    return (
        <div style={{
            position: 'fixed', inset: 0, zIndex: 999,
            background: 'rgba(0,0,0,0.7)',
            backdropFilter: 'blur(8px)',
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            padding: '1rem'
        }}>
            <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.95 }}
                style={{
                    background: 'var(--color-bg)',
                    borderRadius: '12px',
                    width: '100%',
                    maxWidth: '500px',
                    boxShadow: '0 25px 50px -12px rgba(0,0,0,0.5)',
                    border: '1px solid var(--color-border)',
                    overflow: 'hidden'
                }}
            >
                {/* Header */}
                <div style={{
                    background: 'var(--color-text)',
                    color: 'var(--color-bg)',
                    padding: '2rem',
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'center'
                }}>
                    <div>
                        <div style={{ fontSize: '0.7rem', textTransform: 'uppercase', letterSpacing: '0.2em', opacity: 0.6, marginBottom: '0.4rem' }}>
                            ArtVista Gallery Checkout
                        </div>
                        <div style={{ fontSize: '1.8rem', fontFamily: 'var(--font-serif)', fontWeight: 600 }}>
                            ₹{total.toLocaleString()}
                        </div>
                    </div>
                </div>

                <div style={{ padding: '2.5rem' }}>
                    <Elements stripe={stripePromise}>
                        <CheckoutForm total={total} onSuccess={onSuccess} onCancel={onClose} />
                    </Elements>
                </div>
            </motion.div>
        </div>
    );
};

const lbl = {
    display: 'block',
    fontSize: '0.72rem',
    textTransform: 'uppercase',
    letterSpacing: '0.05em',
    marginBottom: '0.5rem',
    color: 'var(--color-text-muted)'
};

const inp = {
    width: '100%',
    padding: '0.9rem 1rem',
    border: '1px solid var(--color-border)',
    borderRadius: '6px',
    fontFamily: 'var(--font-sans)',
    fontSize: '0.95rem',
    background: 'var(--color-bg)',
    color: 'var(--color-text)',
    outline: 'none'
};

// ─── Cart Page ────────────────────────────────────────────────────────────────
const Cart = () => {
    const { cart, removeFromCart, clearCart } = useGallery();
    const [showPayment, setShowPayment] = useState(false);
    const [isPurchased, setIsPurchased] = useState(false);

    const total = cart.reduce((sum, item) => sum + item.price, 0);

    const handleSuccess = () => {
        setShowPayment(false);
        setIsPurchased(true);
        clearCart?.();
    };

    if (isPurchased) {
        return (
            <div className="container" style={{ padding: '10rem 0', textAlign: 'center' }}>
                <motion.div initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }}>
                    <CheckCircle size={80} color="var(--color-accent)" style={{ marginBottom: '2rem' }} />
                    <h1 style={{ fontSize: '3rem', marginBottom: '1rem' }}>The Acquisition is Complete</h1>
                    <p style={{ color: 'var(--color-text-muted)', marginBottom: '3rem' }}>
                        A certificate of authenticity and the digital original have been sent to your collection.
                    </p>
                    <Link to="/explore" className="btn btn-primary">Discover More Art</Link>
                </motion.div>
            </div>
        );
    }

    return (
        <>
            <AnimatePresence>
                {showPayment && (
                    <PaymentGateway
                        total={total}
                        onSuccess={handleSuccess}
                        onClose={() => setShowPayment(false)}
                    />
                )}
            </AnimatePresence>

            <div className="container" style={{ padding: '6rem 0' }}>
                <header style={{ marginBottom: '4rem' }}>
                    <h1 style={{ fontSize: '3rem' }}>Your Collection Journey</h1>
                    <p style={{ color: 'var(--color-text-muted)' }}>Review the masterpieces you wish to bring into your life.</p>
                </header>

                {cart.length > 0 ? (
                    <div style={{ display: 'grid', gridTemplateColumns: '1.2fr 0.8fr', gap: '6rem' }}>
                        <div>
                            <div style={{ borderTop: '1px solid var(--color-border)' }}>
                                <AnimatePresence>
                                    {cart.map((item, idx) => (
                                        <motion.div
                                            key={`${item.id}-${idx}`}
                                            layout
                                            initial={{ opacity: 0, x: -20 }}
                                            animate={{ opacity: 1, x: 0 }}
                                            exit={{ opacity: 0, x: 20 }}
                                            transition={{ duration: 0.3 }}
                                            style={{
                                                display: 'flex',
                                                alignItems: 'center',
                                                padding: '2rem 0',
                                                borderBottom: '1px solid var(--color-border)'
                                            }}
                                        >
                                            <img src={item.image} alt={item.title} style={{ width: '120px', height: '120px', objectFit: 'cover', borderRadius: '4px', marginRight: '2.5rem' }} />
                                            <div style={{ flex: 1 }}>
                                                <p style={{ textTransform: 'uppercase', fontSize: '0.7rem', color: 'var(--color-accent)', letterSpacing: '0.1em', marginBottom: '0.4rem' }}>{item.artist}</p>
                                                <h3 style={{ fontSize: '1.3rem', color: 'var(--color-text)' }}>{item.title}</h3>
                                                <p style={{ color: 'var(--color-text-muted)', fontSize: '0.9rem' }}>{item.medium}</p>
                                            </div>
                                            <div style={{ textAlign: 'right', marginRight: '3rem' }}>
                                                <p style={{ fontSize: '1.2rem', fontWeight: '500', color: 'var(--color-text)' }}>₹{item.price.toLocaleString()}</p>
                                            </div>
                                            <button onClick={() => removeFromCart(item.id)} style={{ color: 'var(--color-text-muted)', opacity: 0.5, cursor: 'pointer' }}>
                                                <Trash2 size={20} />
                                            </button>
                                        </motion.div>
                                    ))}
                                </AnimatePresence>
                            </div>
                        </div>

                        <aside>
                            <div style={{
                                background: 'var(--color-white)',
                                padding: '3rem',
                                border: '1px solid var(--color-border)',
                                borderRadius: '4px',
                                position: 'sticky',
                                top: '120px',
                                color: 'var(--color-text)'
                            }}>
                                <h3 style={{ fontSize: '1.5rem', marginBottom: '2rem', borderBottom: '1px solid var(--color-border)', paddingBottom: '1rem' }}>Order Summary</h3>
                                <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '1.5rem' }}>
                                    <span style={{ color: 'var(--color-text-muted)' }}>Artworks ({cart.length})</span>
                                    <span style={{ fontWeight: '500' }}>₹{total.toLocaleString()}</span>
                                </div>
                                <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '2rem' }}>
                                    <span style={{ color: 'var(--color-text-muted)' }}>Secured Storage</span>
                                    <span style={{ color: 'var(--color-accent)', fontWeight: '500' }}>Complimentary</span>
                                </div>
                                <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '3rem', fontSize: '1.4rem', fontWeight: '600', borderTop: '1px solid var(--color-border)', paddingTop: '1.5rem' }}>
                                    <span>Total</span>
                                    <span>₹{total.toLocaleString()}</span>
                                </div>

                                <button
                                    onClick={() => setShowPayment(true)}
                                    className="btn btn-primary"
                                    style={{ width: '100%', padding: '1.5rem', marginBottom: '1rem', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '0.8rem', color: 'var(--color-white)' }}
                                >
                                    Proceed to Payment <ArrowRight size={18} />
                                </button>

                                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '0.4rem', opacity: 0.6, fontSize: '0.72rem', textTransform: 'uppercase', letterSpacing: '0.08em', color: 'var(--color-text-muted)' }}>
                                    <Lock size={12} /> Secure Checkout
                                </div>
                            </div>
                        </aside>
                    </div>
                ) : (
                    <div style={{ textAlign: 'center', padding: '8rem 0', opacity: 0.5 }}>
                        <ShoppingBag size={48} style={{ marginBottom: '2rem' }} />
                        <p style={{ fontSize: '1.2rem', marginBottom: '2rem' }}>Your collection is currently empty.</p>
                        <Link to="/explore" className="btn btn-outline">Explore the Gallery</Link>
                    </div>
                )}
            </div>
        </>
    );
};

export default Cart;
