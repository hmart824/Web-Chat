import React ,{useState , useEffect } from 'react';
import './Sidepage.css';
import Userprofile from './Userprofile';
import { CgMoreVertical } from "react-icons/cg";
import db from '../firebase'


function Sidepage(props) {

    const [allUser, setAllUser] = useState([]);
    const [searchInput, setSearchInput] = useState("")
    const [friendList, setFriendList] = useState([]);

    useEffect(()=>{
        const getAllUser = async ()=>{
            await db.collection('users').onSnapshot((snapshot)=>{
                setAllUser(snapshot.docs.filter((doc)=> doc.data().email !== props.currentUser.email))
            })
        }

        getAllUser();

        const getAllFriends = async ()=>{
            await db.collection('friendList').doc(props.currentUser.email).collection('list').onSnapshot((snapshot)=>{
                setFriendList(snapshot.docs);
            })
        }
        getAllFriends();
    },[props.currentUser.email])
    const searchedUser = allUser.filter((user) =>{
        if(searchInput){
            if(user.data().fullname.toLowerCase().includes(searchInput.toLocaleLowerCase()))
            {
                return user;

            }  
        }

    }) ;
    const [openMoreMenu, setopenMoreMenu] = useState(false);
    
    const openMore = ()=>{
        setopenMoreMenu(!openMoreMenu)
    }

    const searchItem = searchedUser.map((user) =>{
        return (
            <Userprofile 
            name={user.data().fullname} 
            photoURL={user.data().photoURL} 
            email={user.data().email}
            key={user.id}/>
            )
    });

  return (
    <>
        <div className="side-page ">
            <div className="side-page-header">
                <div className="side-page-profile">
                    <img src={props.currentUser.photoURL} alt="" />   
                </div>
                <p>{props.currentUser.fullname}</p>
                    <div className="moreIcon" onClick={openMore} >
                        <CgMoreVertical/>
                    </div>
            </div>
            <div className="search">            
                <div className="search-box">
                    <i className="bi bi-search"></i>
                    <input type="text" name="search" id="search" placeholder='Search here' value={searchInput} onChange={(e) => setSearchInput(e.target.value)}/>
                </div>
            </div>
            <div className="side-page-user-profile">
                {
                    searchItem.length > 0 ? (searchItem) : (
                        friendList.map((friend , key) =>
                            <Userprofile  
                            name={friend.data().fullname} 
                            photoURL={friend.data().photoURL}
                            lastMessage={friend.data().lastMessage} 
                            email={friend.data().email}
                            key={key}
                            />
                        )
                    )
                }
                
                             
                           
            </div>
           { openMoreMenu && <div className="more-menu" >
                <span>New Group</span>
                <span>Starred messages</span>
                <span>Settings</span>
                <span onClick={props.signOut}>Logout</span>
            </div>}
        </div>
    </>
  )
}

export default Sidepage;