const express = require('express');
const cors = require('cors');
const { createHandler } = require('graphql-http/lib/use/express');
const todoSchema = require('./schema/todoSchema');

const app = express();
const port = 4999;

app.use(cors());
app.use(express.json());
app.use('/graphql', createHandler({ schema: todoSchema, graphiql: true }));


app.listen(port, () => {
    console.log(`Server is running at http://localhost:${port}/graphql`);
})