const express = require('express'); //require
const port = require('../src/config/config');
const initDB = require('./database')
const app = express();
const morgan = require('morgan');

app.use(morgan('dev'));
//Middlewares
app.use(express.json());

//Global route
app.use(require('./routes/index-route')); 


//Listening
async function main(){
    await app.listen(process.env.PORT);
    console.log(`Server is running ${process.env.PORT}`);
}

main();
initDB();