const express = require('express');
const app = express();
const router = express.Router();
//const bcrypt = require('bcrypt');
const User = require('../modelsDB/userSchemaDB');
const { checkToken } = require('../middlewares/auth');
const { hash } = require('bcrypt');
const jwt = require('jsonwebtoken')
const configJWT = require('../config/configJWT')

app.set('llave', configJWT.llave);

router.get('/ObtenerUnico/:id', async(req,res) => {

    let id = req.params.id

    await User.findById(id, {})
        .populate('name', 'email')
        .exec((err, user) => {

            if(err){
                return res.status(400).json({ok:false, err})
            }

            if(!user){
                return res.json({ok:false, message:'user does not exist'})
            }

            res.json({ok:true, user})
        })
})

router.get('/users', async(req,res) => {

    let desde = req.query.desde || 0;
    desde = Number(desde);
    let limite = req.query.limite || 5;
    limite = Number(limite);

    User.find({}, 'name email')
        .skip(desde)
        .limit(limite)
        .exec((err,user) => {
            if(err){
                return res.status(400).json({ok:false, err})
            }

            User.count({}, (err,conteo) => {
                res.json({ok:true, user, quantity:conteo})
            })
        })
});

router.post('/crearUser', async(req,res) => {
    let body = req.body;

    const user = new User({
        name    :body.name,
        email   :body.email,
        password:body.password
    })

    await user.save((err, userStored) => {
        if(err){
            return res.status(400).json({ok:false, err})
        }else if(userStored){
            return res.status(200).json({ok:true, user: userStored})
        }
    })
})

app.post('/auth', (req, res) => {
    if(req.body.usuario === "dan" && req.body.contrasena === "admin") {
  const payload = {
   check:  true
  };
  const token = jwt.sign(payload, app.get('llave'), {
   expiresIn: 1440
  });
  res.json({
   mensaje: 'Autenticación correcta',
   token: token
  });
    } else {
        res.json({ mensaje: "Usuario o contraseña incorrectos"})
    }
})

module.exports = router;