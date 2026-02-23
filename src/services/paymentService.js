/**
 * Payment Service
 * In a real application, these functions would make API calls to your backend.
 * Here we simulate the backend behavior for demonstration purposes.
 */

// Simulated backend endpoint to create a Payment Intent
export const createPaymentIntent = async (amount) => {
    console.log(`[Mock Backend] Creating Payment Intent for ₹${amount}`);

    // Simulate network delay
    await new Promise(resolve => setTimeout(resolve, 1500));

    // In a real Stripe integration, the backend would return a client_secret
    // Since we don't have a real backend, we'll just return a mock secret
    // For the frontend to actually "confirm" it with Stripe, we'd need a real secret.
    // However, we can simulate the frontend flow.
    return {
        clientSecret: 'pi_mock_secret_' + Math.random().toString(36).substring(7),
        success: true
    };
};

export const verifyPayment = async (paymentIntentId) => {
    console.log(`[Mock Backend] Verifying Payment: ${paymentIntentId}`);
    await new Promise(resolve => setTimeout(resolve, 1000));
    return { success: true };
};
