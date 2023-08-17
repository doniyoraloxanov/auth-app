import User from "../models/userModel.js";
import generateToken from "../utils/generateToken.js";
import catchAsync from "../middlewares/catchAsync.js";

const authUser = catchAsync(async (req, res) => {
  const { email, password } = req.body;

  const user = await User.findOne({ email });

  if (user && (await user.matchPassword(password))) {
    generateToken(res, user._id);

    res.json({
      _id: user._id,
      name: user.name,
      email: user.email,
      isAdmin: user.isAdmin,
    });
  } else {
    res.status(401).json({ message: "Invalid email or password" });
  }
});

const registerUser = catchAsync(async (req, res) => {
  const { name, email, password } = req.body;

  const userExists = await User.findOne({ email });

  if (userExists) {
    res.status(400).json({ message: "User already exists" });
  }

  const user = await User.create({
    name,
    email,
    password,
  });

  if (user) {
    generateToken(res, user._id);

    res.status(200).json({
      _id: user._id,
      name: user.name,
      email: user.email,
      password: user.password,
    });
  } else {
    res.status(401).json({ message: "Invalid email or password" });
  }
});

const logoutUser = catchAsync(async (req, res) => {
  res.cookie("jwt", "", {
    httpOnly: true,
    expires: new Date(0),
  });

  res.status(401).json({ message: "Invalid email or password" });
});

const getUsers = catchAsync(async (req, res) => {
  const users = await User.find({});
  res.json(users);
});

const getUserById = catchAsync(async (req, res) => {
  const user = await User.findById(req.params.id).select("-password");
  if (user) {
    return res.json(user);
  } else {
    res.status(401).json({ message: "Invalid email or password" });
  }
});

const deleteUser = catchAsync(async (req, res) => {
  const ids = req.body;
  if (ids) {
    await User.deleteMany({ _id: { $in: ids } });

    res.json({ message: "Users removed" });
  } else {
    res.status(401).json({ message: "User is removed" });
  }
});
const blockUser = catchAsync(async (req, res) => {
  const ids = req.body;

  if (ids) {
    await User.updateMany({ _id: { $in: ids } }, { status: "blocked" });

    res.json({ message: "Users blocked" });
  } else {
    res.status(401).json({ message: "User is blocked" });
  }
});

const unblockUser = catchAsync(async (req, res) => {
  const ids = req.body;
  if (ids) {
    await User.updateMany({ _id: { $in: ids } }, { status: "active" });
    res.json({ message: "Users unblocked" });
  } else {
    res.status(401).json({ message: "User is unblocked" });
  }
});

export {
  authUser,
  registerUser,
  logoutUser,
  getUsers,
  deleteUser,
  blockUser,
  unblockUser,
  getUserById,
};
