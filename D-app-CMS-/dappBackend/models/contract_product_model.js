import mongoose from "mongoose";
import Joi from "joi";

const contractProductSchema = new mongoose.Schema({
  product_name: {
    type: String,
  },
  currency: {
    type: String,
  },
  deliveryTime: {
    type: Number,
  },
 
  odds:{
    type: Number,
 
  },
  maximum_amount: {
    type: Number,
  },
  minimum_amount: {
    type: Number,
  },
  remark:{
    type: String,
  }
},{timestamps:true});

function validateOrder(user) {
    const schema = Joi.object({
        product_name : Joi.string().required(),
        currency : Joi.string().required(),
        deliveryTime: Joi.number().required(),
        odds: Joi.number().required(),       
        maximum_amount: Joi.number().required(),
        minimum_amount: Joi.number().required(),
        remark:Joi.string()
  });
    return schema.validate(user);
  }
  

const Product = mongoose.model("contract_product",contractProductSchema) 

export { Product, validateOrder as validate };

