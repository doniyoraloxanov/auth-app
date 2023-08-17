import express from "express";
const router = express.Router();

import {
  authUser,
  registerUser,
  logoutUser,
  getUsers,
  deleteUser,
  blockUser,
  unblockUser,
  getUserById,
} from "../controllers/userController.js";
import { protect } from "../middlewares/authMiddleware.js";

router.route("/").get(protect, getUsers).post(registerUser);
router.post("/logout", logoutUser);
router.post("/auth", authUser);

router
  .route("/:id")
  .get(protect, getUserById)
  .delete(protect, deleteUser)
  .put(protect, blockUser)
  .patch(protect, unblockUser);

export default router;
