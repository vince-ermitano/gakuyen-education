import React, { useCallback, useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import "./Sidebar.css";
// import { products } from "../../products/products";
import CartItem from "./CartItem";
import {
    toggleCartSidebar,
    toggleLoginSidebar,
} from "../../features/SidebarSlice";
import { calculateTotalPrice } from "../../features/ShopSlice";
import { auth } from "../../config/firebaseConfig";
// import { toast } from "react-toastify";
import { toast } from "sonner";
// import { TOAST_POSITION } from "../../helpers";
import { updateCartAfterRemovalOfDupes } from "../../helpers";
import { BiArrowBack } from "react-icons/bi";
import Checkout from "../PayPalCheckout/PayPalCheckout";
import {
    Elements,
    PaymentMethodMessagingElement,
} from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";

const CartSidebar = () => {
    const stripePromise = useState(
        loadStripe(process.env.REACT_APP_STRIPE_PUBLIC_KEY)
    )[0];
    const dispatch = useDispatch();
    // const isLoggedIn = useSelector((state) => state.loggedInStatus.isLoggedIn);
    
    // const showPayPal = localStorage.getItem("cart")["MC-01"] === undefined || isLoggedIn;

    // redux states
    const cartSidebarIsOpen = useSelector(
        (state) => state.sidebar.cartSidebarIsOpen
    );
    const products = useSelector((state) => state.shop.products);
    const cartTotal = useSelector((state) => state.shop.totalPrice);
    const authorized = useSelector((state) => state.user.authorized);
    // const promoCode = useSelector((state) => state.user.promoCode);
    // const [promoCodeApplied, setPromoCodeApplied] = useState(false);
    const [promoCode, setPromoCode] = useState('');
    const [appliedPromoCode, setAppliedPromoCode] = useState('');

    const cartItems = cartSidebarIsOpen
        ? JSON.parse(localStorage.getItem("cart")) || {}
        : {};

    const handlePromoCode = async (e) => {
        e.preventDefault();

        try {
            const response = await fetch(`${process.env.REACT_APP_SERVER_URL}/check-promo-code`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    promoCode: promoCode,
                }),
            });

            if (response.ok) {
                const json = await response.json();
                
                // apply discount to cart
                console.log(json);

                document.getElementById('promo-code-info').style.display = 'block';

                document.querySelector('.total span:last-child').style.textDecoration = 'line-through';
                document.getElementById('applied-promo-code').innerText = promoCode;
                document.getElementById('applied-discount').innerText = `${json.discount}%`;
                document.getElementById('discounted-total').innerText = `$${calculateTotalWithDiscount(json.discount)}`;

                toast.success('Promo code applied!');

                setAppliedPromoCode(promoCode);
                setPromoCode('');
            } else {
                const json = await response.json();
                toast.error(json.error);
            }
        } catch (error) {
            console.error(error);
        }
    }

    const calculateTotalWithDiscount = (discount) => {

        if (Object.keys(products).length === 0) {
            return 0;
        }

        const cartItems = JSON.parse(localStorage.getItem("cart")) || {};

        let totalPrice = 0;

        for (const itemId in cartItems) {
            if (
                cartItems.hasOwnProperty(itemId) &&
                products.hasOwnProperty(itemId)
            ) {
                totalPrice += cartItems[itemId] * products[itemId].price;
            }
        }

        if (discount) {
            totalPrice -= totalPrice * discount / 100;
        }
        totalPrice = totalPrice.toFixed(2);

        return totalPrice;
    }



    // handle functions
    const createCheckoutSession = useCallback(() => {
        if (!auth.currentUser) {
            const appliedPromoCode = document.getElementById('applied-promo-code').innerText;

            fetch(
                `${process.env.REACT_APP_SERVER_URL}/create-checkout-session?promoCode=${appliedPromoCode}`,
                {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                    },
                    body: localStorage.getItem("cart"),
                }
            )
                .then((res) => {
                    if (res.ok) return res.json();
                    return res.json().then((json) => Promise.reject(json));
                })
                .then(({ url }) => {
                    window.location = url;
                })
                .catch((e) => {
                    console.error(e.error);
                    toast.error(e.error);
                });

            return;
        }

        // fetch(`${process.env.REACT_APP_SERVER_URL}/create-checkout-session?`, {
        //     method: 'POST',
        //     headers: {
        //         'Content-Type': 'application/json'
        //     },
        //     body: localStorage.getItem('cart')
        // }).then(res => {
        //     if (res.ok) return res.json()
        //     return res.json().then(json => Promise.reject(json))
        // }).then(({ url }) => {
        //     window.location = url
        // }).catch(e => {
        //     console.error(e.error)
        // })

        auth.currentUser
            .getIdToken(true)
            .then((idToken) => {
                const appliedPromoCode = document.getElementById('applied-promo-code').innerText;

                fetch(
                    `${process.env.REACT_APP_SERVER_URL}/create-checkout-session?promoCode=${appliedPromoCode}`,
                    {
                        method: "POST",
                        headers: {
                            Authorization: `Bearer ${idToken}`,
                            "Content-Type": "application/json",
                        },
                        body: localStorage.getItem("cart"),
                    }
                )
                    .then((res) => {
                        if (res.ok) return res.json();
                        return res.json().then((json) => Promise.reject(json));
                    })
                    .then(({ url }) => {
                        console.log(url);
                        window.location = url;
                    })
                    .catch((e) => {
                        console.error(e.error);
                        toast.error(e.error);

                        if (e.type === "someOwned") {
                            // run function to filter cart
                            console.log("run function to filter cart");
                            updateCartAfterRemovalOfDupes(e.newCart);
                            dispatch(toggleCartSidebar());
                            dispatch(calculateTotalPrice());
                            dispatch(toggleCartSidebar());
                        }
                    });
            })
            .catch((e) => {
                console.error(e.error);
            });
    }, [dispatch]);

    const handleProceedToCheckout = useCallback(() => {
        if (!authorized) return;
        const loginDialog = document.getElementById("login_dialog");

        if (localStorage.getItem("cart") === "{}") {
            toast.error("Your cart is empty");
            return;
        }

        // console.log(typeof localStorage.getItem('cart'));

        console.log(Object.keys(JSON.parse(localStorage.getItem("cart"))));
        if (
            !auth.currentUser &&
            Object.keys(JSON.parse(localStorage.getItem("cart"))).includes(
                "MC-01"
            )
        ) {
            toast.error(
                "You must be logged in to purchase the Masterclass. Please login."
            );
            dispatch(toggleCartSidebar());
            dispatch(toggleLoginSidebar());
            return;
        }

        if (!auth.currentUser) {
            loginDialog.showModal();
            return;
        }

        createCheckoutSession();
    }, [createCheckoutSession, dispatch, authorized]);

    const handleProceedWithoutLogin = () => {
        const loginDialog = document.getElementById("login_dialog");

        loginDialog.close();
        createCheckoutSession();
    };

    const handleLogin = () => {
        const loginDialog = document.getElementById("login_dialog");

        loginDialog.close();
        dispatch(toggleCartSidebar());
        dispatch(toggleLoginSidebar());
    };

    const handleClickOutsideDialog = (event) => {
        const loginDialog = document.getElementById("login_dialog");

        if (event.target === loginDialog) {
            loginDialog.close();
        }
    };

    const handleBackOnCart = () => {
        dispatch(toggleCartSidebar());
    };

    useEffect(() => {
        const loginDialog = document.getElementById("login_dialog");

        dispatch(calculateTotalPrice());

        // setup event listeners
        const handleClickOutside = (event) => {
            if (event.target === loginDialog) {
                loginDialog.close();
            }
        };

        document.body.addEventListener("click", handleClickOutside);

        return () => {
            document.body.removeEventListener("click", handleClickOutside);
        };
    }, [dispatch, handleProceedToCheckout]);

    return (
        <div className="cart-sidebar">
            <div
                className={`right-sidebar ${cartSidebarIsOpen ? "open" : ""} `}
            >
                <div className="cart-info">
                    <button onClick={handleBackOnCart}>
                        <BiArrowBack />
                        Back
                    </button>
                    <h2>Cart</h2>
                    {Object.keys(cartItems).length > 0 ? (
                        Object.keys(cartItems).map((itemId) => (
                            <CartItem key={itemId} itemId={itemId} />
                        ))
                    ) : (
                        <p>Your cart is empty</p>
                    )}
                </div>

                <div className="bottom-info">
                    <hr />
                    <div className="total">
                        <span>Total USD</span>
                        <span>${cartTotal}</span>
                    </div>
                    {cartTotal >= 50 && (
                        <p>
                            <b>
                                Click below to see the available financing
                                options for you!
                            </b>
                        </p>
                    )}

                    <Elements stripe={stripePromise}>
                        <PaymentMethodMessagingElement
                            options={{
                                amount: Math.floor(cartTotal) * 100,
                                currency: "USD",
                                paymentMethodTypes: ["affirm"],
                                countryCode: "US",
                            }}
                        />
                    </Elements>
                    <br />
                    <div id="promo-code-info" style={{display: 'none'}}>
                        <p>
                            <span>Promo Code:</span>
                            <b id="applied-promo-code"></b>
                        </p>
                        <p>
                            <span>Discount: </span>
                            <b id="applied-discount"></b>
                        </p>
                        <p>
                            <span>Total:</span>
                            <b id="discounted-total"></b>
                        </p>
                    </div>
                    <form id="promo-code-form" onSubmit={handlePromoCode}>
                        <input
                            type="text"
                            placeholder="Promo Code"
                            name="promo-code"
                            value={promoCode}
                            onChange={(e) => setPromoCode(e.target.value)}
                        />
                        <button type="submit">Apply</button>
                    </form>
                    <button
                        className="darkgray-background"
                        onClick={handleProceedToCheckout}
                    >
                        Proceed to Checkout
                    </button>
                    {cartTotal > 0 && <Checkout promoCode={appliedPromoCode} />}
                    <div id="paypal-button-container"></div>
                </div>
            </div>
            <div
                className={`overlay ${cartSidebarIsOpen ? "show-overlay" : ""}`}
                onClick={() => dispatch(toggleCartSidebar())}
            ></div>

            <dialog id="login_dialog" onClick={handleClickOutsideDialog}>
                <div className="dialog__content">
                    <h2>Would you like to log in?</h2>
                    <p>
                        <b>Logging in</b> will allow you to maintain access to
                        your purchases through your dashboard. <br></br>
                        <br></br>
                        <b>Not logging in </b> will allow you to make a one-time
                        purchase.
                    </p>
                    <div className="selection-buttons">
                        <button
                            id="proceed_without_btn"
                            onClick={handleProceedWithoutLogin}
                        >
                            Proceed without logging in
                        </button>
                        <button id="login_btn" onClick={handleLogin}>
                            Log in
                        </button>
                    </div>
                </div>
            </dialog>
        </div>
    );
};

export default CartSidebar;
