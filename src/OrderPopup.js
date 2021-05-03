import React from 'react'
import FlipMove from "react-flip-move";
import { useStateValue } from './StateProvider';
import './OrderPopup.css'
import CurrencyFormat from "react-currency-format"
import CloseIcon from '@material-ui/icons/Close';

function OrderPopup() {
    const [{cart}, dispatch] = useStateValue();
    const ticketNotVisibleState = {
        transform: "translateX(-100%)",
        opacity: 0.1
    };

    const removeFromPopup = (itemId) => {
        dispatch({
            type: 'REMOVE_FROM_CART',
            id: itemId
        })
    }

    return (
        <div className="orderpopup" style={{margin:0}}>
            <FlipMove
                enterAnimation={{
                    from: ticketNotVisibleState,
                    to: {}
                }}
                leaveAnimation={{
                    from: {},
                    to: ticketNotVisibleState
                }}
            >
                {cart.map((item)=>(
                    <div className="eachOrderPop">
                        {/* <table style={{cellspacing="0", cellpadding="0"}}>
                            <tr>
                                <td>
                                    <div className="imagePlace">
                                        <img src={item.image} alt=""/>
                                    </div>
                                </td>
                                <td>
                                    <div className="itemContent" style={{backgroundColor:"black"}}>
                                        <span><CloseIcon/></span>
                                        {item.title.length > 10 ? item.title.substring(0,10) + '...' : item.title} <br/>
                                        <CurrencyFormat renderText={(value) => (
                                            <>
                                                <p>{value}</p>
                                            </>
                                            )}
                                            decimalScale={2}
                                            value={item.price}
                                            displayType={"text"}
                                            thousandSeparator={true}
                                            prefix={"$"}
                                        />
                                    </div>
                                </td>
                            </tr>
                        </table> */}

                        <div className="imagePlace">
                            <img src={item.image} alt=""/>
                        </div>
                        {/* onClick={function(){removeTaskFunction(todo)}} */}
                        <div className="itemContent">
                            <div onClick={() => removeFromPopup(item.id)}>
                                <span><CloseIcon className="closeIcon"/></span>
                            </div>
                            {item.title.length > 10 ? item.title.substring(0,10) + '...' : item.title} <br/>
                            <CurrencyFormat renderText={(value) => (
                                <>
                                    <p>Price: {value}</p>
                                </>
                                )}
                                decimalScale={2}
                                value={item.price}
                                displayType={"text"}
                                thousandSeparator={true}
                                prefix={"Rs"}
                            />
                        </div>
                    </div>
                ))}
            </FlipMove>
        </div>
    )
}

export default OrderPopup