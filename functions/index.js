const express = require("express");
const stripe = require("stripe")(
  "sk_test_51N4FypHwrIsuNEdoBPqr6y138ggxS5uv3JBTmOuWErLCXFrb7wkty0ApTu5e2RIenGRjKLUw9mT9BKHGijfynMnz00iHNx9P3e"
);
const cors = require("cors");
const bodyparser = require("body-parser");

const app = express();
app.use(express.json());
app.use(express.static("public"));
app.use(bodyparser.urlencoded({ extended: false }));
app.use(bodyparser.json());
app.use(cors({ origin: true, credentials: true }));

const PORT = process.env.PORT || 5174;

app.listen(PORT, () => console.log(`Listening on port ${PORT}`));

app.post("/v2/checkout", async (req, res, next) => {
  console.log("items", JSON.stringify(req.body.items));
  const { items, success_url, cancel_url } = req.body;

  try {
    const session = await stripe.checkout.sessions.create({
      payment_method_types: ["card"],
      line_items: items.map((item) => ({
        price_data: {
          currency: "myr",
          product_data: {
            name: item.name,
            images: [item.product],
          },
          unit_amount: item.price * 100,
        },
        quantity: item.quantity,
      })),
      mode: "payment",
      success_url: success_url,
      cancel_url: cancel_url,
    });

    res.status(200).json(session);
  } catch (error) {
    next(error);
  }
});
