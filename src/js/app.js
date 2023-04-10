import express from 'express';
import constants from './constants.js';
import cors from 'cors';


const { API_VERSION } = constants;

const app = express();

// import routings
import authRoutes from '../../routers/auth.js';


// Configure Body Parse
app.use(express.json());

// Configure static folders
app.use(express.static('uploads'));


// Configure Header HTTP - CORS
app.use(cors());


// Configure routings
app.use(`/api/${API_VERSION}`, authRoutes);

export default app; 

