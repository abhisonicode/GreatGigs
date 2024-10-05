import userModal from "../models/user.model.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import createError from "../utils/createError.js";
import { apiResponse, ApiStatus } from "../utils/apiResponse.js";

export const Register = async (req, res, next) => {
  try {
    const { email, username } = req.body;

    // check email if exist
    if (email) {
      let user = await userModal.findOne({ email: email });
      if (user?._doc?.email) {
        return next(
          createError(
            400,
            apiResponse(
              ApiStatus.FAILED,
              null,
              "user already exists with this email!"
            )
          )
        );
      }
    }

    // check username if exist
    if (username) {
      let user = await userModal.findOne({ username: username });
      if (user?._doc?.username) {
        console.log("inside");
        return next(
          createError(
            400,
            apiResponse(
              ApiStatus.FAILED,
              null,
              "username already exists, please try other!"
            )
          )
        );
      }
    }

    const hashedPassword = bcrypt.hashSync(req.body?.password, 10);
    const newUser = new userModal({
      ...req.body,
      password: hashedPassword,
    });

    const createdUser = await newUser.save();
    const { password, ...userDetails } = createdUser._doc;
    res
      .status(201)
      .send(
        apiResponse(ApiStatus.SUCCESS, userDetails, "User created succesfully!")
      );
  } catch (error) {
    next(error);
  }
};
export const Login = async (req, res, next) => {
  try {
    const user = await userModal.findOne({ username: req.body?.username });
    if (!user)
      return next(
        createError(404, apiResponse(ApiStatus.FAILED, null, "User not found"))
      );

    const isCorrect = bcrypt.compareSync(req.body?.password, user.password);
    if (!isCorrect)
      return next(
        createError(
          400,
          apiResponse(ApiStatus.FAILED, null, "Incorrect username or password!")
        )
      );

    const token = jwt.sign(
      {
        id: user._id,
        isSeller: user.isSeller,
      },
      process.env.JWT_KEY
    );

    const { password, ...details } = user._doc;
    res
      .cookie("accessToken", token, { httpOnly: true })
      .status(200)
      .send(apiResponse(ApiStatus.SUCCESS, details, ""));
  } catch (error) {
    next(error);
  }
};
export const Logout = async (req, res) => {
  res
    .clearCookie("accessToken", {
      sameSite: "none",
      secure: true,
    })
    .status(200)
    .send(apiResponse(ApiStatus.SUCCESS, null, "User has been logged out!"));
};
