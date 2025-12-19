import TodoItem from "./TodoItem.js";
import type { Todo } from '../types/types.js';

interface TodoListProps {
  todos: Todo[]
}

function TodoList({ todos }: TodoListProps) {
  return (
    <ul className="flex flex-col gap-y-4">
      {todos.map((todo) => {
        return (
          <TodoItem
            key={todo.todo_id}
            todo={todo}
          />
        );
      })}
    </ul>
  );
}

export default TodoList;
