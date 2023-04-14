import user from '../models/user.js';

const getMe = async (req, res) => {
  //los datos del usuario vienen en el payload que devuelve el middleware, puntualmente el dato del id del usuario, se llama user_id
  const { user_id } = req.user;
  try {
    const userDoc = await user.findById(user_id).exec();
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
      usersDoc = await user.find().exec();
    } else {
      usersDoc = await user.find({active}).exec();
    }
    
    res.status(200).send(usersDoc);
  } catch (error) {
    res.status(400).send({msg: "Error en servidor de la BD"});
  }
}

export default {
  getMe,
  getUsers,
};