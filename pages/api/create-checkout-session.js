const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY);


export default async (req, res) =>{
    const {item, email, price} = req.body;
    const formattedItem = [
        {
            description: item.description,
            quantity:1,
            price_data: {
                currency: 'usd',
                product_data: {
                    name: item.title,
                    images: item.img,
                },
                unit_amount: price*100,
            }
        }
    ];
    const session= await stripe.checkout.sessions.create({
        payment_method_types:['card'],
        line_items:formattedItem,
        mode:'payment',
        success_url: `${process.env.HOST}/success`,
        cancel_url: `${process.env.HOST}`,
        metadata:{
            email,
            images: JSON.stringify(item.img)
        }
    });

    res.status(200).json({id: session.id})

} 
