import express from "express";
const router = express.Router();

import {
    authUser,
    registerUser,
    logoutUser,
    getUsers,
    deleteUser,
    updateUserStatus,
    getUserById,
} from "../controllers/userController.js";
import { protect } from "../middlewares/authMiddleware.js";

router.route("/").get(protect, getUsers);
router.route("/register").post(registerUser);
router.post("/logout", logoutUser);
router.post("/login", authUser);

router
    .route("/:id")
    .get(protect, getUserById)
    .delete(protect, deleteUser)
    .put(protect, updateUserStatus);

export default router;
