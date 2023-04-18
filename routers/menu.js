import express from 'express';
import menuController from '../controllers/menu.js';
import md_auth from '../middlewares/authenticated.js';


const api = express.Router();

api.post('/menu', md_auth.asureAuth, menuController.createMenu);
api.get('/menus', menuController.getMenus); //todos los usuarios obtienen los menus no tiene control de authorization/token


export default api;