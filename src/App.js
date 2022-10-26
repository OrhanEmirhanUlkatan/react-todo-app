import { useState, useEffect } from "react";

import ThemeToggle from "./components/ThemeToggle/ThemeToggle";
import AddTodoForm from "./components/AddTodoForm/AddTodoForm";
import TodoList from "./components/TodoList/TodoList";
import TodoFilters from "./components/TodoFilters/TodoFilter";
import "./App.css";
import EditTodoForm from "./components/EditTodoForm/EditTodoForm";

function App() {
  const [darkTheme, setDarkTheme] = useState(
    () => localStorage.getItem("dark_theme") === "true"
  );
  const [todo, setTodo] = useState("");
  const [todos, setTodos] = useState(() => {
    const savedTodos = localStorage.getItem("todos");
    if (savedTodos) {
      return JSON.parse(savedTodos);
    } else {
      return [];
    }
  });
  const [status, setStatus] = useState("all");
  const [filtered, setFiltered] = useState([]);
  const [isEditing, setIsEditing] = useState(false);
  const [currentTodo, setCurrentTodo] = useState({});

  useEffect(() => {
    localStorage.setItem("todos", JSON.stringify(todos));
    localStorage.setItem("dark_theme", darkTheme);
    if (darkTheme) {
      document.body.classList.add("dark");
      document.body.classList.remove("light");
    } else {
      document.body.classList.add("light");
      document.body.classList.remove("dark");
    }
    filterHandler();
    // eslint-disable-next-line
  }, [todos, status, darkTheme]);

  function handleThemeChange() {
    setDarkTheme(!darkTheme);
  }

  function handleInputChange(e) {
    setTodo(e.target.value);
  }

  function handleFormSubmit(e) {
    e.preventDefault();

    if (todo !== "") {
      setTodos([
        ...todos,
        {
          id: new Date(),
          text: todo.trim(),
          isCompleted: false,
          isActive: true,
        },
      ]);
    }
    setTodo("");
  }

  function completeTodo(id) {
    const completed = todos.map((todo) => {
      return todo?.id === id
        ? {
            ...todo,
            isCompleted: !todo?.isCompleted,
            isActive: !todo?.isActive,
          }
        : todo;
    });
    setTodos(completed);
  }

  function removeTodo(id) {
    const removed = todos.filter((todo) => {
      return todo?.id !== id;
    });
    setTodos(removed);
  }

  function showAllTodos() {
    setFiltered(todos);
    setStatus("all");
  }

  function showActiveTodos() {
    setFiltered(todos.filter((todo) => todo?.isActive));
    setStatus("active");
  }

  function showCompletedTodos() {
    setFiltered(todos.filter((todo) => todo?.isCompleted));
    setStatus("completed");
  }

  function clearCompletedTodos() {
    const clear = todos.filter((todo) => {
      return todo?.isCompleted !== true;
    });
    setTodos(clear);
  }

  function filterHandler() {
    switch (status) {
      case "active":
        showActiveTodos();
        break;
      case "completed":
        showCompletedTodos();
        break;
      default:
        showAllTodos();
        break;
    }
  }

  function handleEditButtonClick(todo) {
    setIsEditing(true);
    setCurrentTodo({ ...todo });
  }

  function handleUpdateTodo(id, updatedTodo) {
    const updatedItem = todos?.map((todo) => {
      return todo?.id === id ? updatedTodo : todo;
    });
    setIsEditing(false);
    setTodos(updatedItem);
  }

  return (
    <>
      <div>
        <div className="container">
          <header className="todo-header">
            <ThemeToggle
              darkTheme={darkTheme}
              onThemeChange={handleThemeChange}
            />
            {isEditing ? (
              <EditTodoForm
                currentTodo={currentTodo}
                setCurrentTodo={setCurrentTodo}
                onUpdateTodo={handleUpdateTodo}
                setIsEditing={setIsEditing}
              />
            ) : (
              <AddTodoForm
                todo={todo}
                onFormSubmit={handleFormSubmit}
                onInputChange={handleInputChange}
              />
            )}
          </header>
        </div>
      </div>
      <main className="todo-main">
        <div className="container">
          <TodoFilters
            filtered={filtered}
            status={status}
            onShowAllTodos={showAllTodos}
            onShowActiveTodos={showActiveTodos}
            onShowCompletedTodos={showCompletedTodos}
            onClearCompletedTodos={clearCompletedTodos}
          />
          <hr className="divider"></hr>
          <TodoList
            todos={todos}
            filtered={filtered}
            status={status}
            AddTodoFormValue={todo}
            onShowAllTodos={showAllTodos}
            onShowActiveTodos={showActiveTodos}
            onShowCompletedTodos={showCompletedTodos}
            onCompleteTodo={completeTodo}
            onRemoveTodo={removeTodo}
            onClearCompletedTodos={clearCompletedTodos}
            onEditButtonClick={handleEditButtonClick}
          />
        </div>
      </main>
    </>
  );
}

export default App;
