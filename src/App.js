import './App.css';
import { useState } from 'react';
import Home from './components/Home';
import Navbar from './components/Navbar';
import Chatpage from './components/Chatpage';
import About from './components/About';
import {
  BrowserRouter as Router,
  Routes,
  Route

} from "react-router-dom";
import Loginpage from './components/Loginpage';
import { auth } from './firebase';

function App() {
  const signOut = ()=>{
    auth.signOut()
    .then(()=>{
      setUser(null);
      localStorage.removeItem("user");
    })
    .catch((err)=>{alert(err.message)})
  }


  const newUser =  JSON.parse(localStorage.getItem("user"));
  const [user, setUser] = useState(newUser); 
  return (
    <>{
      user ? (
      <Router>
          <Navbar signOut={signOut}/>
            <Routes>
              <Route exact path="/" element={<Home currentUser={user} />}/>
              <Route exact path="/:emailId" element={<Chatpage currentUser={user}/>} />
              <Route exact path="/about" element={<About/>} />
            </Routes>
      </Router>
            ) : (<Loginpage setUser={setUser}/>)
      }
    </>
  );
}

export default App;
