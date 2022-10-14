import React from 'react';
import { useNavigate } from 'react-router';
import './Userprofile.css';

function Userprofile(props) {

  const navigate = useNavigate();
  const goToUser = (emailId) =>{
    if(emailId){
      navigate(`/${emailId}`)
    }  
  }
  return (
    <>
         <div className="user-profile" onClick={()=> goToUser(props.email)}>
                <div className="side-page-profile">
                    <img src={props.photoURL} alt="" />
                </div>
                <div className="profile-name">
                  <span>{props.name}</span>
                  {props.lastMessage && (<p className='user-last-message'>{props.lastMessage}</p>)}
                </div>
               
         </div>
    </>
  )
}

export default Userprofile