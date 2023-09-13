require('dotenv').config();
const { initializeApp } = require('firebase/app');
const { getDocs, collection, getFirestore } = require('firebase/firestore');


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
    measurementId: firebaseMeasurementId
}

const firebaseApp = initializeApp(firebaseConfig);
const db = getFirestore(firebaseApp);

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

const computeTotalPrice = (cart) => {

};

// ================================================== functions

let productsObject = {};

getProducts().then((products) => {
    productsObject = products;
    console.log(productsObject);
});


// -------------------------------------------------- firebase

const express = require('express');
const app = express();
const path = require('path');
const cors = require("cors");

app.use(express.json());
app.use(express.static('public'));
app.use(
    cors({
      origin: `${process.env.CLIENT_URL}`,
    })
  );

console.log(process.env.CLIENT_URL);

const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY);


// if (process.env.NODE_ENV === "production") {
//     app.use(express.static(path.join(__dirname, "client/build")));

//     // Handle any requests that don't match API routes by serving the React app
//     app.get("*", (req, res) => {
//         res.sendFile(path.join(__dirname, "client/build", "index.html"));
//     });
// }

const storeItems = new Map([
    [1, { priceInCents: 10000, name: "Learn React Today" }],
    [2, { priceInCents: 20000, name: "Learn CSS Today" }],
  ]);

app.post("/create-checkout-session", async (req, res) => {
    res.setHeader(
        "Access-Control-Allow-Origin",
        `${process.env.CLIENT_URL}`
    );
    res.setHeader("Access-Control-Allow-Methods", "GET, POST, OPTIONS");
    res.setHeader("Access-Control-Allow-Headers", "Content-Type");
    res.setHeader("Access-Control-Allow-Credentials", true);

    console.log(req.body);

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
        }
        );

        const session = await stripe.checkout.sessions.create({
            payment_method_types: ["card"],
            mode: "payment",
            line_items: line_items,
            success_url: `${process.env.CLIENT_URL}`,
            cancel_url: `${process.env.CLIENT_URL}`,
        });
        res.json({ url: session.url });
    } catch (e) {
        res.status(500).json({ error: e.message });
    }
});

const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});