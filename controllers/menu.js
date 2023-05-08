import Menu from '../models/menu.js';

const createMenu = async (req,res) => {
  const menu = new Menu(req.body);

  try {
    await menu.save();
    res.status(200).send({msg: "Menu creado correctamente"});
  } catch (error) {
    res.status(400).send({msg: `Error al crear menu: ${error}`});
  }
};

const getMenus = async (req, res) => {
  const {active} = req.query; //en query vienen los parámetros, ej. /users?active=true
  let menuDoc = null;
  try {
    if(active===undefined) {
      //sin parámetro, todos los usuarios.
      menuDoc = await Menu.find().sort({order: 'asc'}).exec();
    } else {
      //recuperar los usuarios activos o no activos, según valor que venga en active
      menuDoc = await Menu.find({active}).sort({order: 'asc'}).exec();
    }
    
    res.status(200).send(menuDoc);
  } catch (error) {
    res.status(400).send({msg: `Error al recuperar menus, ${error}`});
  }
}

const updateMenu = async (req, res) => {
  const {id} = req.params;
  const menuData = req.body;

  try {
    await Menu.findByIdAndUpdate(id, menuData);
    res.status(200).send({msg: "Actualización correcta"});
  } catch (error) {
    res.status(400).send({msg: `Error al actualizar el menu, ${error}`});
  
  }
}

const deleteMenu = async(req, res) => {
  const {id} = req.params;
  try {
    await Menu.findByIdAndDelete(id);
    res.status(200).send({msg: "Elminiación correcta"});
  } catch (error) {
    res.status(400).send({msg: `Error al eliminar el menu, ${error}`});
  }
}

export default {
  createMenu,
  getMenus,
  updateMenu,
  deleteMenu
};