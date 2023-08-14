import mongoose from "mongoose";
import Joi from "joi";
import { COMPLETE_STATUS } from "#constant/constant";


const miningOrderSchema = new mongoose.Schema({
  productId: {
    type: mongoose.Schema.Types.ObjectId,
    ref:'mining_product'
  },
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref:'User'
  },
  amount:{
    type: Number,
  },
  status: {
    type: String,
    enum:COMPLETE_STATUS,
    default:"progress"
  },
},{timestamps:true});

function validateMining(user) {
    const schema = Joi.object({
        productId : Joi.string().required(),
        userId : Joi.string().required(),
        status: Joi.string().valid(...COMPLETE_STATUS),         
        amount:Joi.number().required()
  });
    return schema.validate(user);
  }
  

const Order = mongoose.model("mining_order",miningOrderSchema) 

export { Order, validateMining as validate };

