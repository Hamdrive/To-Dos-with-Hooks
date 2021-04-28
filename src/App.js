import "./App.css";
import { auth } from "./components/FireBase";
import firebase from "firebase";
import { useAuthState } from "react-firebase-hooks/auth";
import ToDoLayout from "./components/ToDoLayout";

const signInGoogle = () =>
  auth.signInWithPopup(new firebase.auth.GoogleAuthProvider());

const SignIn = () => {
  return (
    <div>
      <button onClick={signInGoogle}>SignUp with Google</button>
    </div>
  );
};

function App() {
  const [user] = useAuthState(auth);

  return user ? <ToDoLayout /> : <SignIn />;
}

export default App;
