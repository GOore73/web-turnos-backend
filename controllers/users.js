

const getMe = async (req, res) => {
  res.status(200).send({msg: "OK"});
}

export default {
  getMe,
}