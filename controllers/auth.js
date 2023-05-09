import User from '../models/user.js';
import bcryptjs from 'bcryptjs';
import jwt from '../utils/jwt.js';
import user from '../models/user.js';



const register = async (req, res) => {
  const {
    firstname,
    lastname,
    email,
    password
  } = req.body;

  if (!email) {
    res.status(400).send({ msg: "El email es obligatorio" });
    return;
  }
  if (!password) {
    res.status(400).send({ msg: "La contraseña es obligatoria" });
    return;
  };

  //generación del hash de manera sincrónica. Existe un método asincrónico cuyos ejemplos pueden verse en:
  // https://javascript.hotexamples.com/es/examples/bcryptjs/-/hash/javascript-hash-function-examples.html
  const hashPassword = bcryptjs.hashSync(password, bcryptjs.genSaltSync(10));

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
    res.status(400).send({ msg: `Error al crear el usuario, ${error}` });
  }
};

const login = async (req, res) => {
  const { email, password } = req.body;
  if (!email) res.status(400).send({ msg: "El email es obligatorio" });
  if (!password) res.status(400).send({ msg: "La constraseña es obligatoria" });

  const emailLowerCase = email.toLowerCase();
  console.log("email lcase: ", emailLowerCase);

  //buscar usuario
  try {
    // voy a Atlas y busco usuario por su email
    const userStore = await User.findOne({ email: emailLowerCase }).exec();
    if (!userStore) {
      // no encontró el usuario
      res.status(401).send({ msg: "Usuario no registrado" });
    } else if (!await bcryptjs.compare(password, userStore.password)) {
      // no coincide clave
      res.status(401).send({ msg: "La clave no es correcta" });
    } else if (!userStore.active) {
      // no está activo
      res.status(401).send({ msg: "Usuario no está activo" });
    } else {
      // superó todos los controles
      res.status(200).send({
        msg: "OK",
        access: jwt.createAccessToken(userStore),
        refresh: jwt.createRefreshToken(userStore)
      });
    }
  } catch (error) {
    res.status(500).send({ msg: "error" });
  }
};

const refreshAccessToken = async (req, res) => {
  const { token } = req.body;

  // validar token
  const validToken = jwt.decoded(token);
  if (!validToken) {
    //token no válido
    res.status(401).send({ msg: "Token inválido" });
  } else {
    const userStore = await (User.findOne({ _id: validToken.user_id }).exec())
    if (!userStore) {
      //no existe el usuario
      res.status(401).send({ msg: "Usuario no existe" });
    } else {
      //superó los controles.
      res.status(200).send({
        accessToken: jwt.createAccessToken(userStore)
      })
    };
  };
};

export default {
  register,
  login,
  refreshAccessToken,
};