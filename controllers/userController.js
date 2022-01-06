const User = require("../model/User");

const deleteUser = async (req, res) => {
  console.log(req.params.id);
  try {
    const getUser = await User.find({ _id: req.params.id, isDelete: 0 });
    console.log(getUser);
    if (getUser.length > 0) {
      await User.findByIdAndUpdate(req.params.id, {
        $set: {
          isDelete: 1,
        },
      });
      res.status(200).json("user deleted success");
    } else {
      res.status(500).json("user not found");
    }
  } catch (error) {
    res.status(500).json(error);
  }
};

const updateUser = async (req, res) => {
  console.log("iddd", req.params.id);
  try {
    const update = await User.findByIdAndUpdate(
      req.params.id,
      {
        $set: req.body,
      },
      {
        new: true,
      }
    );
    res.status(200).json(update);
  } catch (error) {
    res.status(500).json("user id not matched");
  }
};

// get all user
const getAllUser = async (req, res) => {
  try {
    const users = await User.find();
    res.status(200).json(users);
  } catch (error) {
    res.status(500).json(error);
  }
};
// get all user
const getAllActiveUser = async (req, res) => {
  try {
    const users = await User.find({ isDelete: 0 });
    res.status(200).json(users);
  } catch (error) {
    res.status(500).json(error);
  }
};

module.exports = { deleteUser, updateUser, getAllUser, getAllActiveUser };
