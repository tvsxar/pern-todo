import TodoItem from "./TodoItem";

function TodoList({ todos }) {
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
