import { createContext, useState, useEffect } from "react";
import fetchGraphQL, { graphql } from '../api/todoApi.js';
import type { Todo, TodoContextType, GetTodosResponse, AddTodoResponse, UpdateTodoResponse, DeleteTodoResponse } from '../types/types.js';

const TodoContext = createContext<TodoContextType>(
  {} as TodoContextType
);

interface TodoProviderProps {
  children: React.ReactNode;
}

function TodoProvider({ children }: TodoProviderProps) {
  const [description, setDescription] = useState<string>("");
  const [todos, setTodos] = useState<Todo[]>([]);
  const [editing, setEditing] = useState<string | null>(null);
  const [editedText, setEditedText] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    getTodos();
  }, []);

  async function getTodos() {
    try {
      setLoading(true);
      setError(null);
      const response = await fetchGraphQL<GetTodosResponse>(graphql.GET_TODOS_QUERY);
      setTodos(response.getTodos);
    } catch (err) {
      if (err instanceof Error) console.error(err.message);
      setError("Failed to fetch todos. Please try again later.");
    } finally {
      setLoading(false);
    }
  }

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    if (!description.trim()) return;

    try {
      setError(null);
      const response = await fetchGraphQL<AddTodoResponse>(graphql.ADD_TODO_MUTATION, {
        description,
      });

      setTodos([...todos, response.addTodo]);
      setDescription("");
    } catch (err) {
      if (err instanceof Error) console.error(err.message);
      setError("Failed to add todo. Please try again later.");
    }
  }

  async function saveEdit(id: string) {
    if (!editedText.trim()) return;

    try {
      setError(null);

      const currentTodo = todos.find((todo) => todo.todo_id === id);

      if (!currentTodo) return;

      if (currentTodo.description === editedText) {
        setEditing(null);
        setEditedText("");
        return; // No changes made
      }

      const response = await fetchGraphQL<UpdateTodoResponse>(graphql.UPDATE_TODO_MUTATION, {
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
      if (err instanceof Error) console.error(err.message);
      setError("Failed to update todo. Please try again later.");
    }
  }

  async function deleteTodo(id: string) {
    try {
      setError(null);
      const response = await fetchGraphQL<DeleteTodoResponse>(graphql.DELETE_TODO_MUTATION, {
        todo_id: id,
      });

      setTodos(todos.filter((todo) => todo.todo_id !== id));
    } catch (err) {
      if (err instanceof Error) console.error(err.message);
      setError("Failed to delete todo. Please try again later.");
    }
  }

  async function toggleComplete(id: string) {
    try {
      setError(null);
      const currentTodo = todos.find((todo) => todo.todo_id === id);

      if (!currentTodo) return;

      const response = await fetchGraphQL<UpdateTodoResponse>(graphql.UPDATE_TODO_MUTATION, {
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
      if (err instanceof Error) console.error(err.message);
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
