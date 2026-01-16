const express = require('express');
const mongoose = require('mongoose');
require('dotenv').config();

const app = express();

app.use(express.json());

mongoose
  .connect(process.env.mongourl)
  .then(() => {
    console.log('MongoDB connected successfully');
  })
  .catch((err) => {
    console.error('DB connection error:', err);
  });

app.use('/lib', require('./routes/librarianRoute'));
app.use('/user', require('./routes/userRoute'));
app.use('/book', require('./routes/bookRoute'));
app.use('/tran', require('./routes/transactionRoute'))

app.get('/', (req, res) => {
  res.send('Library Management System API Running');
});

app.listen(3000, () => {
  console.log(`Server running...`);
});
