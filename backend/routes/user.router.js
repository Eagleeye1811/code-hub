const express = require("express");
const { getAllUsers, signup, login, getUserProfile, updateUserProfile, deleteUserProfile } = require("../controllers/userController");

const userRouter = express.Router();

userRouter.get("/allUsers",getAllUsers);
userRouter.post("/signup",signup);
userRouter.post("/login",login);
userRouter.get("/userProfile",getUserProfile);
userRouter.put("/updateProfile",updateUserProfile);
userRouter.delete("/deleteProfile",deleteUserProfile);

module.exports = userRouter;