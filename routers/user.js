import express from "express";
import userController from '../controllers/users.js';
import md_auth from '../middlewares/authenticated.js'

const api = express.Router();

api.get('/user/me', [md_auth.asureAuth], userController.getMe);
api.get('/users', [md_auth.asureAuth], userController.getUsers);

export default api;

