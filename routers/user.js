import express from "express";
import userController from '../controllers/users.js';
import connectMultiParty from 'connect-multiparty';
import md_auth from '../middlewares/authenticated.js'

const md_uploadAvatar = connectMultiParty({uploadDir: "./uploads/avatar"});

const api = express.Router();

api.get('/user/me', [md_auth.asureAuth], userController.getMe);
api.get('/users', [md_auth.asureAuth], userController.getUsers);
api.post('/user', [md_auth.asureAuth, md_uploadAvatar], userController.createUser);
api.patch('/user/:id', [md_auth.asureAuth, md_uploadAvatar], userController.updateUser);
api.delete('/user/:id',[md_auth.asureAuth], userController.deleteUser);


export default api;

