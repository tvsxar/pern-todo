export const graphql = {
  GET_TODOS_QUERY: `
      query {
        getTodos {
          todo_id
          description
          completed
        }
      }`,

  ADD_TODO_MUTATION: `
      mutation($description: String!) {
        addTodo(description: $description) {
          todo_id
          description
          completed
        }
      }`,

  UPDATE_TODO_MUTATION: `
        mutation($todo_id: Int!, $description: String!, $completed: Boolean!) {
          updateTodo(todo_id: $todo_id, description: $description, completed: $completed) {
            todo_id
            description
            completed
          }
        }`,

  DELETE_TODO_MUTATION: `
        mutation($todo_id: Int!) {
          deleteTodo(todo_id: $todo_id) {
            todo_id
          }
        }`,
};

// Теперь TypeScript знает, что VITE_API_URL это string
const API_URL = import.meta.env.VITE_API_URL;

export default async function fetchGraphQL<T>(query: string, variables = {}) {
  const response = await fetch(API_URL, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ query, variables }),
  });

  const result = await response.json();
  if (result.errors)
    throw new Error(result.errors.map((e: any) => e.message).join(", "));
  return result.data as T;
}
