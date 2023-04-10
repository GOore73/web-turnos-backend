import express from 'express';
import authController from '../controllers/auth.js';

const api = express.Router();

api.post('/auth/register', authController.register);

export default api; 