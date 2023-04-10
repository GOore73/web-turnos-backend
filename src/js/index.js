import mongoose from "mongoose";
import constants from "./constants.js";
import app from './app.js';
const {
  DB_USER,
  DB_PASSWORD,
  DB_HOST,
  IP_SERVER,
  API_VERSION
} = constants;

const port = process.env.port || 3977;

const connectDB = async () => {
  try {
    await mongoose.connect(`mongodb+srv://${DB_USER}:${DB_PASSWORD}@${DB_HOST}/`);
    console.log ("la conexión con la base de datos ha sido exitosa");

    // si la BD se conecta, levanto el servidor.
    app.listen(port, ()=> {
      console.log ("##################");
      console.log ("#### API REST ####");
      console.log ("##################");
      console.log (`http://${IP_SERVER}:${port}/api/${API_VERSION}`);
    })
    
  } catch (err) {
    console.log("Error al conectar la BD, ", err);
  }
};



connectDB();


