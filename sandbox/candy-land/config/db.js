const mongoose = require('mongoose');

const username = 'guilfoyles1'; // username
const password = 'Taggart13!'; // password
const cluster = 'cluster0.dom40'; // cluster
const dbname = 'Messenger'; // database name

const uri = `mongodb+srv://${username}:${password}@${cluster}.mongodb.net/${dbname}?retryWrites=true&w=majority`;

// Connect to MongoDB using Mongoose
mongoose.connect(uri)
  .then(() => {
    console.log('Connected successfully to MongoDB');
  })
  .catch((err) => {
    console.error('Error connecting to MongoDB:', err);
  });

const db = mongoose.connection;

db.on('error', console.error.bind(console, 'connection error: '));
db.once('open', () => {
    console.log('Connection to MongoDB is open');
});

module.exports = { db };
