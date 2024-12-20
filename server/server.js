require("dotenv").config();
const { initializeApp } = require("firebase/app");
const {
    getDocs,
    setDoc,
    collection,
    getFirestore,
    doc,
    getDoc,
    query,
    where,
    updateDoc,
} = require("firebase/firestore");
const { v4: uuidv4 } = require("uuid");
const fetch = require('node-fetch'); // Import the 'node-fetch' library
const validator = require('validator');

// sendgrid --------------------------------------------------
const sgMail = require("@sendgrid/mail");
sgMail.setApiKey(process.env.SENDGRID_API_KEY);
// -------------------------------------------------- sendgrid

// crypto js
// const CryptoJS = require("crypto-js");

// const AES = CryptoJS.AES;
// -------------------------------------------------- crypto js

// firebase --------------------------------------------------
const firebaseAPIKey = process.env.FIREBASE_API_KEY;
const firebaseAuthDomain = process.env.FIREBASE_AUTH_DOMAIN;
const firebaseProjectId = process.env.FIREBASE_PROJECT_ID;
const firebaseStorageBucket = process.env.FIREBASE_STORAGE_BUCKET;
const firebaseMessagingSenderId = process.env.FIREBASE_MESSAGING_SENDER_ID;
const firebaseAppId = process.env.FIREBASE_APP_ID;
const firebaseMeasurementId = process.env.FIREBASE_MEASUREMENT_ID;

const firebaseConfig = {
    apiKey: firebaseAPIKey,
    authDomain: firebaseAuthDomain,
    projectId: firebaseProjectId,
    storageBucket: firebaseStorageBucket,
    messagingSenderId: firebaseMessagingSenderId,
    appId: firebaseAppId,
    measurementId: firebaseMeasurementId,
};

const firebaseApp = initializeApp(firebaseConfig);
const db = getFirestore(firebaseApp);

// Initialize Firebase Admin SDK (for server-side and administrative tasks)
const admin = require("firebase-admin");
// const serviceAccount = require('../secret/serviceAccountKey.json'); // Your service account key
const serviceAccount = JSON.parse(process.env.SERVICE_ACCOUNT_KEY);

admin.initializeApp({
    credential: admin.credential.cert(serviceAccount),
});

const FIRST_48 = new Date("2023-12-10T03:00:00Z");

// functions ==================================================
// Get products from Firestore
const getProducts = async () => {
    const productsObject = {};

    try {
        const querySnapshot = await getDocs(collection(db, "products"));

        querySnapshot.forEach((doc) => {
            productsObject[doc.id] = doc.data();
        });
    } catch (error) {
        console.log(error);
    }

    return productsObject;
};

const applyDiscount = (discount, totalPrice) => {
    return totalPrice - totalPrice * discount / 100;
}

const sendConfirmationEmail = (email, dynamic_data) => {
    return new Promise((resolve, reject) => {
        const msg = {
            to: email,
            from: {
                email: process.env.SENDGRID_SENDER_EMAIL,
                name: "The Odyssey",
            },
            dynamic_template_data: dynamic_data,
            templateId: "d-458280e880e14f3985e5fbc65a603d70",
        };

        sgMail
            .send(msg)
            .then(() => {
                console.log("Email sent");
                resolve("Email sent");
            })
            .catch((error) => {
                console.error(error);
                reject(error);
            });
    });
};

// const addItemsToUserInventory = async (session_id, uid) => {
//     try {
//         const checkoutSessionDocRef = doc(db, "checkoutSessions", session_id);

//         const checkoutSessionDocSnap = await getDoc(checkoutSessionDocRef);

//         if (checkoutSessionDocSnap.exists()) {
//             const items = checkoutSessionDocSnap.data().items;
//             const hasBeenCompleted = checkoutSessionDocSnap.data().complete;

//             if (hasBeenCompleted) {
//                 throw new Error("Purchase has already been completed.");
//             }

//             if (uid) {
//                 // for each key in items, set value to purchase date
//                 const currentDate = new Date();
//                 const dateFormatted = currentDate.toLocaleString("en-US", {
//                     year: "numeric",
//                     month: "short",
//                     day: "numeric",
//                 });

//                 for (const item in items) {
//                     items[item] = dateFormatted;
//                 }

//                 // Update the database to reflect the purchase
//                 const userRef = doc(db, "users", uid);

//                 const userDoc = await getDoc(userRef);

