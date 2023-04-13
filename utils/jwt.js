/*
El algoritmo jwt es un estandar. Los datos a codificar constan de:
header (algorithm & token type)
{
  "alg": "HS256",
  "typ": "JWT"
}

PAYLOAD: DATA
{
  "sub":"1234567890"
  "name": "....."
}

VERIFY SIGNATURE donde va el secret key

*/

import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';
dotenv.config();

const createAccessToken = (user)=> {
  const expToken = new Date();
  expToken.setHours(expToken.getHours()+3);

  const payload = {
    token_type: "access",
    user_id: user._id,
    iat: Date.now(),          //fecha de inicio del token
    exp: expToken.getTime(),  //expiración +3hs
  };
  return jwt.sign(payload, process.env.JWT_SECRET_KEY);
}

const createRefreshToken = (user)=>{
  const expToken = new Date();
  expToken.setMonth(expToken.getMonth() + 1); //expira en un mes
  
  const payload = {
    token_type: "refresh",
    user_id: user._id,
    iat: Date.now(),          //fecha de inicio del token
    exp: expToken.getTime(),  //expiración + 1 mes
  };
  return jwt.sign(payload, process.env.JWT_SECRET_KEY);
}

const decoded = (token)=>{
  // verificar que se trate de un token válido
  try {
    return jwt.verify(token,process.env.JWT_SECRET_KEY) 
  } catch (err) {
    // no es un token válido
    return false; 
  }
};

export default {
  createAccessToken,
  createRefreshToken,
  decoded
}