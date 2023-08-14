import mongoose from "mongoose";
import Joi from "joi";
import { COMPLETE_STATUS } from "#constant/constant";


const quantitativeOrderSchema = new mongoose.Schema({
  productId: {
    type: mongoose.Schema.Types.ObjectId,
    ref:'quantitative_product'
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

function validateQuantitativee(user) {
    const schema = Joi.object({
        productId : Joi.string().required(),
        userId : Joi.string().required(),
        status: Joi.string().valid(...COMPLETE_STATUS),         
        amount:Joi.number().required()
  });
    return schema.validate(user);
  }
  

const Order = mongoose.model("quantitative_order",quantitativeOrderSchema) 

export { Order, validateQuantitativee as validate };