//                 try {
//                     await updateDoc(userRef, {
//                         purchasedItems: {
//                             ...userDoc.data().purchasedItems,
//                             ...items,
//                         },
//                     });
//                 } catch (error) {
//                     console.log(error);
//                     res.status(500).send(error.message);
//                 }
//             }

//             // Update the database to reflect that the purchase has been completed
//             try {
//                 await setDoc(
//                     checkoutSessionDocRef,
//                     {
//                         complete: true,
//                         userEmail: req.body.email ? req.body.email : null,
//                     },
//                     { merge: true }
//                 );
//             } catch (error) {
//                 console.log(error);
//                 res.status(500).send(error.message);
//             }

//             res.send(
//                 "Purchase successful! Items purchased." +
//                     JSON.stringify(items)
//             );
//         } else {
//             throw new Error("Successful purchase was not found.");
//         }
//     } catch (error) {
//         console.error(error);
//         res.status(500).send(error.message);
//     }
// }

const computeTotalPrice = (cart) => {};

const setUserPurchasedItems = async (email, items) => {};

// ================================================== functions

// store products on the server side
let productsObject = {};

getProducts().then((products) => {
    productsObject = products;
    // console.log(productsObject);
});

// -------------------------------------------------- firebase

const express = require("express");
const app = express();
const path = require("path");
const cors = require("cors");

app.use(express.static("public"));

// app.use(express.static(path.join(__dirname, 'public')));

const allowedOrigins = [`${process.env.CLIENT_URL}`, `${process.env.LIVE_URL}`];

app.use(
    cors({
        origin: allowedOrigins,
    })
);

const stripe = require("stripe")(process.env.STRIPE_SECRET_KEY);
const endpointSecret = process.env.STRIPE_ENDPOINT_SECRET;
console.log(endpointSecret);

// TEST ITEMS
const storeItems = new Map([
    [1, { priceInCents: 10000, name: "Learn React Today" }],
    [2, { priceInCents: 20000, name: "Learn CSS Today" }],
]);

// EXPRESS ROUTES --------------------------------------------------
// // Catch-all route: Serve the index.html file for all routes
// app.get('/*', (req, res) => {
//     res.sendFile(path.join(__dirname, 'public', 'index.html'));
//   });

app.post(
    "/webhook",
    express.raw({ type: "application/json" }),
    async (req, res) => {
        console.log("Made it to webhook");
        const sig = req.headers["stripe-signature"];

        let event;

        try {
            event = stripe.webhooks.constructEvent(
                req.body,
                sig,
                endpointSecret
            );
            console.log("try");
        } catch (err) {
            console.error("Error constructing webhook event:", err);
            res.status(400).send(`Webhook Error: ${err.message}`);
            console.log("catch");
            return;
        }

        // Handle the specific event you're interested in (checkout.session.completed)
        if (event.type === "checkout.session.completed") {
            const email = event.data.object.customer_details.email;

            console.log("Payment was successful. Email:", email);

            // const success_url = event.data.object.success_url;
            // const session_id = success_url.split("=")[1];

            const session = event.data.object;

            const { line_items } = await stripe.checkout.sessions.retrieve(
                session.id,
                {
                    expand: ["line_items"],
                }
            );

            // const session = await stripe.checkout.sessions.retrieve(session.id);
            const metadata = event.data.object.metadata;
            const session_id = metadata.session_id;
            const uid = event.data.object.metadata.uid;

            const totalPrice = line_items.data.reduce((acc, item) => {
                return acc + item.amount_total / 100;
            }, 0);

            const formattedItems = line_items.data.map((item) => ({
                name: item.description,
                price: item.amount_total / 100,
                quantity: 1,
            }));

            const linkToDownloads = `${process.env.LIVE_URL}/#/digital-downloads?token=${metadata.downloadToken}`;
            // const linkToDownloads = `${process.env.CLIENT_URL}/#/digital-downloads?token=${metadata.downloadToken}`;

            const dynamic_data = {
                subject: "Your dynamic subject",
                name: event.data.object.customer_details.name,
                confirmationNum: session_id,
                items: formattedItems,
                total: `${totalPrice} USD`,
                hasDownloads: metadata.hasDownloads,
                linkToDownloads: linkToDownloads,
            };

            // add items to user inventory
            try {
                const checkoutSessionDocRef = doc(
                    db,
                    "checkoutSessions",
                    session_id
                );

                const checkoutSessionDocSnap = await getDoc(
                    checkoutSessionDocRef
                );

                if (checkoutSessionDocSnap.exists()) {
                    const items = checkoutSessionDocSnap.data().items;
                    const hasBeenCompleted =
                        checkoutSessionDocSnap.data().complete;

                    if (hasBeenCompleted) {
                        throw new Error("Purchase has already been completed.");
                    }

                    if (uid) {
                        // for each key in items, set value to purchase date
                        const currentDate = new Date();
                        const dateFormatted = currentDate.toLocaleString(
                            "en-US",
                            {
                                year: "numeric",
                                month: "short",
                                day: "numeric",
                            }
                        );

                        for (const item in items) {
                            items[item] = dateFormatted;
                        }

                        // Update the database to reflect the purchase
                        const userRef = doc(db, "users", uid);

                        const userDoc = await getDoc(userRef);

                        try {
                            await updateDoc(userRef, {
                                purchasedItems: {
                                    ...userDoc.data().purchasedItems,
                                    ...items,
                                },
                            });
                        } catch (error) {
                            console.log(error);
                            res.status(500).send(error.message);
                        }
                    }

                    // Update the database to reflect that the purchase has been completed
                    try {
                        await setDoc(
                            checkoutSessionDocRef,
                            {
                                complete: true,
                                userEmail: req.body.email
                                    ? req.body.email
                                    : null,
                            },
                            { merge: true }
                        );
                    } catch (error) {
                        console.log(error);
                        res.status(500).send(error.message);
                    }

                    res.send(
                        "Purchase successful! Items purchased." +
                            JSON.stringify(items)
                    );
                } else {
                    throw new Error("Successful purchase was not found.");
                }
            } catch (error) {
                console.error(error);
                res.status(500).send(error.message);
            }

            sendConfirmationEmail(email, dynamic_data)
                .then((message) => {
                    console.log(message);
                    return res.status(200).end();
                })
                .catch((error) => {
                    console.log(error);
                    return res.status(500).end();
                });
        } else {
            res.status(200).end();
        }

        // TODO: Remove checkout session from database if payment fails
    }
);

