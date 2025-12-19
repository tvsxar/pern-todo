const {
  GraphQLObjectType,
  GraphQLSchema,
  GraphQLInt,
  GraphQLString,
  GraphQLBoolean,
  GraphQLList,
  GraphQLNonNull,
} = require("graphql");

const { Query, Mutations } = require("../resolvers/todoResolvers");

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
      resolve: Query.getTodos
    }
  }
});

const Mutation = new GraphQLObjectType({
  name: 'Mutation',
  fields: {
    addTodo: {
      type: todoType,
      args: { description: { type: new GraphQLNonNull(GraphQLString) } },
      resolve: Mutations.addTodo
    },
    updateTodo: {
      type: todoType,
      args: {
        todo_id: { type: new GraphQLNonNull(GraphQLInt) },
        description: { type: new GraphQLNonNull(GraphQLString) },
        completed: { type: new GraphQLNonNull(GraphQLBoolean) }
      },
      resolve: Mutations.updateTodo
    },
    deleteTodo: {
      type: todoType,
      args: { todo_id: { type: new GraphQLNonNull(GraphQLInt) } },
      resolve: Mutations.deleteTodo
    }
  }
});

module.exports = new GraphQLSchema({
  query: RootQuery,
  mutation: Mutation,
});
