export interface Todo {
    todo_id: string,
    description: string,
    completed: boolean
}

export interface TodoContextType {
  todos: Todo[];
  editing: string | null;
  loading: boolean;
  error: string | null;
  description: string
  editedText: string;
  setEditing: (id: string | null) => void;
  setEditedText: (text: string) => void;
  handleSubmit: (e: React.FormEvent<HTMLFormElement>) => void;
  saveEdit: (id: string) => void;
  deleteTodo: (id: string) => void;
  toggleComplete: (id: string) => void;
  setDescription: (text: string) => void;
}

export interface GetTodosResponse {
  getTodos: Todo[];
}

export interface AddTodoResponse {
  addTodo: Todo;
}

export interface UpdateTodoResponse {
  updateTodo: Todo;
}

export interface DeleteTodoResponse {
  deleteTodo: { todo_id: string };
}