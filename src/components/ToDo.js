import React from "react";
import { FaTrash, FaCheck, FaUndo } from "react-icons/fa";
import { IconContext } from "react-icons";

const ToDo = ({ todo, toDoComplete, removeToDo, isComplete }) => {
  const handleCompleteTask = () => {
    toDoComplete(todo.id, isComplete);
  };

  const handleRemoveTask = () => {
    removeToDo(todo.id);
  };

  return (
    <div className="todoitem">
      <div className="todolistitem">
        {todo.isComplete === true ? (
          <s>{todo.todoitem}</s>
        ) : (
          <p>{todo.todoitem}</p>
        )}
        {console.log(todo)}
      </div>

      <div className="complete">
        <p className="completebtn" onClick={() => handleCompleteTask()}>
          {isComplete ? (
            <IconContext.Provider value={{ color: "blue" }}>
              <FaUndo />
            </IconContext.Provider>
          ) : (
            <IconContext.Provider value={{ color: "green" }}>
              <FaCheck />
            </IconContext.Provider>
          )}
        </p>
      </div>

      <div className="delete">
        <p className="deletebtn" onClick={() => handleRemoveTask()}>
          <IconContext.Provider value={{ color: "red" }}>
            <FaTrash />
          </IconContext.Provider>
        </p>
      </div>
    </div>
  );
};

export default ToDo;
