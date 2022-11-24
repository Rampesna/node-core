const express = require('express');
const router = express.Router();
const UserController = require('../app/http/controllers/UserController');
const GetProfileRequest = require("../app/http/requests/UserController/GetProfileRequest");
const AuthenticationMiddleware = require('../app/http/middlewares/AuthenticationMiddleware');

router.get('/getProfile', GetProfileRequest, UserController.getProfile);
router.get('/getProfile2', GetProfileRequest, UserController.getProfile2);

module.exports = router;