// app.post('/paypal-webhook', async (req, res) => {
//     try {
//     //   const webhookId = '9FD53654G3823781F'; // Retrieve from the PayPal Developer Dashboard
//     //   const headers = req.headers;
//     //   const body = JSON.stringify(req.body);
//     //   const signature = headers['paypal-auth-algo'] + ' ' + headers['paypal-cert-url'] + ' ' + headers['paypal-transmission-id'] + ' ' + headers['paypal-transmission-sig'] + ' ' + headers['paypal-transmission-time'] + ' ' + body;

//     //   // Verify webhook signature
//     //   const verified = crypto.createVerify('sha256').update(signature).verify(publicKey, headers['paypal-transmission-sig'], 'base64');
//     //   if (!verified) {
//     //     return res.status(400).send('Webhook signature verification failed');
//     //   }

//     //   Process the webhook event
//       const event = req.body;
//       if (event.event_type === 'PAYMENT.CAPTURE.COMPLETED') {
//         // Handle completed payment event
//         const captureId = event.resource.id;
//         await capturePayment(captureId);
//       }

//       console.log('Webhook received successfully');
//       res.status(200).send('Webhook received successfully');
//     } catch (error) {
//       console.error('Error processing webhook:', error);
//       res.status(500).send('Internal Server Error');
//     }

//     console.log(req.body);
//     res.status(200).send('Webhook received successfully');
//   });

app.use(express.json());

const paypal = require("@paypal/checkout-server-sdk");
const Environment =
    process.env.NODE_ENV === "production"
        ? paypal.core.LiveEnvironment
        : paypal.core.SandboxEnvironment;
const paypalClient = new paypal.core.PayPalHttpClient(
    new Environment(
        process.env.REACT_APP_PAYPAL_CLIENT_ID,
        process.env.PAYPAL_CLIENT_SECRET
    )
);

// app.use("/create-paypal-order", async (req, res, next) => {
// });

