import Course from '../models/course.js';
import image from '../utils/images.js';

const createCourse = async (req,res) => {
  const course = new Course(req.body);

  if (req.files.miniature) {
    course.miniature = image.getFilePath(req.files.miniature);
  }
  try {
    await course.save();
    res.status(200).send({msg: "Curso creado correctamente"});
  } catch (error) {
    res.status(400).sende({msg: `Error al crear curso: ${error}`});
  }
};

const getCourses = async (req, res) => {
  // Opciones de paginación; page y limit vienen de query.
  const {page = 1, limit = 10} = req.query; // al ponerle =, asumirá ese valor en caso que no venga
  const option = {
    page: parseInt(page),
    limit: parseInt(limit)
  };

  let courseDoc = null;
  
  Course.paginate({}, option)
  .then((courseDoc)=>{
    res.status(200).send(courseDoc);
  })
  .catch((error)=>{
    res.status(400).send({msg: `Error al recuperar cursos, ${error}`});
  });
}

const updateCourse = async (req, res) => {
  const {id} = req.params;
  const courseData = req.body;
  if (req.files.miniature) {
    courseData.miniature = image.getFilePath(req.files.miniature);
  }

  try {
    await Course.findByIdAndUpdate(id, courseData);
    res.status(200).send({msg: "Actualización correcta"});
  } catch (error) {
    res.status(400).send({msg: `Error al actualizar el curso, ${error}`});
  
  }
}

const deleteCourse = async(req, res) => {
  const {id} = req.params;
  try {
    await Course.findByIdAndDelete(id);
    res.status(200).send({msg: "Elminiación correcta"});
  } catch (error) {
    res.status(400).send({msg: `Error al eliminar el curso, ${error}`});
  }
}

export default {
  createCourse,
  getCourses,
  updateCourse,
  deleteCourse,
};