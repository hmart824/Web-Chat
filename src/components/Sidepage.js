import React ,{useState , useEffect} from 'react';
import './Sidepage.css';
import Userprofile from './Userprofile';
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
    },[])
    const searchedUser = allUser.filter((user) =>{
        if(searchInput){
            if(user.data().fullname.toLowerCase().includes(searchInput.toLocaleLowerCase()))
            {
                return user;

            }  
        }
    }) ;

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
                <div className="side-page-profile" onClick={props.signOut}>
                    <img src={props.currentUser.photoURL} alt="" />   
                </div>
                <p>{props.currentUser.fullname}</p>
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
        </div>
    </>
  )
}

export default Sidepage