app.post("/create-paypal-order", async (req, res) => {

    req.body.items = JSON.parse(req.body.items);
    const promoCode = req.query.promoCode.toUpperCase();

    console.log(promoCode);

    let discount = 0;

    if (promoCode === process.env.PROMO_CODE_10) {
        discount = 10;
    } else if (promoCode === process.env.PROMO_CODE_25) {
        discount = 25;
    } else if (promoCode === process.env.PROMO_CODE_30) {
        discount = 30;
    } else if (promoCode === process.env.PROMO_CODE_33) {
        discount = 33;
    }

    try {
        const request = new paypal.orders.OrdersCreateRequest();
        let totalPrice = 0;

        for (const item in req.body.items) {
            totalPrice += Number(applyDiscount(discount, productsObject[item].price).toFixed(2));
        }

        console.log(totalPrice);

        const cartItems = Object.keys(req.body.items);

        request.prefer("return=representation");
        request.requestBody({
            intent: "CAPTURE",
            purchase_units: [
                {
                    amount: {
                        currency_code: "USD",
                        value: totalPrice,
                        breakdown: {
                            item_total: {
                                currency_code: "USD",
                                value: totalPrice,
                            },
                        },
                    },
                    items: cartItems.map((item) => {
                        return {
                            name: productsObject[item].name,
                            unit_amount: {
                                currency_code: "USD",
                                value: applyDiscount(discount, productsObject[item].price).toFixed(2),
                            },
                            quantity: 1,
                        };
                    }),
                },
            ],
        });

        const order = await paypalClient.execute(request);
        console.log(order.result.id);

        await setDoc(doc(db, "paypalCheckoutSessions", order.result.id), {
            expiresAt: Date.now() + 86400000,
            items: cartItems,
            complete: false,
            timeStamp: Date.now(),
            uid: req.body.uid,
            first48: Date.now() < FIRST_48,
        });

        // const formattedItems = cartItems.map((item) => ({
        //     name: productsObject[item].name,
        //     price: productsObject[item].price / 100,
        //     quantity: 1,
        // }));

        // const linkToDownloads = `${process.env.LIVE_URL}/#/digital-downloads?token=${metadata.downloadToken}`;

        // const dynamic_data = {
        //     subject: "The Odyssey Order Confirmation",
        //     name: event.data.object.customer_details.name,
        //     confirmationNum: session_id,
        //     items: formattedItems,
        //     total: `${totalPrice} USD`,
        //     hasDownloads: metadata.hasDownloads,
        //     linkToDownloads: linkToDownloads,
        // };


        res.send({ orderID: order.result.id });
    } catch (e) {
        console.log(e);
        res.status(500).send({ error: e.message });
    }
});

app.post("/capture-paypal-transaction", async (req, res) => {
    const orderID = req.body.orderID;

    
    try {
        const orderDetails = await getDoc(doc(db, "paypalCheckoutSessions", orderID));
        
        if (!orderDetails.exists()) {
            throw new Error("Order does not exist");
        }

        if (orderDetails.exists()) {
            const items = orderDetails.data().items;

            let itemsObject = {};

            items.forEach((item) => {
                itemsObject[item] = 1;
            });

            const hasBeenCompleted =
                orderDetails.data().complete;

            if (hasBeenCompleted) {
                throw new Error("Purchase has already been completed.");
            }

            if (orderDetails.data().uid) {
                // for each key in items, set value to purchase date
                const currentDate = new Date();
                const dateFormatted = currentDate.toLocaleString(
                    "en-US",
                    {
                        year: "numeric",
                        month: "short",
                        day: "numeric",
                    }
                );

                for (const item in itemsObject) {
                    itemsObject[item] = dateFormatted;
                }

                // Update the database to reflect the purchase
                const userRef = doc(db, "users", orderDetails.data().uid);

                const userDoc = await getDoc(userRef);

                try {
                    await updateDoc(userRef, {
                        purchasedItems: {
                            ...userDoc.data().purchasedItems,
                            ...itemsObject,
                        },
                    });
                } catch (error) {
                    console.log(error);
                    res.status(500).send(error.message);
                }
            }

            // Update the database to reflect that the purchase has been completed
            const orderDetailsRef = doc(db, "paypalCheckoutSessions", orderID);
            try {
                await setDoc(
                    orderDetailsRef,
                    {
                        complete: true,
                        userEmail: req.body.payerEmail
                            ? req.body.payerEmail
                            : null,
                    },
                    { merge: true }
                );

            } catch (error) {
                console.log(error);
                res.status(500).send(error.message);
            }
            
            const downloadToken = uuidv4();
            const hasDownloads = items.some((item) => {
                return item !== "MC-01";
            });
            
            await setDoc(doc(db, "downloadTokens", downloadToken), {
                expiresAt: Date.now() + 86400000,
                items: items,
            });

            res.send({
                downloadToken: downloadToken,
                hasDownloads: hasDownloads,
                orderID: orderID,
            });
        } else {
            throw new Error("Successful purchase was not found.");
        }
    } catch (error) {
        console.error(error);
        res.status(500).send(error.message);
    }
});

