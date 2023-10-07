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

// sendgrid --------------------------------------------------
const sgMail = require('@sendgrid/mail')
sgMail.setApiKey(process.env.SENDGRID_API_KEY)
// -------------------------------------------------- sendgrid

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
const admin = require('firebase-admin');
const serviceAccount = require('../secret/serviceAccountKey.json'); // Your service account key

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
});

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

const computeTotalPrice = (cart) => {};

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

  
app.use(
    cors({
        origin: `${process.env.CLIENT_URL}`,
    })
);

console.log(process.env.CLIENT_URL);

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

app.post("/webhook", express.raw({ type: "application/json" }), async (req, res) => {
    console.log("Made it to webhook");
    const sig = req.headers["stripe-signature"];

    let event;

    try {
        event = stripe.webhooks.constructEvent(req.body, sig, endpointSecret);
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

        const success_url = event.data.object.success_url;
        const session_id = success_url.split("=")[1];

        
        const session = event.data.object;
        
        const { line_items } = await stripe.checkout.sessions.retrieve(
            session.id,
            {
                expand: ["line_items"],
            }
        );

        const totalPrice = line_items.data.reduce((acc, item) => {
            return acc + item.amount_total / 100;
        }, 0);

        const formattedItems = line_items.data.map((item) => ({
            name: item.description,
            price: item.amount_total / 100,
            quantity: 1,
          }));

        const dynamic_data = {
            subject: "Your dynamic subject",
            name: event.data.object.customer_details.name,
            confirmationNum: session_id,
            items: formattedItems,
            total: `${totalPrice} USD`
        };


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
});


app.use(express.json());


app.post("/success", async (req, res) => {
    res.setHeader("Access-Control-Allow-Origin", `${process.env.CLIENT_URL}`);
    res.setHeader("Access-Control-Allow-Methods", "GET, POST, OPTIONS");
    res.setHeader("Access-Control-Allow-Headers", "Content-Type");
    res.setHeader("Access-Control-Allow-Credentials", true);

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
});

app.use("/create-checkout-session", async (req, res, next) => {

    const authorizationHeader = req.headers.authorization;

    // console.log(authorizationHeader);

    if (!authorizationHeader) {
        return next();
    }

    let uid = null;
    const token = authorizationHeader.substring(7);
    const decodedToken = await admin.auth().verifyIdToken(token);
    uid = decodedToken.uid;

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

app.post("/create-checkout-session", async (req, res) => {
    res.setHeader("Access-Control-Allow-Origin", `${process.env.CLIENT_URL}`);
    res.setHeader("Access-Control-Allow-Methods", "GET, POST, OPTIONS");
    res.setHeader("Access-Control-Allow-Headers", "Content-Type");
    res.setHeader("Access-Control-Allow-Credentials", true);

    let totalPrice = 0;

    for (const item in req.body) {
        totalPrice += productsObject[item].price * 100 * req.body[item];
    }

    console.log(totalPrice);

    try {
        const cartItems = Object.keys(req.body);

        const line_items = cartItems.map((item) => {
            return {
                price_data: {
                    currency: "usd",
                    product_data: {
                        name: productsObject[item].name,
                    },
                    unit_amount: productsObject[item].price * 100,
                },
                quantity: 1,
            };
        });

        const SESSION_ID = uuidv4();

        const session = await stripe.checkout.sessions.create({
            payment_method_types: ["card"],
            mode: "payment",
            line_items: line_items,
            success_url: `${process.env.CLIENT_URL}/#/success?session_id=${SESSION_ID}`,
            cancel_url: `${process.env.CLIENT_URL}`,
        });

        // store items in the database so that when user successfully pays, we can update the database

        await setDoc(doc(db, "checkoutSessions", SESSION_ID), {
            items: req.body,
            complete: false,
        });

        res.json({ url: session.url });
    } catch (e) {
        res.status(500).json({ error: e.message });
    }
});

app.post("/send-email-test", async (req, res) => {
    const msg = {
        to: 'vinceermitano@yahoo.com', // Change to your recipient
        from: {
            email: 'vinceistestinghiscode@gmail.com',
            name: 'The Odyssey'
        }, // Change to your verified sender
        "dynamic_template_data": {
            "subject": "Your dynamic subject"
          },
        templateId: 'd-458280e880e14f3985e5fbc65a603d70',
      }
      sgMail
        .send(msg)
        .then(() => {
          console.log('Email sent')
          res.send('Email sent');
        })
        .catch((error) => {
          console.error(error)
          res.status(500).send(error.message);
        })
});

// -------------------------------------------------- EXPRESS ROUTES

const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
