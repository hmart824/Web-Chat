import React from 'react';
import Sidepage from './Sidepage';
import './Home.css';


function Home(props) {
  return (
    <>
      <div className="home">
        <div className="home-container">
            <Sidepage currentUser={props.currentUser} signOut={props.signOut}/>
          <div className="home-logo">
            <img src="logo.png" alt="" />
          </div>
        </div>
        {/* <div className="imgContainer">
          <img src="https://lh3.googleusercontent.com/a/ALm5wu1zRepXhqecsXInnBiUqGoV8yCPKqgiPrPxCzTKUg=s96-c" alt="" />
        </div> */}
        
      </div>
    </>
  )
}

export default Home