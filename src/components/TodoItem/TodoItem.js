import React from "react";
import { MdDeleteForever, MdOutlineModeEditOutline } from "react-icons/md";

const TodoItem = ({
  todo,
  onCompleteTodo,
  onRemoveTodo,
  onEditButtonClick,
}) => {
  return (
    <li
      className={todo?.isCompleted ? "todo-item todo-completed" : "todo-item"}
    >
      <p>{todo?.text}</p>
      <div className="todo-btn__container">
        <button className="todo-btn" onClick={() => onCompleteTodo(todo?.id)}>
          {todo?.isCompleted && (
            <span className="todo-btn__check">
              <svg xmlns="http://www.w3.org/2000/svg" width="11" height="9">
                <path
                  fill="none"
                  stroke="#FFF"
                  strokeWidth="2"
                  d="M1 4.304L3.696 7l6-6"
                />
              </svg>
            </span>
          )}
        </button>
        <MdOutlineModeEditOutline
          className="todo-edit"
          onClick={() => onEditButtonClick(todo)}
        />
        <MdDeleteForever
          className="todo-delete"
          onClick={() => onRemoveTodo(todo?.id)}
        />
      </div>
    </li>
  );
};

export default TodoItem;
