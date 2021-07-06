import express from 'express';
import dotenv from 'dotenv';
import colors from 'colors';
// import asyncHandler from 'express-async-handler';
import User from './models/UserSchema.js';

import connectDB from './config/db.js';

dotenv.config();
connectDB();
const app = express();

app.get('/', (req, res) => {
  res.send('API IS RUNNING');
});

app.get('/users', (req, res) => {
  const searchedField = req.query.name;
  User.find({ name: { $regex: searchedField, $options: 'i' } }).then((data) => {
    res.send(data);
  });
});

// User.find({}, function (err, users) {
//   if (err) {
//     console.log(err);
//   } else {
//     console.log(users);
//   }
// });
const PORT = process.env.PORT || 5000;

app.listen(
  PORT,
  console.log(`Server is running on the PORT ${PORT}`.blue.bold.bgBlack)
);
