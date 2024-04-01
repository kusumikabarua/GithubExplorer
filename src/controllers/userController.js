const {
  saveUserDetails,
  findMutualFollowerDetails,
  deleteUserDetails,
  updateUserDetails
} = require("../services/userService");

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
const deleteUser = async (req, res) => {
  try {
    const user = req.params.user;
    const deletedUser = await deleteUserDetails(user);
    if (!deletedUser) {
      res.status(404).json({ message: "User not found" });
    }
    res.status(200).json(deletedUser);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const updateUser = async (req, res) => {
  try {
    const username = req.params.user;
    const updatedData =req.query;

    const updatedUser = await updateUserDetails(username,updatedData);
    if (!updatedUser) {
      res.status(404).json({ message: "User not found" });
    }
    res.status(200).json(updatedUser);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
module.exports = { saveUser, findMutualFollowers, deleteUser ,updateUser };
