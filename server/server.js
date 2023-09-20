require('dotenv').config();
const { initializeApp } = require('firebase/app');
const { getDocs, setDoc, collection, getFirestore, doc, getDoc, query, where, updateDoc } = require('firebase/firestore');
const { v4: uuidv4 } = require('uuid');


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

// store products on the server side
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

// TEST ITEMS
const storeItems = new Map([
    [1, { priceInCents: 10000, name: "Learn React Today" }],
    [2, { priceInCents: 20000, name: "Learn CSS Today" }],
  ]);

// EXPRESS ROUTES --------------------------------------------------
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
            complete: false
        });

        res.json({ url: session.url });
    } catch (e) {
        res.status(500).json({ error: e.message });
    }
});

app.post("/success", async (req, res) => {
    res.setHeader(
        "Access-Control-Allow-Origin",
        `${process.env.CLIENT_URL}`
    );
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

            // Update the database to reflect the purchase
            const usersCollectionRef = collection(db, 'users');

            const q = query(usersCollectionRef, where("email", "==", req.body.email));

            const querySnapshot = await getDocs(q);

            querySnapshot.forEach(async (document) => {
                const docId = document.id;

                const userDocRef = doc(db, "users", docId);
                
                const userDoc = await getDoc(userDocRef);

                try {
                    await updateDoc(userDocRef, {
                        purchasedItems: {
                            ...userDoc.data().purchasedItems,
                            ...items
                        }
                    });
                } catch(error) {
                    console.log(error);
                    res.status(500).send(error.message)
                }
            });

            // Update the database to reflect that the purchase has been completed
            try {
                await setDoc(checkoutSessionDocRef, {
                    complete: true,
                    userEmail: req.body.email
                }, { merge: true });
            } catch (error) {
                console.log(error);
                res.status(500).send(error.message)
            }

            res.send(
                "Purchase successful! Items added to your dashboard." +
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

// -------------------------------------------------- EXPRESS ROUTES


const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});