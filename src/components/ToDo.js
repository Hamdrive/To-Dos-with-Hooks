import React from "react"
import { FaTrash, FaCheck } from "react-icons/fa";
import { IconContext } from "react-icons";

const ToDo = ({ todo, toDoComplete, removeToDo }) => {
  const handleCompleteTask = () =>{
    toDoComplete(todo.id)
  }

  return (
    <div className="todoitem">
      <div className="todolistitem">
        {todo.isComplete === true ? <s>{todo.text}</s> : <p>{todo.text}</p>}
        {console.log(todo)}
      </div>

      <div className="complete">
        <p className="completebtn" onClick={() => handleCompleteTask()}>
          <IconContext.Provider value={{ color: "green" }}>
            <FaCheck />
          </IconContext.Provider>
        </p>
      </div>

      <div className="delete">
        <p className="deletebtn" onClick={() => removeToDo(todo.id)}>
          <IconContext.Provider value={{ color: "red" }}>
            <FaTrash />
          </IconContext.Provider>
        </p>
      </div>
    </div>
  );
};

export default ToDo