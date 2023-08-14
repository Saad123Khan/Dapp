import express from "express";
import {
  createSignUpAndLogin,
  getOneUser,
  updateProfile,
  getUserWallet,
  updateUserWallet
} from "#controllers/admin/User.controller";

const userRoute = express.Router();

userRoute
  .route("/user")
  .post(createSignUpAndLogin)

  userRoute
  .route("/user/wallet/:id")
  .get(getUserWallet)


  userRoute
  .route("/user/:id")
  .put(updateProfile)
  .get(getOneUser)


export default userRoute;
