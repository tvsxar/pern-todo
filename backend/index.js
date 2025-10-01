const express = require('express');
const cors = require('cors');
const todoRoutes = require('./routes/todos');

const app = express();
const port = 4999;

app.use(cors());
app.use(express.json());
app.use('/todos', todoRoutes);

app.listen(port, () => {
    console.log(`Server is running at http://localhost:${port}`);
})