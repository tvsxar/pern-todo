interface TodoFormProps {
  description: string;
  setDescription: (text: string) => void;
  handleSubmit: (e: React.FormEvent<HTMLFormElement>) => void;
}

function TodoForm({ description, setDescription, handleSubmit }: TodoFormProps) {
  return (
    <form
          onSubmit={handleSubmit}
          className="flex gap-2 items-center mb-6 shadow-sm border p-2 rounded-lg"
        >
          <input
            className="flex-1 outline-none px-3 py-2 text-gray-700 placeholder-gray-400"
            type="text"
            value={description}
            placeholder="What needs to be done?"
            onChange={(e) => {
              setDescription(e.target.value);
            }}
            required
          />

          <button
            className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-md 
              font-medium cursor-pointer"
          >
            Add task
          </button>
        </form>
  )
}

export default TodoForm
