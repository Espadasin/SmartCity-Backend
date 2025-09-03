const express = require('express');
const route = express.Router();
const cors = require('cors');
const JWT = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const bodyParser = require('body-parser');
const session = require('express-session')
const cookieSession = require('cookie-session');
const userDB = require('../models/user.js');

require('dotenv').config();

// Get Users Model

const users = require('../models/user.js');
const { verifyAutentication } = require('../middlewares/authControllers.js');

//

// Default Configs
route.use(cors());
route.use(bodyParser.urlencoded({extended : false}));
route.use(bodyParser.json());
route.use(cookieSession({
    name: 'session',
    keys: [process.env.COOKIE_SECRET],
    maxAge: 24 * 60 * 60 * 1000 // 24 hours
}));

//

route.post('/register', async(req, res) => {
    const {nickname, email, password} = req.body;
    if (!email || !password) {
        return res.json({errors: ['Email e senha são obrigatórios']});
    }

    if (!nickname) {
        return res.json({errors: ['Nome é obrigatório']});
    }

    if(password.length < 8){
        return res.json({errors: ['Senha deve ter no mínimo 8 caracteres']});
    }

    try{
        const verifyExistingUser = await users.findOne({where: {email}});
        if(verifyExistingUser){
            return res.json({errors: ['Email já cadastrado']});
        }

        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);

        await users.create({
            nickname: nickname,
            email: email,
            password: hashedPassword
        });

    }catch(e){
        console.error(e);
        res.status(500).json({message: 'Internal server error'});
    };
})

route.post('/login', async(req, res) => {

    const {email, password} = req.body;

    if (!email || !password) {
        console.log('Missing email or password');
        return res.json({errors: ['Email e senha são obrigatórios']});
    }

    const user = await users.findOne({where: {email}});
    if (!user) {
        return res.json({errors: ['Usuário não encontrado']});
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if(!isMatch){
        return res.json({errors: ['Senha inválida']});
    }

    const token = JWT.sign({id: user.id}, process.env.JWT_SECRET, {expiresIn: '1h'});

    return res.json(token);
});

route.post('/google-auth', async(req, res) => {
    console.log('Test')
})

route.get('/isUserAuth', verifyAutentication, (req, res) => {
    console.log('User is authenticated')
})


module.exports = route;