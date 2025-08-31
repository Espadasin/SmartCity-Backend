const express = require('express');
const chatDB = require('./models/chat.js');
const app = express();

const generalRoute = require('./routes/general.js')
app.use('/', generalRoute);

const authRoute = require('./routes/auth.js')
app.use('/auth', authRoute);

app.listen(8084, ()=>{
    console.log('Server is online on http://localhost:8084');
});