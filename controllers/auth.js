import User from '../models/user.js';
import bcryptjs from 'bcryptjs';

const register = async (req,res)=>{
  const { 
    firstname,
    lastname,
    email,
    password
  } = req.body;

  if (!email) {
    res.status(400).send({msg: "El email es obligatorio"});
    return;
  }
  if (!password) {
    res.status(400).send({msg: "La contraseña es obligatoria"});
    return;
  };
  
  //generación del hash de manera sincrónica. Existe un método asincrónico cuyos ejemplos pueden verse en:
  // https://javascript.hotexamples.com/es/examples/bcryptjs/-/hash/javascript-hash-function-examples.html
  const hashPassword = bcryptjs.hashSync(password,bcryptjs.genSaltSync(10));

  const user = new User({
    firstname, 
    lastname,
    email: email.toLowerCase(),
    password: hashPassword,
    role: "cliente",
    active: false
  });

  try {
    await user.save(); 
    res.status(200).send(user);
  } catch (error) {
    res.status(400).send({msg: `Error al crear el usuario, ${error}`});
  } 
}

export default {register};