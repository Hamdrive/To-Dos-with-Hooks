import { useEffect, useState } from "react";
import ToDo from "./components/ToDo";
import ToDoForm from "./components/ToDoForm";
import uniqid from "uniqid";
import "./App.css";
import { FaGithub, FaTwitter } from "react-icons/fa";
import { IconContext } from "react-icons";
import {db} from "./components/firebase"
import firebase from "firebase"

function App() {
  const [todos, setTodos] = useState([]);

  useEffect(() => {
    let storedToDos = JSON.parse(localStorage.getItem("react-todos"));
    if (storedToDos) {
      setTodos(storedToDos);
    }
  }, []);

  useEffect(() => {
    localStorage.setItem("react-todos", JSON.stringify(todos));
  }, [todos]);

  const addToDo = (todoitem) => {
    if (!todoitem) {
      return;
    }
    const newToDoList = [
      ...todos,
      { id: uniqid(), isComplete: false, text: todoitem },
    ];
    setTodos(newToDoList);

    db.collection("todos").add({
      id : uniqid(),
      isComplete : false,
      timestamp : firebase.firestore.FieldValue.serverTimestamp(),
      todo_item : todoitem,
    })
  };

  const toDoComplete = (id) =>
    setTodos(
      todos.map((todo) => {
        if (todo.id === id) {
          return {
            ...todo,
            isComplete: !todo.isComplete,
          };
        }
        return todo;
      })
    );

  const removeToDo = (id) => {
    const newToDoList = todos.filter((todo) => todo.id !== id);
    setTodos(newToDoList);
  };

  return (
    <div className="app">
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
        <div >
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
