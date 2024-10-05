import gigModal from "../models/gig.model.js";
import { apiResponse, ApiStatus } from "../utils/apiResponse.js";
import createError from "../utils/createError.js";

export const createGig = async (req, res, next) => {
  if (!req.isSeller)
    return next(
      createError(
        403,
        apiResponse(ApiStatus.FAILED, null, "Only sellers can create a gig!")
      )
    );

  const gigRequest = new gigModal({
    ...req.body,
    userId: req.userId,
  });

  try {
    const createdGig = await gigRequest.save();
    res
      .status(200)
      .send(
        apiResponse(ApiStatus.SUCCESS, createdGig, "Gig created successfully!")
      );
  } catch (err) {
    next(err);
  }
};
export const deleteGigGig = async (req, res, next) => {
  try {
    const { id } = req.params;
    const gig = await gigModal.findById(id);

    if (!gig) {
      return next(
        createError(404, apiResponse(ApiStatus.FAILED, null, "Gig not found!"))
      );
    }

    if (gig?.userId != req?.userId) {
      return next(
        createError(
          403,
          apiResponse(
            ApiStatus.FAILED,
            null,
            "You are not authorized to delete this gig!"
          )
        )
      );
    }

    await gigModal.findByIdAndDelete(id);
    res
      .status(200)
      .send(apiResponse(ApiStatus.SUCCESS, true, "Gig deleted successfully"));
  } catch (error) {
    next(error);
  }
};
export const getGig = async (req, res, next) => {
  try {
    const { id } = req.params;
    const gig = await gigModal.findById(id);
    if (!gig) {
      return next(
        createError(404, apiResponse(ApiStatus.FAILED, null, "Gig not found!"))
      );
    }
    res.status(200).send(apiResponse(ApiStatus.SUCCESS, gig, ""));
  } catch (error) {
    next(error);
  }
};
export const getAllGigs = async (req, res, next) => {
  try {
    const { cat, min, max, search, userId, sort } = req.query;

    const filters = {
      ...(userId && { userId: userId }),
      ...(cat && { cat: cat, $options: "i" }),
      ...((min || max) && {
        price: { ...(min && { $gt: min }), ...(max && { $lt: max }) },
      }),
      ...(search && { title: { $regex: search, $options: "i" } }),
    };

    const gigs = await gigModal.find(filters).sort({ [sort]: -1 });
    res.status(200).send(apiResponse(ApiStatus.SUCCESS, gigs, ""));
  } catch (error) {
    next(error);
  }
};
