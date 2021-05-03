import React, { useState,useEffect  } from 'react';
import './Login.css';
import { Link, useHistory } from 'react-router-dom';
import { useStateValue } from './StateProvider';
import { db,auth } from './firebase';

function Login() {
    const history = useHistory();
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [ disabled, setDisabled] = useState(true);

    const signIn = (e) => {
        e.preventDefault();
        auth
            .signInWithEmailAndPassword(email, password)
            .then((auth) => {
                // succefull craete new passwd and email 
                history.push('/')
                
                console.log(auth);
            })
            .catch(error => alert(error.message))

    }
    const signUp = (e) => {
        e.preventDefault();
        auth
            .createUserWithEmailAndPassword(email, password)
            .then((auth) => {
                // succefull craete new passwd and email 
                if (auth) {
                    history.push('/')
                }
                console.log(auth);
            })
            .catch(error => alert(error.message))

    }
    const buttonChange = (value) => {
        setEmail(value);
    }
    function validateEmail(email) {
        const re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        return re.test(String(email).toLowerCase());
    }
    useEffect(()=>{
        if(validateEmail(email) && password.length > 5){
            setDisabled(false);
            // const test = document.getElementById('loginImage');
            // test.style.width = '500px';
        }
        else{
            setDisabled(true);
        }
    }, [email,password])
    return (
        <div className="login">
            <Link to="/">
                <img id="loginImage" src="https://upload.wikimedia.org/wikipedia/commons/thumb/a/a9/Amazon_logo.svg/1280px-Amazon_logo.svg.png" alt="" className="login_logo" />
            </Link>

            <div className="login_form">
                <h1>Sign In</h1>
                <form>
                    <h5>E-mail</h5>
                    <input type="text" value={email} onChange={event => buttonChange(event.target.value)} />

                    <h5>Password</h5>
                    <input type="password" value={password} onChange={event => setPassword(event.target.value)} />

                    <button className={!disabled ? "login__signInButton" : "login__signInButton disabled"} onClick={signIn} type="submit" disabled={disabled}>Sign In</button>
                </form>

                {disabled && (
                    <p style={{color:'red'}}>Invalid e-mail / password length is less than 6</p>
                )}
                <p>
                    By signing-in you agree to AMAZON FAKE CLONE Conditions of Use & Sale. Please
                    see our Privacy Notice, our Cookies Notice and our Interest-Based Ads
                </p>

                <button onClick={signUp} disabled={disabled} className={!disabled ? "login_signUpButton" : "login_signUpButton disabled"}>Create Your Amazon Account</button>
            </div>
        </div>
    )
}

export default Login
