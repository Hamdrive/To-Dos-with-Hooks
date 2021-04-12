import React, {useState} from "react"
import { FaPlus } from "react-icons/fa";
import { IconContext } from "react-icons";

const placeholderArray = [
  "Zoom Call @ 11AM",
  "Pick Up Dry cleaning",
  "Get Groceries",
  "Go to the Gym",
  "Take A Bath",
  "Walk the Dog",
  "Take out the Trash",
  "Call Mom",
  "Doctor's Appointment @ 10AM",
];
const placeholderText = Math.floor(Math.random() * 6);

const ToDoForm = ({ addToDo }) => {
  
  const [todoitem, setTodoitem] = useState("");

  const createToDo = (e) => {
    e.preventDefault();
    addToDo(todoitem);
    setTodoitem("");
  };

  return (
    <form onSubmit={createToDo}>
      <input
        type="text"
        name="text"
        id="text"
        value={todoitem}
        onChange={(e) => setTodoitem(e.target.value)}
        placeholder={placeholderArray[placeholderText]}
      />
      <p className="addtodo" onClick={createToDo}>
        <IconContext.Provider value={{ color: "#14213d" }}>
          <FaPlus />
        </IconContext.Provider>
      </p>
    </form>
  );
};

export default ToDoForm;
