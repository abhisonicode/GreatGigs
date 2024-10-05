import jwt from "jsonwebtoken";
import createError from "../utils/createError.js";
import { apiResponse, ApiStatus } from "../utils/apiResponse.js";

export const verifyToken = (req, res, next) => {
  const token = req.cookies.accessToken;
  if (!token)
    return next(
      createError(
        401,
        apiResponse(ApiStatus.FAILED, null, "You are not authenticated!")
      )
    );

  jwt.verify(token, process.env.JWT_KEY, async (error, payload) => {
    if (error)
      return next(
        createError(
          403,
          apiResponse(ApiStatus.FAILED, null, "Token is not valid")
        )
      );
    (req.userId = payload.id), (req.isSeller = payload.isSeller);
    next();
  });
};
