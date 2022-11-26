const express = require('express');
const router = express.Router();

const UserController = require('../app/http/controllers/UserController');

const LoginRequest = require("../app/http/requests/UserController/LoginRequest");
const GetProfileRequest = require("../app/http/requests/UserController/GetProfileRequest");
const GetAllRequest = require("../app/http/requests/UserController/GetAllRequest");
const GetByIdRequest = require("../app/http/requests/UserController/GetByIdRequest");
const DeleteRequest = require("../app/http/requests/UserController/DeleteRequest");

const CoreRequestMiddleware = require('../app/http/middlewares/CoreRequestMiddleware');
const AuthenticationMiddleware = require('../app/http/middlewares/AuthenticationMiddleware');

router.use(CoreRequestMiddleware);
router.post('/login', LoginRequest, UserController.login);

router.use(AuthenticationMiddleware);
router.get('/getProfile', GetProfileRequest, UserController.getProfile);
router.get('/getAll', GetAllRequest, UserController.getAll);
router.get('/getById', GetByIdRequest, UserController.getById);
router.get('/delete', DeleteRequest, UserController.delete);

module.exports = router;
