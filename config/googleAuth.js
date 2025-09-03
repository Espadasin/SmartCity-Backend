const LocalStrategy = require('passport-local').Strategy;
const bcrypt = require('bcrypt');

const users = require('../models/user.js');

