import { useEffect, useState } from "react";
import ToDo from "./ToDo";
import ToDoForm from "./ToDoForm";
import uniqid from "uniqid";
import "../App.css";
import { FaGithub, FaTwitter } from "react-icons/fa";
import { IconContext } from "react-icons";
import { auth, db } from "./fbAuth";
import firebase from "firebase";


const ToDoLayout = () => {

    const [todos, setTodos] = useState([]);

    useEffect(() => {
      getTodosFromFirebase();
      // eslint-disable-next-line
    }, []);

    const addToDo = (todoitem) => {
      todoUserRef.add({
        isComplete: false,
        timeStamp: firebase.firestore.FieldValue.serverTimestamp(),
        toDoItem: todoitem,
        uniqueId: uniqid(),
      });
    };

    const getTodosFromFirebase = () => {
      todoUserRef.onSnapshot(function (query) {
        setTodos(
          query.docs.map((doc) => ({
            id: doc.id, //this id is to navigate through collection when we want to delete a todo
            todoitem: doc.data().toDoItem,
            isComplete: doc.data().isComplete,
          }))
        );
      });
    };

    const toDoComplete = (id, isComplete) => {
      todoUserRef.doc(id).update({
        isComplete: !isComplete,
      });
    };

    const removeToDo = (id) => {
      todoUserRef.doc(id).delete();
    };

    const signOutGoogle = () => auth.signOut()
    const todoUserRef = db.collection(`users/${auth.currentUser.uid}/todos`)

    return (
      <div className="app">
        <div className="signoutbtn">
          <button onClick={signOutGoogle}> Sign out</button>
        </div>
        <div className="todomain">
          <label className="title"> TO DO LIST 📝</label>
          <div className="todoinput">
            <ToDoForm addToDo={addToDo} />
          </div>
          <div className="todos">
            {todos.map((todo, index) => (
              <ToDo
                key={uniqid()}
                index={index}
                todo={todo}
                isComplete={todo.isComplete}
                toDoComplete={toDoComplete}
                removeToDo={removeToDo}
              />
            ))}
          </div>
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
    );
};

export default ToDoLayout;