app.post("/success", async (req, res) => {
    // res.setHeader("Access-Control-Allow-Origin", `${process.env.CLIENT_URL}`);
    // res.setHeader("Access-Control-Allow-Methods", "GET, POST, OPTIONS");
    // res.setHeader("Access-Control-Allow-Headers", "Content-Type");
    // res.setHeader("Access-Control-Allow-Credentials", true);

    const session_id = req.query.session_id; // Retrieve the session ID from the query parameters

    try {
        const checkoutSessionDocRef = doc(db, "checkoutSessions", session_id);

        const checkoutSessionDocSnap = await getDoc(checkoutSessionDocRef);

        if (checkoutSessionDocSnap.exists()) {
            const items = checkoutSessionDocSnap.data().items;
            const hasBeenCompleted = checkoutSessionDocSnap.data().complete;

            if (hasBeenCompleted) {
                throw new Error("Purchase has already been completed.");
            }

            console.log(req.body.email);
            if (req.body.email) {
                // for each key in items, set value to purchase date
                const currentDate = new Date();
                const dateFormatted = currentDate.toLocaleString("en-US", {
                    year: "numeric",
                    month: "short",
                    day: "numeric",
                });

                for (const item in items) {
                    items[item] = dateFormatted;
                }

                // Update the database to reflect the purchase
                const usersCollectionRef = collection(db, "users");

                const q = query(
                    usersCollectionRef,
                    where("email", "==", req.body.email)
                );

                const querySnapshot = await getDocs(q);

                querySnapshot.forEach(async (document) => {
                    const docId = document.id;

                    const userDocRef = doc(db, "users", docId);

                    const userDoc = await getDoc(userDocRef);

                    try {
                        await updateDoc(userDocRef, {
                            purchasedItems: {
                                ...userDoc.data().purchasedItems,
                                ...items,
                            },
                        });
                    } catch (error) {
                        console.log(error);
                        res.status(500).send(error.message);
                    }
                });
            }

            // Update the database to reflect that the purchase has been completed
            try {
                await setDoc(
                    checkoutSessionDocRef,
                    {
                        complete: true,
                        userEmail: req.body.email ? req.body.email : null,
                    },
                    { merge: true }
                );
            } catch (error) {
                console.log(error);
                res.status(500).send(error.message);
            }

            res.send(
                "Purchase successful! Items purchased." + JSON.stringify(items)
            );
        } else {
            throw new Error("Successful purchase was not found.");
        }
    } catch (error) {
        console.error(error);
        res.status(500).send(error.message);
    }
});

app.use("/create-checkout-session", async (req, res, next) => {
    const authorizationHeader = req.headers.authorization;

    // console.log(authorizationHeader);

    if (!authorizationHeader) {
        req.uid = null;
        return next();
    }

    let uid = null;
    const token = authorizationHeader.substring(7);
    const decodedToken = await admin.auth().verifyIdToken(token);
    uid = decodedToken.uid;

    req.uid = uid;

    // remove duplicates
    const cart = req.body;
    const cartItems = Object.keys(cart);

    console.log(`Cart items before removing: ${cartItems}`);

    console.log(uid);

    let removedAnItem = false;

    try {
        const docSnap = await getDoc(doc(db, "users", uid));
        const purchasedItems = docSnap.data().purchasedItems;
        const purchasedItemsKeys = Object.keys(purchasedItems);

        const newCart = {};

        cartItems.forEach((item) => {
            if (!purchasedItemsKeys.includes(item)) {
                newCart[item] = cart[item];
            } else {
                removedAnItem = true;
            }
        });

        req.body = newCart;
    } catch (error) {
        console.log(error);
    }

    console.log(req.body);
    if (Object.keys(req.body).length === 0) {
        res.status(500).json({
            error: "You already own all of these items.",
            type: "allOwned",
        });
        return;
    }

    if (removedAnItem) {
        res.status(500).json({
            error: "You already own some of these items, so we removed them from your cart for you. Verify your cart and try again.",
            type: "someOwned",
            newCart: req.body,
        });
        return;
    }

    next();
});

