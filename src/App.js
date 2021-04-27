import { useEffect, useState } from "react";
import ToDo from "./components/ToDo";
import ToDoForm from "./components/ToDoForm";
import uniqid from "uniqid";
import "./App.css";
import { FaGithub, FaTwitter } from "react-icons/fa";
import { IconContext } from "react-icons";
import { db } from "./components/firebase";
import firebase from "firebase";
import googleAuth from "./components/userAuth"

function App() {
  const [todos, setTodos] = useState([]);

  useEffect(() => {
    // let storedToDos = JSON.parse(localStorage.getItem("react-todos"));
    // if (storedToDos) {
    //   setTodos(storedToDos);
    // }

    getTodosFromFirebase();
  }, []);

  // useEffect(() => {
  //   localStorage.setItem("react-todos", JSON.stringify(todos));
  // }, [todos]);

  const addToDo = (todoitem) => {
    // if (!todoitem) {
    //   return;
    // }
    // const newToDoList = [
    //   ...todos,
    //   { id: uniqid(), isComplete: false, text: todoitem },
    // ];
    // setTodos(newToDoList);

    db.collection("todos").add({
      isComplete: false,
      timeStamp: firebase.firestore.FieldValue.serverTimestamp(),
      toDoItem: todoitem,
      uniqueId: uniqid(),
    });
  };

  const getTodosFromFirebase = () => {
    db.collection("todos").onSnapshot(function (query) {
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
    // setTodos(
    //   todos.map((todo) => {
    //     if (todo.id === id) {
    //       return {
    //         ...todo,
    //         isComplete: !todo.isComplete,
    //       };
    //     }
    //     return todo;
    //   })
    // );

    db.collection("todos").doc(id).update({
      isComplete: !isComplete,
    });
  };

  const removeToDo = (id) => {
    // const newToDoList = todos.filter((todo) => todo.id !== id);
    // setTodos(newToDoList);

    db.collection("todos").doc(id).delete();
  };

  const handleOnClick = async () => {
    const googleProvider = new firebase.auth.GoogleAuthProvider();
    const res = await googleAuth(googleProvider);
    console.log(res);
  }

  return (
    <div className="app">
      <div className="todomain">
        <label className="title"> TO DO LIST 📝</label>
        <button onClick={handleOnClick}></button>
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
}

export default App;
