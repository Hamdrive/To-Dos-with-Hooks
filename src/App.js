import "./App.css";
import { auth } from "./components/fbAuth";
import firebase from "firebase";
import { useAuthState } from "react-firebase-hooks/auth";
import ToDoLayout from "./components/ToDoLayout";
import { FaGithub, FaTwitter } from "react-icons/fa";
import { IconContext } from "react-icons";
import GoogleButton from "react-google-button";

const signInGoogle = () =>
  auth.signInWithPopup(new firebase.auth.GoogleAuthProvider());

const SignIn = () => {
  return (
    <>
      <div className="app">
        <div className="todomain">
          <label className="title"> TO DO LIST 📝</label>
          <GoogleButton onClick={signInGoogle}/>
        </div>
        <footer>
          <span className="footertext">
            Made by Hamza{"  "}|{"  "}Connect with me:
          </span>
          <div>
            <IconContext.Provider value={{ color: "#1DA1F2", size: "1.75rem" }}>
              <a href="https://twitter.com/itsHamhere">
                <FaTwitter className="twitterlogo" />
              </a>
            </IconContext.Provider>
          </div>
          <div>
            <IconContext.Provider value={{ color: "#24292e", size: "1.75rem" }}>
              <a href="https://github.com/Hamdrive">
                <FaGithub className="githublogo" />
              </a>
            </IconContext.Provider>
          </div>
        </footer>
      </div>
    </>
  );
};

function App() {
  const [user] = useAuthState(auth);

  return user ? <ToDoLayout /> : <SignIn />;
}

export default App;