// V2
app.post("/create-checkout-session", async (req, res) => {
    // res.setHeader("Access-Control-Allow-Origin", `${process.env.CLIENT_URL}`);
    // res.setHeader("Access-Control-Allow-Methods", "GET, POST, OPTIONS");
    // res.setHeader("Access-Control-Allow-Headers", "Content-Type");
    // res.setHeader("Access-Control-Allow-Credentials", true);

    let totalPrice = 0;

    for (const item in req.body) {
        totalPrice += productsObject[item].price * 100 * req.body[item];
    }

    console.log(totalPrice);

    const promoCode = req.query.promoCode.toUpperCase();
    console.log(promoCode);
    let discount = 0;

    if (promoCode === process.env.PROMO_CODE_10) {
        discount = 10;
    } else if (promoCode === process.env.PROMO_CODE_25) {
        discount = 25;
    } else if (promoCode === process.env.PROMO_CODE_30) {
        discount = 30;
    } else if (promoCode === process.env.PROMO_CODE_33) {
        discount = 33;
    }


    console.log(applyDiscount(discount, totalPrice));

    try {
        const cartItems = Object.keys(req.body);

        const line_items = cartItems.map((item) => {
            return {
                price_data: {
                    currency: "usd",
                    product_data: {
                        name: productsObject[item].name,
                    },
                    unit_amount: Math.floor(applyDiscount(discount, productsObject[item].price * 100)),
                },
                quantity: 1,
            };
        });

        const SESSION_ID = uuidv4();
        const downloadToken = uuidv4();
        const hasDownloads = cartItems.some((item) => {
            return item !== "MC-01";
        });

        const session = await stripe.checkout.sessions.create({
            mode: "payment",
            line_items: line_items,
            // success_url: `${process.env.CLIENT_URL}/#/receipt?download_token=${downloadToken}&session_id=${SESSION_ID}&has_downloads=${hasDownloads}`,
            success_url: `${process.env.LIVE_URL}/#/receipt?download_token=${downloadToken}&session_id=${SESSION_ID}&has_downloads=${hasDownloads}`,
            cancel_url: `${process.env.LIVE_URL}`,
            // cancel_url: `${process.env.CLIENT_URL}/`,
            metadata: {
                session_id: SESSION_ID,
                uid: req.uid,
                hasDownloads: hasDownloads,
                downloadToken: downloadToken,
            },
            // payment_intent_data: {
            //     metadata: {
            //         uid: req.uid,
            //         session_id: SESSION_ID,
            //     }
            // },
        });

        console.log("Session url: ", session.url);

        await setDoc(doc(db, "downloadTokens", downloadToken), {
            expiresAt: Date.now() + 86400000,
            items: cartItems,
        });

        await setDoc(doc(db, "checkoutSessions", SESSION_ID), {
            items: req.body,
            complete: false,
            uid: req.uid,
            timeStamp: Date.now(),
            first48: Date.now() < FIRST_48,
        });

        res.json({ url: session.url });
    } catch (e) {
        res.status(500).json({ error: e.message });
    }
});

app.post("/contact", async (req, res) => {
    let { email, subject, message, first_name, last_name } = req.body;

    message = `Message via The Odyssey Contact Form\n\nFrom: ${first_name} ${last_name} \n\nEmail: ${email}\n\n${message}`;
    const msg = {
        to: "education@gakuyen.com", // Change to your recipient
        from: {
            email: "education@gakuyen.com",
            name: `${first_name} ${last_name}`,
        }, // Change to your verified sender
        subject: subject,
        text: message,
    };
    sgMail
        .send(msg)
        .then(() => {
            console.log("Email sent");
            res.send("Email sent");
        })
        .catch((error) => {
            console.error(error);
            res.status(500).send("Error sending email.");
        });
});

app.post("/newsletter-signup", async (req, res) => {
    // res.setHeader("Access-Control-Allow-Origin", `${process.env.CLIENT_URL}`);
    // res.setHeader("Access-Control-Allow-Methods", "GET, POST, OPTIONS");
    // res.setHeader("Access-Control-Allow-Headers", "Content-Type");
    // res.setHeader("Access-Control-Allow-Credentials", true);

    const email = req.body.email;

    const docRef = doc(db, "newsletter_list", email);

    const currentDate = new Date();
    const dateFormatted = currentDate.toLocaleString("en-US", {
        year: "numeric",
        month: "short",
        day: "numeric",
    });

    try {
        await setDoc(docRef, {
            dateAdded: dateFormatted,
        });

        res.send("Email added to newsletter list.");
    } catch (error) {
        res.status(500).send(error.message);
    }
});

