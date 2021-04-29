const express = require('express');
const connectDB = require("./startup/db");
const app = express();
const collection = require('./routes/collections');
const card = require('./routes/cards');

connectDB();

app.use(express.json());
app.use('/api/collections', collection);
app.use('/api/cards', card);

const port = process.env.PORT || 5000;
app.listen(port, () => {
    console.log((`Server started on port: ${port}`))
})