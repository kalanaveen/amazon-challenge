import React from 'react';
import './Subtotal.css';
import CurrencyFormat from 'react-currency-format';
import {useStateValue} from './StateProvider';
import { getCartTotal } from './reducer';
import { useHistory } from 'react-router-dom';
import { ShoppingBasket } from '@material-ui/icons';


function Subtotal() {
    const history = useHistory();
    const[{ cart },dispatch] = useStateValue();
    const subtotal = cart?.reduce((acc, item) => (acc+=item.price), 0); 
    return (
        <div className="subtotal">
            <CurrencyFormat
                renderText={(value) => (
                    <>
                        <p>
                            Subtotal ({cart.length>1? 'items' : 'item'}):<strong>{value}</strong>
                        </p>
                        <small className="subtotal_gift">
                            <input type="checkbox" />This Order Contains a gift
                    </small>
                    </>
                )}
                decimalScale={2}
                value={getCartTotal(cart)}
                displayType={"text"}
                thousandSeparator={true}
                prefix={"Rs"}
            />
         <button onClick={e=>history.push('/payment')}>Proceed To Checkout</button>
        </div>
    )
}

export default Subtotal;
