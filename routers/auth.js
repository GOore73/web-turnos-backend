import express from 'express';
import authController from '../controllers/auth.js';

const api = express.Router();

api.post('/auth/register', authController.register);
api.post('/auth/login', authController.login);
api.post('/auth/refresh_access_token', authController.refreshAccessToken);


export default api; 