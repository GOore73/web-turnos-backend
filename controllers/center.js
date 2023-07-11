import Center from '../models/center.js';
import bcrypt from 'bcryptjs';
import image from '../utils/images.js';

const getCenters = async (req, res) => {
  const { active } = req.query; //en query vienen los parámetros, ej. /centers?active=true
  let centersDoc = null;
  try {
    if (active === undefined) {
      //sin parámetro, todos los centros.
      centersDoc = await Center.find().exec();
    } else {
      //recuperar los usuarios activos o no activos, según valor que venga en active
      centersDoc = await Center.find({ active }).exec();
    }

    res.status(200).send(centersDoc);
  } catch (error) {
    res.status(400).send({ msg: "Error en servidor de la BD" });
  }
}

const createCenter = async (req, res) => {

  const center = new Center(req.body);

  try {
    await center.save();
    res.status(201).send({ msg: "OK" });
  } catch (error) {
    res.status(400).send({ msg: `Error al crear el centro, ${error}` });
  }
};

const updateCenter = async (req, res) => {
  const { id } = req.params; //params es lo que vendrá en ? en la url
  const centerData = req.body;

  //Actualización del avatar
  if (req.files.avatar) {   // envió avatar
    centerData.avatar = image.getFilePath(req.files.avatar);
  }
  try {
    await Center.findByIdAndUpdate(id, centerData);
    res.status(200).send({ msg: "Actualización correcta" });
  } catch (error) {
    res.status(400).send({ msg: `Error al actualizar el centro, ${error}` });
  }
};

const deleteCenter = async (req, res) => {
  const { id } = req.params;
  try {
    await Center.findByIdAndDelete(id);
    res.status(200).send({ msg: "Centro eliminado" });
  } catch (error) {
    res.status(400).send({ msg: `Error al intentar eliminar, ${error}` });
  }
};

export default {
  getCenters,
  createCenter,
  updateCenter,
  deleteCenter,
};