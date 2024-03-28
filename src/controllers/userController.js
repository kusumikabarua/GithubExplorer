
const { saveUserDetails,findMutualFollowerDetails } = require('../services/userService');



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

    const friends = await findMutualFollowerDetails(user);
    
    res.status(201).json(friends);
  } catch (error) {
    res.status(501).json({ message: error.message });
  }
};

module.exports = {  saveUser ,findMutualFollowers};
