const express = require('express');
const connectDB = require("./startup/db");
const app = express();
const collection = require('./routes/collections');

connectDB();

app.use(express.json());
app.use('/api/collections', collection);

const port = process.env.PORT || 5000;
app.listen(port, () => {
    console.log((`Server started on port: ${port}`))
})