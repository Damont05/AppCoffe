const express = require('express');
const app = express();


app.use('/coffe', require('./users'));



module.exports = app;