import React from 'react';
import './Checkout.css';
import CheckoutProduct from './CheckoutProduct';
import { useStateValue } from './StateProvider';
import Subtotal from './Subtotal';

function Checkout() {
    const [{ cart,user }, dispatch] = useStateValue();
    return (
        <div className="checkout">
            <div className="checkout_left">
                <img className="checkout_ad" src="https://images-eu.ssl-images-amazon.com/images/G/31/img19/AmazonPay/PrimeRewards/LP_Revamp/PC_Header_Banner._CB468631809_.jpg" alt="amazon add" />
                <div>
                    <h3>Hello,{user?.email}</h3>
                    <h2 className="checkout_title">Your Shopping Cart</h2>
                    {cart.map(item => (
                        <CheckoutProduct
                            id={item.id}
                            title={item.title}
                            image={item.image}
                            price={item.price}
                            rating={item.rating}
                       />
                   ))}
               </div>
            </div>
            <div className="checkout_right">
                <Subtotal />
            </div>
        </div>
    )
}

export default Checkout;
