const mongoose = require('mongoose');

const DB_URI =  `mongodb://localhost:27017/coffe`

module.exports = () => {
    const connect = () => {
        mongoose.connect(
            DB_URI,
            {
                KeepAlive : true,
                useNewUrlParser: true,
                useUnifiedTopology: true
            },
            (err) => {
                if(err){
                    console.log('DB: ERROR !!');
                }else{
                    console.log('Conexion correcta !!');
                }
            }
        )
    }
    connect();
}