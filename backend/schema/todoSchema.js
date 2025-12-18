const {
  GraphQLObjectType,
  GraphQLSchema,
  GraphQLInt,
  GraphQLString,
  GraphQLBoolean,
  GraphQLList,
  GraphQLNonNull,
} = require("graphql");
const todoResolvers = require("../resolvers/todoResolvers");

const todoType = new GraphQLObjectType({
  name: "Todo",
  fields: () => ({
    todo_id: { type: new GraphQLNonNull(GraphQLInt) },
    description: { type: new GraphQLNonNull(GraphQLString) },
    completed: { type: GraphQLBoolean },
  }),
});

const RootQuery = new GraphQLObjectType({
  name: 'RootQueryType',
  fields: {
    getTodos: {
      type: new GraphQLList(todoType),
      resolve: todoResolvers.Query.getTodos
    }
  }
});

const Mutation = new GraphQLObjectType({
  name: 'Mutation',
  fields: {
    addTodo: {
      type: todoType,
      args: { description: { type: new GraphQLNonNull(GraphQLString) } },
      resolve: todoResolvers.Mutation.addTodo
    },
    updateTodo: {
      type: todoType,
      args: {
        todo_id: { type: new GraphQLNonNull(GraphQLInt) },
        description: { type: new GraphQLNonNull(GraphQLString) },
        completed: { type: new GraphQLNonNull(GraphQLBoolean) }
      },
      resolve: todoResolvers.Mutation.updateTodo
    },
    deleteTodo: {
      type: todoType,
      args: { todo_id: { type: new GraphQLNonNull(GraphQLInt) } },
      resolve: todoResolvers.Mutation.deleteTodo
    }
  }
});

const todoSchema = new GraphQLSchema({
  query: RootQuery,
  mutation: Mutation,
});

module.exports = todoSchema;
