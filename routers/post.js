import express from 'express';
import postController from '../controllers/post.js';
import md_auth from '../middlewares/authenticated.js';
import connectMultiParty from 'connect-multiparty';
import post from '../models/post.js';

const md_uploadMiniature = connectMultiParty({uploadDir: "./uploads/miniature_posts"});

const api = express.Router();

api.post('/post', [md_auth.asureAuth, md_uploadMiniature], postController.createPost);
api.get('/post/:path', postController.getPost); // post por path
api.get('/posts', postController.getPosts); //todos los usuarios obtienen los cursos no tiene control de authorization/token
api.patch('/post/:id',[md_auth.asureAuth, md_uploadMiniature], postController.updatePosts);
api.delete('/post/:id', [md_auth.asureAuth], postController.deletePost);


export default api;