import createError from "../utils/createError.js";
import Review from "../models/review.model.js";
import Gig from "../models/gig.model.js";
import { apiResponse, ApiStatus } from "../utils/apiResponse.js";

export const createReview = async (req, res, next) => {
  if (req.isSeller)
    return next(
      createError(
        403,
        apiResponse(ApiStatus.FAILED, null, "Sellers can't create a review!")
      )
    );

  const newReview = new Review({
    userId: req.userId,
    gigId: req.body.gigId,
    desc: req.body.desc,
    star: req.body.star,
  });

  try {
    const review = await Review.findOne({
      gigId: req.body.gigId,
      userId: req.userId,
    });

    // if (review)
    //   return next(
    //     createError(
    //       403,
    //       apiResponse(
    //         ApiStatus.FAILED,
    //         null,
    //         "You have already created a review for this gig!"
    //       )
    //     )
    //   );

    //TODO: check if the user purchased the gig.

    const savedReview = await newReview.save();

    await Gig.findByIdAndUpdate(req.body.gigId, {
      $inc: { totalStars: req.body.star, starNumber: 1 },
    });
    res
      .status(201)
      .send(
        apiResponse(
          ApiStatus.SUCCESS,
          savedReview,
          "review created successfully!"
        )
      );
  } catch (err) {
    next(err);
  }
};

export const getReviews = async (req, res, next) => {
  try {
    const reviews = await Review.find({ gigId: req.params.gigId });
    res.status(200).send(apiResponse(ApiStatus.SUCCESS, reviews, ""));
  } catch (err) {
    next(err);
  }
};
export const deleteReview = async (req, res, next) => {
  // try {
  // } catch (err) {
  //   next(err);
  // }
};
