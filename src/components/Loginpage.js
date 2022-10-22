import React from 'react';
import { Navigate } from 'react-router';
import db,{ auth, googleProvider } from '../firebase';
import './Loginpage.css'

function Loginpage(props) {
    const signInWithGoogle = ()=>{
        auth.signInWithPopup(googleProvider)
        .then((result)=>{
            const newUser = {
                fullname: result.user.displayName,
                email: result.user.email,
                photoURL: result.user.photoURL
            };
            <Navigate to="/"/>
            props.setUser(newUser);
            localStorage.setItem('user' , JSON.stringify(newUser));
            db.collection('users').doc(result.user.email).set(newUser);
        })
        .catch((err)=> alert(err.message)) ;

    };
  return (
    <>
        <div className="login">
            <div className="login-container">
                <img src="logo.png" alt="" />
                <p>Web Chat</p>
                <button className="login-btn" onClick={signInWithGoogle}>
                    <img src="google.png" alt="" />
                    Login With Google
                </button>
            </div>
        </div>
    </>
  )
}

export default Loginpage