require('dotenv').config();

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
    try {
        const session = await stripe.checkout.sessions.create({
            payment_method_types: ["card"],
            mode: "payment",
            line_items: req.body.items.map((item) => {
                const storeItem = storeItems.get(item.id);
                return {
                    price_data: {
                        currency: "usd",
                        product_data: {
                            name: storeItem.name,
                        },
                        unit_amount: storeItem.priceInCents,
                    },
                    quantity: item.quantity,
                };
            }),
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