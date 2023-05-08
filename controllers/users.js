import User from '../models/user.js';
import bcrypt from 'bcryptjs';
import image from '../utils/images.js';

const getMe = async (req, res) => {
  //los datos del usuario vienen en el payload que devuelve el middleware, puntualmente el dato del id del usuario, se llama user_id
  const { user_id } = req.user;
  try {
    const userDoc = await User.findById(user_id).exec();
    if (!userDoc) {
      //El usuario no existe
      res.status(401).send({msg: "El usuario no existe"});
    } else {
      // usuario OK, devuelvo el documento completo del usuario
      res.status(200).send(userDoc);
    }
    
  } catch (error) {
    res.status(400).send({msg: "Error en servidor de la BD"});
  }
}

const getUsers = async (req, res) => {
  const {active} = req.query; //en query vienen los parámetros, ej. /users?active=true
  let usersDoc = null;
  try {
    if(active===undefined) {
      //sin parámetro, todos los usuarios.
      usersDoc = await User.find().exec();
    } else {
      //recuperar los usuarios activos o no activos, según valor que venga en active
      usersDoc = await User.find({active}).exec();
    }
    
    res.status(200).send(usersDoc);
  } catch (error) {
    res.status(400).send({msg: "Error en servidor de la BD"});
  }
}

const createUser = async (req, res) => {
  const {password} = req.body;
  const hashPassword = bcrypt.hashSync(password, bcrypt.genSaltSync(10));

  const user =  new User({
    ...req.body,  //spread
    active: false,
    password: hashPassword,
  });

  if(req.files.avatar) {
    //llega el file
    user.avatar = image.getFilePath (req.files.avatar);
  }

  try {
    await user.save();
    res.status(201).send({msg: "Ok"});
  } catch (error) {
    res.status(400).send({msg: `Error al crear el usuario, ${error}`});
    //ToDo: borrar el file de avatar si es que vino.
  }
};

const updateUser = async (req, res) => {
  const {id} = req.params; //params es lo que vendrá en ? en la url
  const userData = req.body;
  //Actualización de la contraseña
  if(userData.password) {  // envió contraseña en el patch
    userData.password = bcrypt.hashSync(password, bcrypt.genSaltSync(10));
  }
  //Actualización del avatar
  if(req.files.avatar) {   // envió avatar
    userData.avatar = image.getFilePath (req.files.avatar);
  }
  try {
    await User.findByIdAndUpdate(id, userData);
    res.status(200).send({msg: "Actualización correcta"});
  } catch (error) {
    res.status(400).send({msg: `Error al actualizar el usuario, ${error}`});
  }
};

const deleteUser = async (req, res) => {
  const {id} = req.params;
  try {
    await User.findByIdAndDelete(id);
    res.status(200).send({msg: "Usuario eliminado"});
  } catch (error) {
    res.status(400).send({msg: `Error al intentar eliminar, ${error}`});
  }
};

export default {
  getMe,
  getUsers,
  createUser,
  updateUser,
  deleteUser,
};