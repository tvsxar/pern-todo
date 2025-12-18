const pool = require("../config/db");

const todoResolvers = {
  Query: {
    getTodos: async () => {
      const allTodos = await pool.query("SELECT * FROM todo");
      return allTodos.rows;
    },
  },

  Mutation: {
    addTodo: async (_, { description }) => {
      const newTodo = await pool.query(
        "INSERT INTO todo (description, completed) VALUES ($1, $2) RETURNING *",
        [description, false]
      );
      return newTodo.rows[0];
    },

    updateTodo: async (_, { todo_id, description, completed }) => {
      const updatedTodo = await pool.query(
        "UPDATE todo SET description = $1, completed = $2 WHERE todo_id = $3 RETURNING *",
        [description, completed, todo_id]
      );
      return updatedTodo.rows[0];
    },

    deleteTodo: async (_, { todo_id }) => {
      const deletedTodo = await pool.query(
        "DELETE FROM todo WHERE todo_id = $1 RETURNING *",
        [todo_id]
      );
      return deletedTodo.rows[0];
    },
  },
};

module.exports = todoResolvers;
