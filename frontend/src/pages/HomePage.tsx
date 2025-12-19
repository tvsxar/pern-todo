import TodoForm from "../components/TodoForm.jsx";
import TodoList from "../components/TodoList.js";
import { useContext } from "react";
import { TodoContext } from "../context/TodoContext.jsx";
import type { TodoContextType } from '../types/types.js';

function HomePage() {
  const { description, setDescription, error, handleSubmit, todos, loading } =
    useContext(TodoContext);

  return (
    <div className="min-h-screen bg-gray-800 flex items-center justify-center p-4">
      <div className="bg-gray-50 rounded-xl shadow-xl w-full max-w-lg p-8">
        <h1 className="text-4xl font-bold text-gray-800 mb-8">Todo App</h1>

        {error && <p className="text-red-500 mb-4">{error}</p>}

        <TodoForm
          description={description}
          setDescription={setDescription}
          handleSubmit={handleSubmit}
        />

        <div>
          {loading ? (
            <p className="text-gray-600">Loading tasks...</p>
          ) : todos.length === 0 ? (
            <p className="text-gray-600">No tasks available</p>
          ) : (
            <TodoList todos={todos} />
          )}
        </div>
      </div>
    </div>
  );
}

export default HomePage;
