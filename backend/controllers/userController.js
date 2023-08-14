import asyncHandler from "../middlewares/asyncHandler.js";
import User from "../models/userModel.js";
import generateToken from "../utils/generateToken.js";

//****************************************************/
// @desc    Auth user & get token
// @route   POST /api/users/login
// @access  Public
const authUser = asyncHandler(async (req, res) => {
    const { name, email, password } = req.body;

    const user = await User.findOne({ email });

    if (user && (await user.matchPassword(password))) {
        generateToken(res, user._id);
        res.json({
            _id: user._id,
            name: user.name,
            email: user.email,
        });
    } else {
        res.status(401);
        throw new Error("Invalid email or password");
    }
});

//****************************************************/
// @desc    Register a new user
// @route   POST /api/users
// @access  Public

const registerUser = asyncHandler(async (req, res) => {
    const { name, email, password } = req.body;

    const userExists = await User.findOne({ email });

    if (userExists) {
        res.status(400);
        throw new Error("User already exists");
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
        res.status(400);
        throw new Error("Invalid user data");
    }
});

//****************************************************/
// @desc logout user and clear cookie
// @route   GET /api/users/logout
// @access  Private

const logoutUser = async (req, res) => {
    res.cookie("jwt", "", {
        httpOnly: true,
        expires: new Date(0),
    });

    res.status(200).json({
        message: "User logged out",
    });
};

//****************************************************/
// @desc  Get all users
// @route GET /api/users
// @access Private/Admin
const getUsers = async (req, res) => {
    const users = await User.find({});
    res.json(users);
};

//****************************************************/
// @desc  Get user by ID
// @route GET /api/users/:id
// @access Private/Admin
const getUserById = async (req, res) => {
    const user = await User.findById(req.params.id).select("-password");

    if (user) {
        return res.json(user);
    } else {
        res.status(404);
        throw new Error("User not found");
    }
};

//****************************************************/
// @desc  Delete user
// @route DELETE /api/users/:id
// @access Private/Admin
const deleteUser = asyncHandler(async (req, res) => {
    const user = await User.findById(req.params.id);

    if (user) {
        await User.deleteOne({ _id: user._id });
        res.json({ message: "User removed" });
    } else {
        res.status(404);
        throw new Error("User not found");
    }
});

//****************************************************/

// @desc    Update user
// @route   PUT /api/users/:id
// @access  Private/Admin

const updateUserStatus = asyncHandler(async (req, res) => {
    const user = await User.findById(req.params.id);

    if (user) {
        user.status = req.body.status || user.status;

        const updatedUser = await user.save();

        res.json({
            _id: updatedUser._id,
            status: updatedUser.status,
        });
    } else {
        res.status(404);
        throw new Error("User not found");
    }
});

export {
    authUser,
    registerUser,
    logoutUser,
    getUsers,
    deleteUser,
    updateUserStatus,
    getUserById,
};
