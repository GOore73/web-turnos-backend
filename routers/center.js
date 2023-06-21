import express from "express";
import centerController from '../controllers/center.js';
import connectMultiParty from 'connect-multiparty';
import md_auth from '../middlewares/authenticated.js'

const md_uploadAvatar = connectMultiParty({ uploadDir: "./uploads/avatar" });

const api = express.Router();

api.get('/centers', [md_auth.asureAuth], centerController.getCenters);
api.post('/center', [md_auth.asureAuth, md_uploadAvatar], centerController.createCenter);
api.patch('/center/:id', [md_auth.asureAuth, md_uploadAvatar], centerController.updateCenter);
api.delete('/center/:id', [md_auth.asureAuth], centerController.deleteCenter);


export default api;