import { useState, useEffect } from 'react';
import { MdModeEditOutline, MdOutlineDone } from 'react-icons/md';
import { FaTrash } from 'react-icons/fa';
import { IoClose } from 'react-icons/io5';

function App() {
  const [description, setDescription] = useState('');
  const [todos, setTodos] = useState([]);
  const [editing, setEditing] = useState(null);
  const [editedText, setEditedText] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const API_URL = 'http://localhost:4999/todos';

  useEffect(() => {
    getTodos();
  }, [])

  async function getTodos() {
    try {
      setLoading(true);
      setError(null);
      const response = await fetch(API_URL);
      const data = await response.json();
      setTodos(data);
    } catch (err) {
      console.error(err.message);
      setError('Failed to fetch todos. Please try again later.');
    } finally {
      setLoading(false);
    }
  }

  async function handleSubmit(e) {
    e.preventDefault();
    if (!description.trim()) return;

    try {
      setError(null);
      const response = await fetch(API_URL, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ description, completed: false})
      });
      const data = await response.json();

      setTodos([...todos, data])
      setDescription('');
    } catch (err) {
      console.error(err.message);
      setError('Failed to add todo. Please try again later.');
    }
  }

  async function saveEdit(id) {
    if (!editedText.trim()) return;

    try {
      setError(null);

      const currentTodo = todos.find(todo => todo.todo_id === id);
      if (currentTodo.description === editedText) {
        setEditing(null);
        setEditedText('');
        return; // No changes made
      }
    
      const response = await fetch(`${API_URL}/${id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({description: editedText})
      })

      setTodos(todos.map(todo => todo.todo_id === id ? {...todo, 
        description: editedText, completed: false} : todo));
      setEditing(null);
      setEditedText('');
    } catch (err) {
      console.error(err.message);
      setError('Failed to update todo. Please try again later.');
    }
  }

  async function deleteTodo(id) {
    try {
      setError(null);
      const response = await fetch(`${API_URL}/${id}`, {
        method: 'DELETE'
      });

      setTodos(todos.filter(todo => todo.todo_id !== id));
    } catch (err) {
      console.error(err.message);
      setError('Failed to delete todo. Please try again later.');
    }
  }

  async function toggleComplete(id) {
    try {
      setError(null);
      const todo = todos.find(todo => todo.todo_id === id);
      const response = await fetch(`${API_URL}/${id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          description: todo.description,
          completed: !todo.completed
        })
      })

      setTodos(todos.map(todo => todo.todo_id === id ? {...todo, completed: !todo.completed} : todo));
    } catch (err) {
      console.error(err.message);
      setError('Failed to update todo. Please try again later.');
    }
  }

  return (
    <div className="min-h-screen bg-gray-800 flex items-center justify-center p-4">
      <div className="bg-gray-50 rounded-xl shadow-xl w-full max-w-lg p-8">
        <h1 className="text-4xl font-bold text-gray-800 mb-8">Todo App</h1>

        {error && <p className='text-red-500 mb-4'>{error}</p>}

        <form onSubmit={handleSubmit} className='flex gap-2 items-center mb-6 shadow-sm border p-2 rounded-lg'>
          <input className='flex-1 outline-none px-3 py-2 text-gray-700 placeholder-gray-400' 
          type="text" value={description} placeholder='What needs to be done?'
          onChange={(e) => {setDescription(e.target.value)}} required />

          <button className='bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-md 
          font-medium cursor-pointer'>Add task</button>
        </form>

        <div className="">
          {loading ? (
            <p className='text-gray-600'>Loading tasks...</p>
          ) : todos.length === 0 ? (
            <p className='text-gray-600'>No tasks available</p>
          ) : (
            <ul className='flex flex-col gap-y-4'>
              {todos.map(todo => {
                return (
                  <li key={todo.todo_id}>
                    {editing === todo.todo_id ? (
                      <form className='flex items-center gap-x-3'>
                        <input className='flex-1 p-3 border rounded-lg border-gray-200
                         outline-none focus:ring-2 focus:ring-blue-300 text-gray-700 shadow-inner' 
                         type='text' value={editedText} onChange={e => {setEditedText(e.target.value)}} />

                        <div>
                          <button onClick={() => saveEdit(todo.todo_id)} className='px-4 py-2 bg-green-500 
                          text-white rounded-lg cursor-pointer mr-2 mt-2 hover:bg-green-600 duration-200'><MdOutlineDone /></button>
                          <button onClick={() => setEditing(null)} className='px-4 py-2 bg-gray-500 
                          text-white rounded-lg cursor-pointer mr-2 mt-2 hover:bg-gray-600 duration-200'><IoClose /></button>
                        </div>
                      </form>
                    ) : (
                      <div className='flex items-center justify-between'>
                        <div className='flex items-center gap-x-4 overflow-hidden'>
                          <button onClick={() => {toggleComplete(todo.todo_id)}} 
                          className={`flex-shrink-0 h-6 w-6 border-2 rounded-full flex items-center 
                            justify-center ${todo.completed ? 'bg-green-500 border-green-500 text-white' 
                            : 'border-gray-300 hover:border-blue-400'}`}>
                              {todo.completed && <MdOutlineDone size={16} />}
                          </button>

                          <span>{todo.description}</span>
                        </div>

                        <div className="flex gap-x-2">
                          <button onClick={() => {
                            setEditing(todo.todo_id);
                            setEditedText(todo.description);
                          }} className='p-2 text-blue-500 hover:text-blue-700 
                          rounded-lg hover:bg-blue-50 duration-200 cursor-pointer'><MdModeEditOutline /></button>
                          <button onClick={() => {deleteTodo(todo.todo_id)}} className='p-2 text-red-500 hover:text-red-700 
                          rounded-lg hover:bg-red-50 duration-200 cursor-pointer'><FaTrash /></button>
                        </div>
                      </div>
                    )}
                  </li>
                )
              })}
            </ul>
          )}
        </div>
      </div>
    </div>
  )
}

export default App;
