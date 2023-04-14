import jwt from '../utils/jwt.js';

const asureAuth = (req, res, next) =>{
  if (!req.headers.authorization) {
    //el token no viene
    return res.status(403).send({msg: "La petición no tiene cabecera de autenticación"});
  }
  //quito la palabra "Bearer " que viene en el valor de authorization antes que el token
  const token = req.headers.authorization.replace("Bearer ","");
  
  //validar token y devolver payload
  const payload = jwt.decoded(token);
  if(!payload) {
    //token invalido
    return res.status(400).send({msg: "Token inválido"});
  } else {
    // verificar que esté vigente en plazo
    const currentTime = new Date().getTime();  //fecha y hora actuales
    if(payload.exp >= currentTime) {
      req.user = payload; // envío el record del usuario completo al req
      next()
    } else {
      return res.status(400).send({msg: "Token ha expirado"});
    }

  }
}

export default {
  asureAuth,
}