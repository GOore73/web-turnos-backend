import Post from '../models/post.js';
import image from '../utils/images.js';

const createPost = async (req,res) => {
  const post = new Post(req.body);
  post.created_at = new Date();

  if (req.files.miniature) {
    post.miniature = image.getFilePath(req.files.miniature);
  }
  try {
    await post.save();
    res.status(201).send({msg: "Post creado correctamente"});
  } catch (error) {
    res.status(400).send({msg: `Error al crear post: ${error}`});
  }
};

const getPosts = async (req, res) => {
  // Opciones de paginación; page y limit vienen de query.
  const {page = 1, limit = 10} = req.query; // al ponerle =, asumirá ese valor en caso que no venga
  const option = {
    page: parseInt(page),
    limit: parseInt(limit),
    sort: {created_at: "desc"},
  };

  let postDoc = null;
  
  Post.paginate({}, option)
  .then((postDoc)=>{
    res.status(200).send(postDoc);
  })
  .catch((error)=>{
    res.status(400).send({msg: `Error al recuperar posts, ${error}`});
  });
}

const getPost = async(req,res) => {
  const {path} = req.params;
  try {
    const post = await Post.findOne({path}).exec();
    res.status(200).send(post);
  } catch (error) {
    res.status(400).send({msg: `Error al recuperar el post, ${error}`})
  }
}

const updatePosts = async (req, res) => {
  const {id} = req.params;
  const postData = req.body;
  if (req.files.miniature) {
    postData.miniature = image.getFilePath(req.files.miniature);
  }

  try {
    await Post.findByIdAndUpdate(id, postData);
    res.status(200).send({msg: "Actualización correcta"});
  } catch (error) {
    res.status(400).send({msg: `Error al actualizar el post, ${error}`});
  
  }
}

const deletePost = async(req, res) => {
  const {id} = req.params;
  try {
    await Post.findByIdAndDelete(id);
    res.status(200).send({msg: "Elminiación correcta"});
  } catch (error) {
    res.status(400).send({msg: `Error al eliminar el post, ${error}`});
  }
}

export default {
  createPost,
  getPosts,
  getPost,
  updatePosts,
  deletePost,
};