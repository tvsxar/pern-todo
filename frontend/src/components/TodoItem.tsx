import { MdModeEditOutline, MdOutlineDone } from "react-icons/md";
import { FaTrash } from "react-icons/fa";
import EditTodoForm from "./EditTodoForm.js";
import { useContext } from "react";
import { TodoContext } from "../context/TodoContext.js";
import type { Todo } from '../types/types.js';

interface TodoItemProps {
  todo: Todo
}

function TodoItem({ todo }: TodoItemProps) {
  const {
    editedText,
    setEditedText,
    setEditing,
    saveEdit,
    deleteTodo,
    toggleComplete,
    editing
  } = useContext(TodoContext);

  return (
    <li>
      {editing === todo.todo_id ? (
        <EditTodoForm
          editedText={editedText}
          setEditedText={setEditedText}
          setEditing={setEditing}
          saveEdit={saveEdit}
          todo={todo}
        />
      ) : (
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-x-4 overflow-hidden">
            <button
              onClick={() => {
                toggleComplete(todo.todo_id);
              }}
              className={`flex-shrink-0 h-6 w-6 border-2 rounded-full flex items-center 
                                justify-center ${
                                  todo.completed
                                    ? "bg-green-500 border-green-500 text-white"
                                    : "border-gray-300 hover:border-blue-400"
                                }`}
            >
              {todo.completed && <MdOutlineDone size={16} />}
            </button>

            <span>{todo.description}</span>
          </div>

          <div className="flex gap-x-2">
            <button
              onClick={() => {
                setEditing(todo.todo_id);
                setEditedText(todo.description);
              }}
              className="p-2 text-blue-500 hover:text-blue-700 
                              rounded-lg hover:bg-blue-50 duration-200 cursor-pointer"
            >
              <MdModeEditOutline />
            </button>
            <button
              onClick={() => {
                deleteTodo(todo.todo_id);
              }}
              className="p-2 text-red-500 hover:text-red-700 
                              rounded-lg hover:bg-red-50 duration-200 cursor-pointer"
            >
              <FaTrash />
            </button>
          </div>
        </div>
      )}
    </li>
  );
}

export default TodoItem;
