'use strict';

const express = require('express');
const router = express.Router();

const { login, register } = require('../../controllers/auth_controller');

router.post('/login', login).post('/register', register);