app.post("/add-email-contact", async (req, res) => {
    const email = req.body.email;

    if (!validator.isEmail(email)) return res.status(500).send({ error: 'Send a valid email address.'});

    // Example URL to the HubSpot API for updating a contact
    const apiUrl = 'https://api.hubapi.com/contacts/v1/contact/';

    // Example data to send in the request body
    const data = {
        properties: [
            {
                "property": "email",
                "value": email
            }
        ]
    };

    // Example headers for a JSON request
    const headers = {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${process.env.HUBSPOT_TOKEN}`
    };

    try {
        const response = await fetch(apiUrl, {
            method: 'POST',
            headers: headers,
            body: JSON.stringify(data)
        });

        const result = await response.json();

        // Handle the response and send a response to the client
        res.status(response.status).json({ message: 'Added to mailing list ★彡'});
    } catch (error) {
        console.error('Error:', error);
        res.status(500).json({ error: 'Failed to add to mailing list :(' });
    }
})

app.get("/the-odyssey", async (req, res) => {
    // res.setHeader("Access-Control-Allow-Origin", `${process.env.CLIENT_URL}`);
    // res.setHeader("Access-Control-Allow-Methods", "GET, POST, OPTIONS");
    // res.setHeader("Access-Control-Allow-Headers", "Content-Type");
    // res.setHeader("Access-Control-Allow-Credentials", true);

    try {
        const docRef = collection(db, "the-odyssey-modules");

        const querySnapshot = await getDocs(docRef);

        const modules = {};

        querySnapshot.forEach((doc) => {
            modules[doc.id] = doc.data();
        });

        res.send(modules);
    } catch (error) {
        res.status(500).send("Error getting modules");
    }
});

app.get("/user-info", async (req, res) => {
    // res.setHeader("Access-Control-Allow-Origin", `${process.env.CLIENT_URL}`);
    // res.setHeader("Access-Control-Allow-Methods", "GET, POST, OPTIONS");
    // res.setHeader("Access-Control-Allow-Headers", "Content-Type");
    // res.setHeader("Access-Control-Allow-Credentials", true);

    const authorizationHeader = req.headers.authorization;

    if (!authorizationHeader) {
        res.status(500).send("No authorization header");
        return;
    }

    const token = authorizationHeader.substring(7);
    const decodedToken = await admin.auth().verifyIdToken(token);
    const uid = decodedToken.uid;

    try {
        const docRef = doc(db, "users", uid);

        const docSnap = await getDoc(docRef);

        if (docSnap.exists()) {
            const info = {
                firstName: docSnap.data().firstName,
                lastName: docSnap.data().lastName,
            };
            res.send(JSON.stringify(info));
        } else {
            res.status(500).send("User does not exist");
        }
    } catch (error) {
        res.status(500).send("Problem fetching user info");
    }
});

app.put("/user-info", async (req, res) => {
    // res.setHeader("Access-Control-Allow-Origin", `${process.env.CLIENT_URL}`);
    // res.setHeader("Access-Control-Allow-Methods", "GET, POST, PUT, OPTIONS");
    // res.setHeader("Access-Control-Allow-Headers", "Content-Type");
    // res.setHeader("Access-Control-Allow-Credentials", true);

    const authorizationHeader = req.headers.authorization;

    if (!authorizationHeader) {
        res.status(500).send("No authorization header");
        return;
    }

    const token = authorizationHeader.substring(7);
    const decodedToken = await admin.auth().verifyIdToken(token);
    const uid = decodedToken.uid;

    try {
        const docRef = doc(db, "users", uid);

        await updateDoc(docRef, {
            firstName: req.body.firstName,
            lastName: req.body.lastName,
        });

        res.send("User info updated successfully!");
    } catch (error) {
        res.status(500).send("Problem updating user info");
    }
});

app.get("/purchased-items", async (req, res) => {
    // res.setHeader("Access-Control-Allow-Origin", `${process.env.CLIENT_URL}`);
    // res.setHeader("Access-Control-Allow-Methods", "GET, POST, OPTIONS");
    // res.setHeader("Access-Control-Allow-Headers", "Content-Type");
    // res.setHeader("Access-Control-Allow-Credentials", true);

    const sessionId = req.query.session_id;

    console.log(sessionId);

    const docRef = doc(db, "checkoutSessions", sessionId);

    const docSnap = await getDoc(docRef);

    if (docSnap.exists()) {
        console.log(docSnap.data().items);
        res.send(docSnap.data().items);
    } else {
        res.status(500).send("Session ID does not exist");
    }
});

app.get("/paypal-purchased-items", async (req, res) => {
    // res.setHeader("Access-Control-Allow-Origin", `${process.env.CLIENT_URL}`);
    // res.setHeader("Access-Control-Allow-Methods", "GET, POST, OPTIONS");
    // res.setHeader("Access-Control-Allow-Headers", "Content-Type");
    // res.setHeader("Access-Control-Allow-Credentials", true);

    const sessionId = req.query.session_id;

    console.log(sessionId);

    const docRef = doc(db, "paypalCheckoutSessions", sessionId);

    const docSnap = await getDoc(docRef);

    if (docSnap.exists()) {
        console.log(docSnap.data().items);
        res.send(docSnap.data().items);
    } else {
        res.status(500).send("Session ID does not exist");
    }
});

app.get("/check-download-token", async (req, res) => {
    // res.setHeader("Access-Control-Allow-Origin", `${process.env.CLIENT_URL}`);
    // res.setHeader("Access-Control-Allow-Methods", "GET, POST, OPTIONS");
    // res.setHeader("Access-Control-Allow-Headers", "Content-Type");
    // res.setHeader("Access-Control-Allow-Credentials", true);

    const downloadToken = req.query.token;

    const docRef = doc(db, "downloadTokens", downloadToken);

    const docSnap = await getDoc(docRef);

    if (docSnap.exists()) {
        // check expiration
        const expiresAt = docSnap.data().expiresAt;

        if (Date.now() > expiresAt) {
            res.status(500).send(
                "Your 24 hour window to download has expired. Redirecting to homepage..."
            );
            return;
        }

        res.status(200).send(docSnap.data().items);
    } else {
        res.status(500).send(
            "Invalid download token. Redirecting to homepage..."
        );
    }
});

app.post("/send-receipt", async (req, res) => {
    const { orderID, payerEmail, payerName, downloadToken, hasDownloads } = req.body;

    const docRef = doc(db, "paypalCheckoutSessions", orderID);

    const docSnap = await getDoc(docRef);

    if (docSnap.exists()) {
        const items = docSnap.data().items;

        const formattedItems = items.map((item) => ({
            name: productsObject[item].name,
            price: productsObject[item].price / 100,
            quantity: 1,
        }));

        const totalPrice = formattedItems.reduce((acc, item) => {
            return acc + item.price;
        });

        const linkToDownloads = `${process.env.LIVE_URL}/#/digital-downloads?token=${downloadToken}`;
        // const linkToDownloads = `${process.env.CLIENT_URL}/#/digital-downloads?token=${downloadToken}`;

        const dynamic_data = {
            subject: "The Odyssey Order Confirmation",
            name: payerName,
            confirmationNum: orderID,
            items: formattedItems,
            total: `${totalPrice} USD`,
            hasDownloads: hasDownloads,
            linkToDownloads: linkToDownloads,
        };

        sendConfirmationEmail(payerEmail, dynamic_data)
            .then((message) => {
                console.log(message);
            })
            .catch((error) => {
                console.log(error);
                throw new Error(error);
            });

        res.status(200).send("Email sent");
    } else {
        res.status(500).send("Invalid order ID");
    }
});

