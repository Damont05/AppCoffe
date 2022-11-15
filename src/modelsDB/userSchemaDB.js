const mongoose = require('mongoose');
const Schema = mongoose.Schema;


const UserSchema = new Schema(
    {
        name:{type: String},
        email:{type:String, unique:true, required:true},
        password:{type:String},
       //avatar:{type: String, default: 'http://image.com'} // Se puede agg una imagen en un archivo estatico y ppner la ruta aca¨
    }
)

module.exports = mongoose.model('User', UserSchema);