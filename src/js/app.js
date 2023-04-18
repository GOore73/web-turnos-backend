//Variables de entorno
import dotenv from 'dotenv';
dotenv.config();
import morgan from 'morgan';     //TRAZADOR MORGAN
import express from 'express';
import cors from 'cors';


const app = express();


// import routes
import authRoutes from '../../routers/auth.js';
import userRoutes from '../../routers/user.js';
import menuRoutes from '../../routers/menu.js';


// Configure Body Parse
app.use(express.json());    // para decodificar JSON     

// Configure morgan tracer
app.use(morgan('dev'));          //INICIAR TRAZADOR MORGAN

// Configure static folders
app.use(express.static('uploads'));


// Configure Header HTTP - CORS
app.use(cors());


// Configure routings
app.use(`/api/${process.env.API_VERSION}`, authRoutes);
app.use(`/api/${process.env.API_VERSION}`, userRoutes);
app.use(`/api/${process.env.API_VERSION}`, menuRoutes);

export default app; 

