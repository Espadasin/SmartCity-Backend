const express = require('express');
const route = express.Router();
const cors = require('cors');
const bodyParser = require('body-parser');
const cookieSession = require('cookie-session');

const location = require('../models/location.js');

route.use(cors())
route.use(bodyParser.urlencoded({extended : false}));
route.use(bodyParser.json());
route.use(cookieSession({
    name: 'session',
    keys: ['lama'],
    maxAge: 24 * 60 * 60 * 1000 // 24 hours
}));

//Routes

route.delete('/deleteComment/:id', async(req, res) => {
    await location.destroy({where: {id: req.params.id}}).then(() => {
        res.json({success: true});
    }).catch((error) => {console.log(error)});
});

route.put('/solveComment/:id', async(req, res) => {
    await location.update({solved: true}, {where: {id: req.params.id}}).then(() => {
        res.json({success: true});
    }).catch((error) => {console.log(error)});  
});

//

module.exports = route;
