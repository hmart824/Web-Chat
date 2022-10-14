import React , {useState , useEffect, useRef } from 'react'
import { IoSendSharp } from "react-icons/io5";
import './Chatcontainer.css'
import Chatmessage from './Chatmessage'
import EmojiPicker from 'emoji-picker-react';
import {useParams} from 'react-router-dom';
import db from '../firebase';
import firebase from 'firebase';


function Chatcontainer(props) {

    const [chatUser, setChatUser] = useState([]);
    const [message, setMessage] = useState("");
    const [chatMessages, setChatMessages] = useState([]);
    const {emailId} = useParams();
    const chatBox  = useRef(null);
   

    useEffect(()=>{
        const getUser = async ()=>{
            await db.collection('users').doc(emailId).onSnapshot((snapshot)=>{
                setChatUser(snapshot.data());
            })
        };
        getUser();

        const getMessages = async ()=>{
            await db.collection('chats').doc(emailId).collection('messages').orderBy('timeStamp' , 'asc').onSnapshot((snapshot)=>{
                let messages = snapshot.docs.map((doc)=> doc.data());

                let newMessages = messages.filter((message)=>
                    message.senderEmail === (props.currentUser.email || emailId) || message.receiverEmail === (props.currentUser.email || emailId)
                )
                setChatMessages(newMessages);

            })
        }
        getMessages();

    },[emailId]);

   
  useEffect(() => {
    chatBox.current.addEventListener("DOMNodeInserted", (event) => {
      const { currentTarget: target } = event;
      target.scroll({ top: target.scrollHeight, behavior: "smooth" });
    });
  }, [chatMessages]);

    const send = (e)=>{
        e.preventDefault();
        if(emailId && message !== ""){
            let payload = {
                text: message,
                senderEmail: props.currentUser.email,
                receiverEmail: emailId,
                timeStamp: firebase.firestore.Timestamp.now()
            };
            //sender
            db.collection('chats').doc(props.currentUser.email).collection('messages').add(payload)

            //receiver
            db.collection('chats').doc(emailId).collection('messages').add(payload)

            //friend list of current user
            db.collection('friendList').doc(props.currentUser.email).collection('list').doc(emailId).set({
                email: chatUser.email,
                fullname: chatUser.fullname,
                photoURL: chatUser.photoURL,
                lastMessage: message
            });

            //friend list of chat user
            db.collection('friendList').doc(emailId).collection('list').doc(props.currentUser.email).set({
                email: props.currentUser.email,
                fullname: props.currentUser.fullname,
                photoURL: props.currentUser.photoURL,
                lastMessage: message
            });
            setMessage("");

        }
        
    }
  
    const [openEmojiBox, setopenEmojiBox] = useState(false);
    const emojiBox = ()=>{
        setopenEmojiBox(!openEmojiBox);
    }
  return (
  
        <div className="chat-container">
            <div className="chat-container-header">
                <div className="chat-user-info">
                    <div className="chat-user-img">
                        <img src={chatUser.photoURL} alt="/user.png" />
                    </div>
                    <p>{chatUser.fullname}</p>
                </div>
            </div>
            <div className="chat-display-container" ref={chatBox}>
                {
                    chatMessages.map((message,key)=>
                         (
                            <Chatmessage message={message.text} key={key} time={message.timeStamp} sender={message.senderEmail} />
                        )
                    )
                }
                    
                   
            </div>
            <div className="chat-input">
                {openEmojiBox && <EmojiPicker onEmojiClick={(emojiData, event)=>{
                    setMessage(message + emojiData.emoji)
                }}/>}
                <div className="chat-input-btn">
                    <i className="bi bi-emoji-smile" onClick={emojiBox}></i>
                    <i className="bi bi-paperclip"></i>
                </div>
                <form onSubmit={send}>
                    <input type="text" placeholder="Type a Message" value={message} onChange={(e)=>{
                        setMessage(e.target.value);
                    }}/>
                </form>
                <div className="send-btn" onClick={send}>
                  <IoSendSharp/>
                </div>
            </div>
        </div>
    
  )
}

export default Chatcontainer