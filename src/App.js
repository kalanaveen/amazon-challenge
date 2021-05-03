import './App.css';
import Header from './Header';
import Home from './Home';
import Checkout from './Checkout';
import Login from './Login';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import { useEffect } from 'react';
import { auth } from './firebase';
import { useStateValue } from './StateProvider';
import Payment from './Payment';
import { loadStripe } from '@stripe/stripe-js';
import {  Elements } from '@stripe/react-stripe-js';
import Orders from './Orders';

const promise = loadStripe('pk_test_51IkTYJSINlcHSX6mZoUvxTTnyEb2WeqwxSWWPTcZbsoAgK31ugUQ4IeX3cSn6OLe9mSCwCYU2jSS6cdvIDkWh2UG00u5Sv8tXl');
function App() {
  const [{}, dispatch] = useStateValue();
  useEffect(() => {
    auth.onAuthStateChanged(authUser => {
      console.log("user is ", authUser);
      if (authUser) {
        dispatch({
          type: "SET_USER",
          user: authUser
        })
      } else {
        dispatch({
          type: "SET_USER",
          user: null
        })
      }
    })
  }, [])
  return (
    <Router>
      <div className="app">
        <Switch>
          <Route exact path="/">
            <Header />
            <Home />
          </Route>

          <Route exact path="/checkout">
            <Header />
            <Checkout />
          </Route>

          <Route exact path="/login">
            <Login />
          </Route>

          <Route exact path="/payment">
            <Header />
            <Elements stripe={promise}>
            <Payment />
            </Elements>
            
          </Route>
          <Route exact path="/orders">
            <Header/>
            <Orders/>
          </Route>

        </Switch>

      </div>
    </Router>
  );
}

export default App;
