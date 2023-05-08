import Newsletter from '../models/newsletter.js';

const suscribeEmail = async (req,res) => {
  const newsletter = new Newsletter(req.body);

  try {
    newsletter.email = newsletter.email.toLowerCase();
    await newsletter.save();
    res.status(200).send({msg: "Newsletter creado correctamente"});
  } catch (error) {
    res.status(400).send({msg: `Error al crear menu: ${error}`});
  }
};

const getEmails = async (req, res) => {
  // Opciones de paginación; page y limit vienen de query.
  const {page = 1, limit = 10} = req.query; // al ponerle =, asumirá ese valor en caso que no venga
  const option = {
    page: parseInt(page),
    limit: parseInt(limit)
  };

  Newsletter.paginate({}, option)
  .then((newsletterDoc)=>{
    res.status(200).send(newsletterDoc);
  })
  .catch((error)=>{
    res.status(400).send({msg: `Error al recuperar emails, ${error}`});
  });
}

const deleteEmail = async(req, res) => {
  const {id} = req.params;
  try {
    await Newsletter.findByIdAndDelete(id);
    res.status(200).send({msg: "Eliminación correcta"});
  } catch (error) {
    res.status(400).send({msg: `Error al eliminar el mail en newletters, ${error}`});
  }
}

export default {
  suscribeEmail,
  getEmails,
  deleteEmail,
};