const express = require('express');
const mongoose = require('mongoose');

const app = express();
const port = process.env.PORT || 3001;

const uname = "guilfoyles1"
const pword = "Taggart13!"
const cluster = "Cluster0.dom40"
const dbname = "Messenger"; // defaults to "test" if left blank

const uri = `mongodb+srv://${uname}:${pword}@${cluster}.mongodb.net/${dbname}?retryWrites=true&w=majority`;

// const mongoose_settings = {useNewUrlParser: true, useUnifiedTopology: true};

mongoose.connect(uri);
const db = mongoose.connection;

db.on("error", console.error.bind(console, "connection error: "));
db.once("open", () => {
    console.log("Connected successfully to MongoDB");
    app.listen(port, () => {
        console.log(`Example app listening on port ${port}`);
    });
});
