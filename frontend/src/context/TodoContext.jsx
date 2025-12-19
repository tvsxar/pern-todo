import { createContext, useState, useEffect } from "react";
import fetchGraphQL, { graphql } from '../api/todoApi';

const TodoContext = createContext();

function TodoProvider({ children }) {
  const [description, setDescription] = useState("");
  const [todos, setTodos] = useState([]);
  const [editing, setEditing] = useState(null);
  const [editedText, setEditedText] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    getTodos();
  }, []);

  async function getTodos() {
    try {
      setLoading(true);
      setError(null);
      const response = await fetchGraphQL(graphql.GET_TODOS_QUERY);
      setTodos(response.getTodos);
    } catch (err) {
      console.error(err.message);
      setError("Failed to fetch todos. Please try again later.");
    } finally {
      setLoading(false);
    }
  }

  async function handleSubmit(e) {
    e.preventDefault();
    if (!description.trim()) return;

    try {
      setError(null);
      const response = await fetchGraphQL(graphql.ADD_TODO_MUTATION, {
        description,
      });

      setTodos([...todos, response.addTodo]);
      setDescription("");
    } catch (err) {
      console.error(err.message);
      setError("Failed to add todo. Please try again later.");
    }
  }

  async function saveEdit(id) {
    if (!editedText.trim()) return;

    try {
      setError(null);

      const currentTodo = todos.find((todo) => todo.todo_id === id);
      if (currentTodo.description === editedText) {
        setEditing(null);
        setEditedText("");
        return; // No changes made
      }

      const response = await fetchGraphQL(graphql.UPDATE_TODO_MUTATION, {
        todo_id: id,
        description: editedText,
        completed: false,
      });

      setTodos(
        todos.map((todo) =>
          todo.todo_id === id
            ? { ...todo, description: editedText, completed: false }
            : todo
        )
      );
      setEditing(null);
      setEditedText("");
    } catch (err) {
      console.error(err.message);
      setError("Failed to update todo. Please try again later.");
    }
  }

  async function deleteTodo(id) {
    try {
      setError(null);
      const response = await fetchGraphQL(graphql.DELETE_TODO_MUTATION, {
        todo_id: id,
      });

      setTodos(todos.filter((todo) => todo.todo_id !== id));
    } catch (err) {
      console.error(err.message);
      setError("Failed to delete todo. Please try again later.");
    }
  }

  async function toggleComplete(id) {
    try {
      setError(null);
      const currentTodo = todos.find((todo) => todo.todo_id === id);
      const response = await fetchGraphQL(graphql.UPDATE_TODO_MUTATION, {
        todo_id: id,
        description: currentTodo.description,
        completed: !currentTodo.completed,
      });

      setTodos(
        todos.map((todo) =>
          todo.todo_id === id ? { ...todo, completed: !todo.completed } : todo
        )
      );
    } catch (err) {
      console.error(err.message);
      setError("Failed to update todo. Please try again later.");
    }
  }

  return (
    <TodoContext.Provider
      value={{
        todos,
        editing,
        loading,
        error,
        description,
        editedText,
        setEditing,
        setEditedText,
        handleSubmit,
        saveEdit,
        deleteTodo,
        toggleComplete,
        setDescription
      }}
    >
      {children}
    </TodoContext.Provider>
  );
}

export { TodoContext };
export default TodoProvider;
