const Stripe = require("stripe");
const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);
const { generateToken } = require("../util/helpers");

const createSession = async (req, res) => {
  try {
    const token = generateToken();
    const session = await stripe.checkout.sessions.create({
      line_items: [
        {
          price_data: {
            product_data: {
              name: "Plan Premium",
              description: "Servicio Premium de atencion al cliente",
            },
            currency: "usd",
            unit_amount: 500,
          },
          quantity: 1,
        },
      ],
      mode: "payment",
      success_url: `http://localhost:5173/#/create-invoice?token=${token}`,
      cancel_url: "http://localhost:5173/#/profile",
    });

    return res.json({ session, token });
  } catch (error) {
    res.status(500).send({ error: error.message });
  }
};

module.exports = { createSession };
