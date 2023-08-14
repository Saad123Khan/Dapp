import mongoose from "mongoose";
import Joi from "joi";
import {
  RESULT_STATUS,
  CURRENCY,
  COMPLETE_STATUS,
  DIRECTION,
  COINS
} from "#constant/constant";

const contractOrderSchema = new mongoose.Schema(
  {
    productId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "contract_product",
    },
    user_address: {
      type: String,
    },
    coin: {
      type: String,
      enum: COINS,
    },
    currency: {
      type: String,
      enum: CURRENCY,
    },
    opening_price: {
      type: Number,
    },
    closed_price: {
      type: Number,
    },
    amount: {
      type: Number,
    },
    expected: {
      type: Number,
    },
    direction: {
      type: String,
      enum: DIRECTION,
    },
    result: {
      type: String,
      enum: RESULT_STATUS,
      default: "progress",
    },
    status: {
      type: String,
      enum: COMPLETE_STATUS,
      default: "progress",
    },
    enTrust:{
      type:Boolean,
      default:true
  }
  },
  { timestamps: true }
);

function validateOrder(user) {
  const schema = Joi.object({
    productId: Joi.string().required(),
    user_address: Joi.string().required(),
    currency: Joi.string().valid(...CURRENCY).required(),
    coin: Joi.string().valid(...COINS).required(),
    opening_price: Joi.number().required(),
    closed_price: Joi.number(),
    amount: Joi.number().required(),
    expected: Joi.number().required(),
    direction: Joi.string().valid(...DIRECTION).required(),
    result: Joi.string().valid(...RESULT_STATUS),
    status: Joi.string().valid(...COMPLETE_STATUS),
    enTrust:Joi.boolean()
  });
  return schema.validate(user);
}

const Order = mongoose.model("contract_order", contractOrderSchema);

export { Order, validateOrder as validate };
