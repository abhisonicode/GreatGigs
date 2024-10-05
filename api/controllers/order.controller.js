import createError from "../utils/createError.js";
import Order from "../models/order.model.js";
import Gig from "../models/gig.model.js";
import Stripe from "stripe";
import { apiResponse, ApiStatus } from "../utils/apiResponse.js";

export const intent = async (req, res, next) => {
  const stripe = new Stripe(process.env.STRIPE);

  const gig = await Gig.findById(req.params.id);

  const paymentIntent = await stripe.paymentIntents.create({
    amount: gig.price * 100,
    currency: "inr",
    automatic_payment_methods: {
      enabled: true,
    },
  });

  const newOrder = new Order({
    gigId: gig._id,
    img: gig.cover,
    title: gig.title,
    buyerId: req.userId,
    sellerId: gig.userId,
    price: gig.price,
    payment_intent: paymentIntent.id,
  });

  await newOrder.save();

  res.status(200).send(
    apiResponse(
      ApiStatus.SUCCESS,
      {
        clientSecret: paymentIntent.client_secret,
      },
      "order created successfully!"
    )
  );
};

export const getOrders = async (req, res, next) => {
  try {
    const orders = await Order.find({
      ...(req.isSeller ? { sellerId: req.userId } : { buyerId: req.userId }),
      isCompleted: true,
    }).sort({ updatedAt: -1 });

    res.status(200).send(apiResponse(ApiStatus.SUCCESS, orders, ""));
  } catch (err) {
    next(err);
  }
};
export const confirm = async (req, res, next) => {
  try {
    const confirmedOrder = await Order.findOneAndUpdate(
      {
        payment_intent: req.body.payment_intent,
      },
      {
        $set: {
          isCompleted: true,
        },
      },
      { new: true }
    );

    res
      .status(200)
      .send(
        apiResponse(
          ApiStatus.SUCCESS,
          confirmedOrder,
          "Order has been confirmed."
        )
      );
  } catch (err) {
    next(err);
  }
};

export const markAsFinished = async (req, res, next) => {
  const { id } = req.params;

  if (!req.isSeller) {
    return next(
      createError(
        401,
        apiResponse(
          ApiStatus.FAILED,
          null,
          "Only the seller can mark order as paid"
        )
      )
    );
  }

  const order = await Order.findById(id);
  if (order.sellerId !== req.userId) {
    return next(
      createError(
        401,
        apiResponse(ApiStatus.FAILED, null, "You are not an authorized seller!")
      )
    );
  }

  try {
    const finishedOrder = await Order.findByIdAndUpdate(
      id,
      {
        $set: {
          isCompleted: true,
          isFinished: true,
        },
      },
      { new: true }
    );

    await Gig.findByIdAndUpdate(finishedOrder.gigId, {
      $inc: { sales: 1 },
    });

    res
      .status(200)
      .send(
        apiResponse(ApiStatus.SUCCESS, finishedOrder, "Marked as completed!")
      );
  } catch (error) {
    next(error);
  }
};
