const express = require('express');
const route = express.Router();
const cors = require('cors');
const bodyParser = require('body-parser');
const cookieSession = require('cookie-session');
const verifyAutentication = require('../middlewares/authControllers.js').verifyAutentication;

//Get Chat Model

const location = require('../models/location.js');
const users = require('../models/user.js');

//

route.use(cors())
route.use(bodyParser.urlencoded({extended : false}));
route.use(bodyParser.json());
route.use(cookieSession({
    name: 'session',
    keys: ['lama'],
    maxAge: 24 * 60 * 60 * 1000 // 24 hours
}));

//Routes
route.get('/getComments', async (req, res)=>{
    await location.findAll().then((itens) => {
        res.json(itens);
    }).catch((error) => {console.log(error)});
});

route.get('/getUser/:id', async (req, res)=>{
    await users.findOne({where : {id : req.params.id}}).then((item) => {
        res.json(item);
    }).catch((error) => {console.log(error)});
})

route.post('/postComment', async(req, res)=>{

    if(!req.body.commentary){
        return res.json({errors: ['Faça um comentario.']});
    }

    await location.create({
        commentary : req.body.commentary,
        latitude : req.body.latitude,
        longitude : req.body.longitude,
        type : req.body.type
    }).then(res.status(201).json({success: true})).catch((e) => {console.log(e)});
});

route.delete('/deleteComment/:id', verifyAutentication, async(req, res) => {
    await location.destroy({where: {id: req.params.id}}).then(() => {
        res.json({success: true});
    }).catch((error) => {console.log(error)});
});

route.put('/solveComment/:id', verifyAutentication, async(req, res) => {
    await location.update({solved: true}, {where: {id: req.params.id}}).then(() => {
        res.json({success: true});
    }).catch((error) => {console.log(error)});  
});

module.exports = route;