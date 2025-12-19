import { IoClose } from "react-icons/io5";
import { MdOutlineDone } from "react-icons/md";

function EditTodoForm({
  editedText,
  setEditedText,
  setEditing,
  saveEdit,
  todo,
}) {
  return (
    <form
      onSubmit={(e) => {
        e.preventDefault();
        saveEdit(todo.todo_id);
      }}
      className="flex items-center gap-x-3"
    >
      <input
        className="flex-1 p-3 border rounded-lg border-gray-200
                                 outline-none focus:ring-2 focus:ring-blue-300 text-gray-700 shadow-inner"
        type="text"
        value={editedText}
        onChange={(e) => {
          setEditedText(e.target.value);
        }}
      />

      <div>
        <button
          type="submit"
          className="px-4 py-2 bg-green-500 
                                  text-white rounded-lg cursor-pointer mr-2 mt-2 hover:bg-green-600 duration-200"
        >
          <MdOutlineDone />
        </button>
        <button
          onClick={() => setEditing(null)}
          className="px-4 py-2 bg-gray-500 
                                  text-white rounded-lg cursor-pointer mr-2 mt-2 hover:bg-gray-600 duration-200"
        >
          <IoClose />
        </button>
      </div>
    </form>
  );
}

export default EditTodoForm;
