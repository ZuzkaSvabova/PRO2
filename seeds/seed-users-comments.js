const mongoose = require('mongoose');
const Comment = require('../models/comment');
const User = require('../models/user');

let commentsData = [
  { title: 'Bad workman', text: 'A bad workman always blames his tools.' },
  { title: 'Action', text: 'Action speaks louder than words.' },
  {
    title: 'Diamond',
    text: 'A diamond with a flaw is better than a common stone that is perfect.',
  },
  { title: 'Heart', text: 'A happy heart is better than a full purse.' },
];

mongoose
  .connect('mongodb://127.0.0.1:27017/comments-and-users')
  .catch((error) => console.log(error));

const db = mongoose.connection;
db.once('open', () => {
  console.log('Database connected');
});

const seedDB = async () => {
  //await Comment.insertMany(comments);
  const username = 'testUser';
  const email = 'test@test.com';
  const password = 'testtest';
  const user = new User({ username, email, password });
  const id = user._id;
  for (let c of commentsData) {
    const comment = new Comment(c);
    comment.author = id;
    await comment.save();
  }
};

seedDB()
  .then(() => {
    mongoose.connection.close();
    console.log('Writing to DB successful, DB disconnected');
  })
  .catch((error) => {
    console.log('Error while writing to DB');
  });
