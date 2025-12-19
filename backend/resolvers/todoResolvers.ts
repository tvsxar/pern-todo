const pool = require("../config/db");

const todoResolvers = {
  Query: {
    getTodos: async () => {
      try {
        const allTodos = await pool.query("SELECT * FROM todo");
        return allTodos.rows;
      } catch (err) {
        if (err instanceof Error) console.error(err.message);
        throw err;
      }
    },
  },

  Mutations: {
    addTodo: async (_: any, { description }: { description: string }) => {
      try {
        const newTodo = await pool.query(
          "INSERT INTO todo (description, completed) VALUES ($1, $2) RETURNING *",
          [description, false]
        );
        return newTodo.rows[0];
      } catch (err) {
        if (err instanceof Error) console.error(err.message);
        throw err;
      }
    },

    updateTodo: async (
      _: any,
      {
        todo_id,
        description,
        completed,
      }: { todo_id: string; description: string; completed: boolean }
    ) => {
      try {
        const updatedTodo = await pool.query(
          "UPDATE todo SET description = $1, completed = $2 WHERE todo_id = $3 RETURNING *",
          [description, completed, todo_id]
        );
        return updatedTodo.rows[0];
      } catch (err) {
        console.error(err);
        throw err;
      }
    },

    deleteTodo: async (_: any, { todo_id }: { todo_id: string }) => {
      try {
        const deletedTodo = await pool.query(
          "DELETE FROM todo WHERE todo_id = $1 RETURNING *",
          [todo_id]
        );
        return deletedTodo.rows[0];
      } catch (err) {
        console.error(err);
        throw err;
      }
    },
  },
};

module.exports = todoResolvers;
