import React, { useEffect, useRef } from "react";
// import './Checkout.css';
import { PayPalButtons, PayPalScriptProvider } from "@paypal/react-paypal-js";
import { toast } from "sonner";
import { auth } from "../../config/firebaseConfig.js"
import { useNavigate } from "react-router-dom";


const Checkout = ( { promoCode }) => {
    console.log(promoCode + 'from paypal');
    const navigate = useNavigate();
    // usePayPalScriptReducer can be use only inside children of PayPalScriptProviders
    // This is the main reason to wrap the PayPalButtons in a new component

    const promoCodeRef = useRef(promoCode);

    useEffect(() => {
        console.log(promoCode + ' updated');
        promoCodeRef.current = promoCode;
    }, [promoCode]);

    return (
        <PayPalScriptProvider
            options={{
                clientId: process.env.REACT_APP_PAYPAL_CLIENT_ID,
                currency: "USD",
            }}
        >
            <PayPalButtons

                createOrder={(data, actions) => {
                    // Customize createOrder logic as needed
                    return new Promise((resolve, reject) => {

                        console.log(promoCodeRef.current + 'in create order')
                        // Customize createOrder logic as needed
                        fetch(`${process.env.REACT_APP_SERVER_URL}/create-paypal-order?promoCode=${promoCodeRef.current}`, {
                            method: "POST",
                            headers: {
                                "Content-Type": "application/json",
                            },
                            body: JSON.stringify({
                                items: localStorage.getItem("cart"),
                                uid: auth.currentUser?.uid ?? null,
                            }),
                        })
                            .then((res) => {
                                if (res.ok) return res.json();
                                return res
                                    .json()
                                    .then((json) => Promise.reject(json));
                            })
                            .then((order) => {
                                resolve(order.orderID);
                            })
                            .catch((err) => {
                                toast.error("Error creating order");
                                console.error(err.message);
                                reject(err);
                            });
                    });
                }}
                onApprove={(data, actions) => {
                    // Customize onApprove logic as needed
                    return actions.order.capture().then((details) => {
                        toast("Payment completed:");

                        fetch(`${process.env.REACT_APP_SERVER_URL}/capture-paypal-transaction`, {
                            method: "POST",
                            headers: {
                                "Content-Type": "application/json",
                            },
                            body: JSON.stringify({
                                orderID: data.orderID,
                                payerEmail: details.payer.email_address,
                            }),
                        })
                            .then((res) => {
                                if (res.ok) return res.json();
                                return res
                                    .json()
                                    .then((json) => Promise.reject(json));
                            })
                            .then((transaction) => {
                                console.log(transaction);
                                const { downloadToken, orderID, hasDownloads } =
                                    transaction;

                                fetch(`${process.env.REACT_APP_SERVER_URL}/send-receipt`, {
                                    method: "POST",
                                    headers: {
                                        "Content-Type": "application/json",
                                    },
                                    body: JSON.stringify({
                                        orderID,
                                        payerEmail: details.payer.email_address,
                                        downloadToken: downloadToken,
                                        payerName: details.payer.name.given_name,
                                        hasDownloads,
                                    }),
                                })
                                    .then((res) => {
                                        if (res.ok) return res.text();
                                        return res
                                            .text()
                                            .then((text) =>
                                                Promise.reject(text)
                                            );
                                    })
                                    .then((text) => {
                                        console.log(text);
                                    })
                                    .catch((err) => {
                                        toast.error("Error sending receipt");
                                        console.error(err);
                                    });
                                navigate(
                                    `/receipt?download_token=${downloadToken}&paypal_id=${orderID}&has_downloads=${hasDownloads}`
                                );
                            })
                            .catch((err) => {
                                toast.error("Error capturing transaction");
                                console.error(err.message);
                            });
                    });
                }}
            />
        </PayPalScriptProvider>
    );
};

// const Checkout = () => {
//     const style = { layout: "vertical" };

//     return (
//         <div className="checkout">
//             <>{isPending && <div className="spinner" />}</>
//         </div>
//     );
// };

export default Checkout;
