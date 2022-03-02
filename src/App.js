import {getAuth, GoogleAuthProvider, signInWithPopup} from 'firebase/auth';
import './App.css';
import {useState} from 'react';
import initializeAuthentication from './Firebase/firebase.initialize';

initializeAuthentication();
const provider=new GoogleAuthProvider();


function App() {
  const [user, setUser] = useState([]);
  const handleGoogleSignIn = ()=>{
    const auth=getAuth();
    signInWithPopup(auth, provider)
    .then(result=>{
      const {email, displayName,photoURL} = result.user;
      const loggedUser = {
        name: displayName,
        email: email,
        photo: photoURL
      }
      setUser(loggedUser);
    })
  }
  return (
    <div className="App">
      <button onClick={handleGoogleSignIn}>Google Sign In</button>
      <br/>
      {
        user.email && <div>
              <h2>Welcome: {user.name}</h2>
          </div>

      }
    </div>
  );
}

export default App;
