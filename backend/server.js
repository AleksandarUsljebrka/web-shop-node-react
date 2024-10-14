const express = require('express');
const { connect } = require('./config/db');

require('dotenv').config();

const app = express();

app.use(express.json());

connect();


const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
