import {getAuth, GoogleAuthProvider, signInWithPopup, GithubAuthProvider, signOut} from 'firebase/auth';
import './App.css';
import {useState} from 'react';
import initializeAuthentication from './Firebase/firebase.initialize';

initializeAuthentication();
const gooleProvider=new GoogleAuthProvider();
const githubProvider = new GithubAuthProvider();

const auth=getAuth();
function App() {
  const [user, setUser] = useState([]);
  const handleGoogleSignIn = ()=>{
    signInWithPopup(auth, gooleProvider)
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
  const handleGithubSignIn=()=>{
      signInWithPopup(auth, githubProvider)
      .then(result=>{
        const {displayName, photoURL} = result.user;
        const loggedUser = {
          name:displayName,
          photo: photoURL
        }
        setUser(loggedUser)
      })
  }
  const handleSignOut=()=>{
    signOut(auth)
    .then(()=>{
      setUser({});
    })
  }
  return (
    <div className="App">
      {!user.name?
      <div>
        <button onClick={handleGoogleSignIn}>Google Sign In</button>
        <button onClick={handleGithubSignIn}>Github Sign In</button>
        </div>:
      <button onClick={handleSignOut}>Log Out</button>
        
      }
      
      <br/>
      {
        user.name && <div>
              <h2>Welcome: {user.name}</h2>
              <h4>Kita obosta: {user.email}</h4>
              <img src={user.photo} alt="" />
          </div>

      }
    </div>
  );
}

export default App;
