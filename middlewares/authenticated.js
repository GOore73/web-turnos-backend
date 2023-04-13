import jwt from 'jsonwebtoken';

const asureAuth = (req, res, next) =>{
  
  console.log(req.headers.authorization);

  next();
}

export default {
  asureAuth,
}