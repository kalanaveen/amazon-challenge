import React, { useEffect, useReducer, useState } from 'react';
import './Payment.css';
import CurrencyFormat from 'react-currency-format';
import { getCartTotal } from './reducer';
import { useStateValue } from './StateProvider';
import CheckoutProduct from './CheckoutProduct';
import { Link,useHistory } from 'react-router-dom';
import { CardElement, useStripe, useElements } from '@stripe/react-stripe-js';
import axios from './axios';
import { db } from './firebase';

function Payment() {
    const [{ cart, user }, dispatch] = useStateValue();
    const history = useHistory();
    const stripe = useStripe();
    const elements = useElements();
    const [error, setError] = useState();
    const [disabled, setDisabled] = useState();
    const[succeeded,setSucceeded] = useState(false);
    const[processing,setProcessing] = useState("");
    const[clientSecret,setClientSecret] = useState(true);

    useEffect(()=>{
        const getClientSecret = async()=>{
           const response = await axios({
               method:'post',
               url:`/payments/create?total=${getCartTotal(cart)}`
           });
           setClientSecret(response.data.clientSecret);
        }
        getClientSecret();
    },[cart])
    console.log('the secret is ',clientSecret);
    const handledSubmit = async(e) => {
          e.preventDefault();
          setProcessing(true);
          const payload = await stripe.confirmCardPayment(clientSecret,{
              payment_method:{
                  card:elements.getElement(CardElement)
              }
          }).then(({paymentIntent})=>{
            db.collection('users').doc(user?.uid).collection('orders').doc(paymentIntent.id).set({
                cart: cart,
                amount: paymentIntent.amount,
                created: paymentIntent.created
            })
              setSucceeded(true);
              setError(null);
              setProcessing(false);
              dispatch({
                type: 'EMPTY_CART'
            })
              history.replace('/orders')
          })
    }
    const handledChange = e => {
        setDisabled(e.empty);
        setError(e.error ? e.error.message : "");
    }
    return (
        <div className="payment">
            <div className="payment_container">
                <h1>
                    checkout(<Link to='/checkout'>{cart?.length}items</Link>)
            </h1>
                <div className="payment_section">
                    <div className="payment_title">
                        <h3>Delivery Address</h3>
                    </div>
                    <div className="payment_address">
                        <p>{user?.email}</p>
                        <p>durga nagar</p>
                        <p>bareilly uttar pradesh</p>
                    </div>
                </div>

                <div className="payment_section">
                    <div className="payment_title">
                        <h3>Review Items And Deleivery</h3>
                    </div>
                    <div className="payment_items">
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

                <div className="payment_section">
                    <div className="payment_title">
                        <h3>Payment Method</h3>
                    </div>
                    <div className="payment_details">
                        <form onSubmit={handledSubmit}>
                            <CardElement onChange={handledChange} />

                            <div className="payment_priceContainer">
                                <CurrencyFormat
                                    renderText={(value) => (
                                        <>
                                            <h3>Order Total:{value}</h3>
                                        </>
                                    )}
                                    decimalScale={2}
                                    value={getCartTotal(cart)}
                                    displayType={"text"}
                                    thousandSeparator={true}
                                    prefix={"Rs"}
                                />
                                <button disabled={processing||disabled||succeeded}>
                                <span>{processing ?<p>processing</p>:"Buy Now"}</span>

                                </button>
                            </div>
                            {error && <div>{error}</div>}
                        </form>
                    </div>

                </div>
            </div>

        </div>
    )
}

export default Payment
