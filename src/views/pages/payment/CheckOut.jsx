import {

    CardElement,

    useStripe,

    useElements

} from "@stripe/react-stripe-js";

import { useLocation, useNavigate } from "react-router-dom";



import { useState } from "react";

function PaymentCheckOutForm() {

    const stripe = useStripe();

    const elements = useElements();

    const navigate = useNavigate();

    const location = useLocation();

    const clientSecret = location.state?.clientSecret;

    const [processing, setProcessing] = useState(false);

    const [error, setError] = useState(null);

    if (!clientSecret) {

        return <p className="text-red-600">Payment session expired.</p>;

    }

    const handlePayment = async (e) => {

        e.preventDefault();

        if (!stripe || !elements || processing) return;

        setProcessing(true);

        setError(null);

        const result = await stripe.confirmCardPayment(clientSecret, {

            payment_method: {

                card: elements.getElement(CardElement)

            }

        });

        if (result.error) {

            setError(result.error.message);

            setProcessing(false);

            return;

        }

        if (result.paymentIntent.status === "succeeded") {

            alert("Payment successful ✅");

            // ⚠️ Appointment will be finalized by webhook

            navigate("/appointment?status=processing");

        }

    };

    return (
        <form onSubmit={handlePayment}>
            <CardElement />

            {error && (
                <p className="text-red-600 mt-2">{error}</p>

            )}

            <button

                type="submit"

                disabled={!stripe || processing}

                className="mt-4"
            >

                {processing ? "Processing..." : "Pay Now"}
            </button>
        </form>

    );

}

export default PaymentCheckOutForm;

