const getFilePath = (file) =>{
  const filePath = file.path;
  const fileSplit = filePath.split("\\");
  //split corta un string en un array, cuando encuentra el string que va como parámetro en el split;
  // como el file.path tiene \ barra invertida, la forma de poner la barra invertida como texto
  // es haciendo una \\ doble barra invertida. El primer corte es "uploads", que quiero quitarlo porque ya está statics esa carpeta.

  return(`${fileSplit[1]}/${fileSplit[2]}`); 
};

export default {
  getFilePath
};