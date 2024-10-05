import userModal from "../models/user.model.js";
import { ApiStatus, apiResponse } from "../utils/apiResponse.js";
import createError from "../utils/createError.js";

export const deleteUser = async (req, res, next) => {
  try {
    const user = await userModal.findById(req.params.id);
    if (req.body.id !== user._id.toString()) {
      return next(
        createError(
          401,
          apiResponse(
            ApiStatus.FAILED,
            null,
            "you can only delete your account!"
          )
        )
      );
    }
    await userModal.findByIdAndDelete(user._id);
    res.status(200).send("deleted");
  } catch (error) {
    console.log(error);
  }
};

export const getUserByUserName = async (req, res, next) => {
  try {
    const { username } = req.params;
    const user = await userModal.findOne({
      username: username,
    });

    if (!user) {
      res
        .status(200)
        .send(apiResponse(ApiStatus.SUCCESS, null, "customer not found!"));
    }
    let { password, ...details } = user._doc;
    res
      .status(200)
      .send(apiResponse(ApiStatus.SUCCESS, details, "customer exist!"));
  } catch (error) {
    next(
      createError(
        500,
        apiResponse(ApiStatus.FAILED, "server error", error.message)
      )
    );
  }
};

export const getUserByEmail = async (req, res, next) => {
  try {
    const { email } = req.query;
    const user = await userModal.findOne({
      email: email,
    });
    if (!user) {
      res
        .status(200)
        .send(apiResponse(ApiStatus.SUCCESS, null, "customer not found!"));
    }
    let { password, ...details } = user._doc;
    res
      .status(200)
      .send(apiResponse(ApiStatus.SUCCESS, details, "customer exist!"));
  } catch (error) {
    next(
      createError(
        500,
        apiResponse(ApiStatus.FAILED, error.message, "server error")
      )
    );
  }
};

export const getUserById = async (req, res, next) => {
  try {
    const { id } = req.params;
    const user = await userModal.findById(id);
    if (!user) {
      res
        .status(200)
        .send(apiResponse(ApiStatus.SUCCESS, null, "customer not found!"));
    }
    let { password, ...details } = user._doc;
    res
      .status(200)
      .send(apiResponse(ApiStatus.SUCCESS, details, "customer exist!"));
  } catch (error) {
    next(
      createError(
        500,
        apiResponse(ApiStatus.FAILED, "server error", error.message)
      )
    );
  }
};
