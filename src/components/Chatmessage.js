import React from 'react';
import { auth } from '../firebase';
import './Chatmessage.css';

function Chatmessage(props) {
  return (
   
        <div className="chat-message"
        style={{
          alignSelf:
            props.sender === auth?.currentUser?.email ? "flex-end" : "flex-start",
  
          backgroundColor:
            props.sender === auth?.currentUser?.email ? "#dcf8c6" : "#fff",
        }}
        >
            <div className="chat-message-text">
                <p>{props.message}</p>
            </div>
            <div className="chat-message-date">
                <p>{new Date(props.time.toDate()).toLocaleString()}</p>
            </div>
        </div>
   
  )
}

export default Chatmessage