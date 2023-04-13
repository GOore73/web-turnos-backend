
//variables de entorno
import dotenv from 'dotenv';
dotenv.config();

import mongoose from "mongoose"; //BD
import app from './app.js';      //ROUTING

const port = process.env.port || 3977;

const connectDB = async () => {
  try {
    await mongoose.connect(`mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASSWORD}@${process.env.DB_HOST}/`);
    console.log ("la conexión con la base de datos ha sido exitosa");

    // si la BD se conecta, levanto el servidor.
    app.listen(port, ()=> {
      console.log ("##################");
      console.log ("#### API REST ####");
      console.log ("##################");
      console.log (`http://${process.env.IP_SERVER}:${port}/api/${process.env.API_VERSION}`);
    })
    
  } catch (err) {
    console.log("Error al conectar la BD, ", err);
  }
};

connectDB();