app.get("/send-test-email", async (req, res) => {
    const msg = {
        to: "vinceermitano@yahoo.com",
        from: {
            email: process.env.SENDGRID_SENDER_EMAIL,
            name: "The Odyssey",
        },
        templateId: "d-03c123e2533249069dfc1d0e6430c644",
    };

    sgMail
        .send(msg)
        .then(() => {
            console.log("Email sent");
        })
        .catch((error) => {
            console.error(error);
            res.status(500).send(error.message);
        });

    res.status(200).send("Email sent");
});

app.post("/report-card", async (req, res) => {
    const {socialAccount, questions} = req.body;

    const msg = {
        to: process.env.SENDGRID_SENDER_EMAIL,
        from: {
            email: process.env.SENDGRID_SENDER_EMAIL,
            name: "The Odyssey",
        },
        subject: 'Report Card Submission',
        text: `Social Account: ${socialAccount}\n\nQuestions: ${questions}`
    }

    sgMail
        .send(msg)
        .then(() => {
            console.log("Email sent");
        })
        .catch((error) => {
            console.error(error);
            return res.status(500).send('Error sending email');
        });

    return res.status(200).send("Email sent");
});

app.post("/check-promo-code", (req, res) => {
    const promoCode = req.body.promoCode.toUpperCase();

    if (promoCode === process.env.PROMO_CODE_10) {
        return res.status(200).send({discount: 10});
    }

    if (promoCode === process.env.PROMO_CODE_25) {
        return res.status(200).send({discount: 25});
    }

    if (promoCode === process.env.PROMO_CODE_30) {
        return res.status(200).send({discount: 30});
    }

    if (promoCode === process.env.PROMO_CODE_33) {
        return res.status(200).send({discount: 33});
    }



    return res.status(500).send({error: 'Invalid promo code'});
})

// -------------------------------------------------- EXPRESS ROUTES

const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
