const mongoose = require('mongoose');
const Comment = require('../models/comment');

let comments = [
  { username: 'Todd', text: 'It is so funny' },
  { username: 'Skyler', text: 'I like my dog' },
  { username: 'Sk8er', text: 'Delete your account, Skyler' },
  { username: 'Wolf', text: 'baf baf baf' },
];

mongoose
  .connect('mongodb://127.0.0.1:27017/comments')
  .catch((error) => console.log(error));

const db = mongoose.connection;
db.once('open', () => {
  console.log('Database connected');
});

const seedDB = async () => {
  await Comment.insertMany(comments);
};

seedDB()
  .then(() => {
    mongoose.connection.close();
    console.log('Writing to DB successful, DB disconnected');
  })
  .catch((error) => {
    console.log(error)
    console.log('Error while writing to DB');
  });
