const { generateOptions } = require("../utils/utils");
const { saveUserDetails } = require('../services/userService');
const https = require("https");

const getUser = async function (req, res) {
  const user = req.params.user;
  const options = generateOptions("/users/" + user);

  https
    .get(options, function (apiResponse) {
      apiResponse.pipe(res);
    })
    .on("error", (e) => {
      console.log(e);
      res.status(500).send(constants.error_message);
    });
};
const saveUser = async function (req, res) {
  try {
    const user = req.params.user;

    const savedUser = await saveUserDetails(user);

    res.status(201).json(savedUser);
  } catch (error) {
    res.status(501).json({ message: error.message });
  }
};

const findMutualFollowers = async function (req, res) {
  try {
    const user = req.params.user;

    const savedUser = await findMutualFollowers(user);
    
    res.status(201).json(savedUser);
  } catch (error) {
    res.status(501).json({ message: error.message });
  }
};

module.exports = {  saveUser,getUser ,findMutualFollowers};
