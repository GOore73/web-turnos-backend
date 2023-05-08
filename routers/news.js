import express from 'express';
import newsletter from '../controllers/news.js';
import md_auth from '../middlewares/authenticated.js';

const api = express.Router();

api.post('/newsletter', newsletter.suscribeEmail); //cualquier persona se puede suscribir
api.get('/newsletters', md_auth.asureAuth,newsletter.getEmails); //solo los administradores pueden obtener y eliminar

//no se puede -no tiene sentido- eliminar.
// no irá un api.patch..

api.delete('/newsletter/:id', [md_auth.asureAuth], newsletter.deleteEmail);


export default api;