import express from 'express';
import courseController from '../controllers/course.js';
import md_auth from '../middlewares/authenticated.js';
import connectMultiParty from 'connect-multiparty';

const md_uploadMiniature = connectMultiParty({uploadDir: "./uploads/miniature"});

const api = express.Router();

api.post('/course', [md_auth.asureAuth, md_uploadMiniature], courseController.createCourse);
api.get('/courses', courseController.getCourses); //todos los usuarios obtienen los cursos no tiene control de authorization/token
api.patch('/course/:id',[md_auth.asureAuth, md_uploadMiniature], courseController.updateCourse);
api.delete('/course/:id', [md_auth.asureAuth], courseController.deleteCourse);


export default api;