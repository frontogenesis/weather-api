const express = require('express')
const router = express.Router()

const stripe = require('stripe')(process.env.STRIPE_PRIVATE_KEY)

const storeItems = new Map([
    [ 1, { priceInCents: 56883, name: 'Automated Twitter Weather Hazards' } ]
])

router.get('/', (req, res, next) => {
    res.json({ message: 'Hi Stripe' })
})

router.post('/stripe-checkout', async (req, res, next) => {
    try {
        const session = await stripe.checkout.sessions.create({
            payment_method_types: ['card'],
            mode: 'payment',
            line_items: req.body.items.map(item => {
                const storeItem = storeItems.get(item.id)
                return {
                    price_data: {
                        currency: 'usd',
                        product_data: {
                            name: storeItem.name
                        },
                        unit_amount: storeItem.priceInCents
                    },
                    quantity: item.quantity
                }
            }),
            success_url: `${process.env.STRIPE_SUCCESS_URL}`,
            cancel_url: `${process.env.STRIPE_CANCEL_URL}`
        })
        res.status(200).json({ url: session.url })
    } catch (error) {
        res.send(500).json({ error: error.message })
    }
})

module.exports = router