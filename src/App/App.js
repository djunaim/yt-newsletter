import logo from '../logo.svg';
import './App.css';
import { getAuth, signInWithPopup, GoogleAuthProvider, getAdditionalUserInfo, signOut } from "firebase/auth";

function App() {

  const provider = new GoogleAuthProvider();
  // provider.addScope('https://www.googleapis.com/auth/contacts.readonly');

  const auth = getAuth();
  auth.languageCode = 'it';


  const handleSignOut = (e) => {
    e.preventDefault();
    signOut(auth).then(() => {
      // Sign-out successful.
      console.log('Sign-out successful.');
    }).catch((error) => {
      // An error happened.
    });
  }

  const handleSignIn = (e) => {
    e.preventDefault();
    signInWithPopup(auth, provider)
        .then((result) => {
          // This gives you a Google Access Token. You can use it to access the Google API.
          const credential = GoogleAuthProvider.credentialFromResult(result);
          const token = credential.accessToken;
          console.log(token, 'this is my token');
          // The signed-in user info.
          const user = result.user;
          console.log(user, 'this is my user')
          // IdP data available using getAdditionalUserInfo(result)
          const userInfo= getAdditionalUserInfo(result)
          console.log(userInfo, 'this is my userInfo');
        }).catch((error) => {
      // Handle Errors here.
      const errorCode = error.code;
      console.log(errorCode, 'this is my error code');
      const errorMessage = error.message;
      console.log(errorMessage, 'this is my error message');
      // The email of the user's account used.
      const email = error.customData.email;
      // The AuthCredential type that was used.
      const credential = GoogleAuthProvider.credentialFromError(error);
      console.log(credential, 'this is my credentials error');
      // ...
    });
  }

  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
          <p>
            Hello, World!
            <button onClick={handleSignIn}>Login</button>
            <button onClick={handleSignOut}>Logout</button>
          </p>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a>
      </header>
    </div>
  );
}

export default App;
