import mongoose from "mongoose";
import Joi from "joi";
import { PRODUCT_STATUS } from "#constant/constant";


const miningProductSchema = new mongoose.Schema({
  product_name: {
    type: String,
  },
  product_life: {
    type: String,
  },
  product_to_sort: {
    type: Number,
  },
  product_status: {
    type: String,
    enum:PRODUCT_STATUS,
    default:"added"
  },
  unit_price:{
    type: Number,
 
  },
  maximum_amount: {
    type: Number,
  },
  minimum_amount: {
    type: Number,
  },
  maximum_output: {
    type: Number,
  },
  minimum_output: {
    type: Number,
  },
  computing_power:{
    type: Number,
  },
  power:{
    type: Number,
  }
},{timestamps:true});

function validateMining(user) {
    const schema = Joi.object({
        product_name : Joi.string().required(),
        product_life : Joi.string().required(),
        product_to_sort: Joi.number().required(),
        product_status: Joi.string().valid(...PRODUCT_STATUS).required(),         
        unit_price: Joi.number().required(),       
        maximum_amount: Joi.number().required(),
        minimum_amount: Joi.number().required(),
      maximum_output : Joi.number().required(),
      minimum_output : Joi.number().required(),
      computing_power:Joi.number().required(),
      power:Joi.number().required()
  });
    return schema.validate(user);
  }
  

const Product = mongoose.model("mining_product",miningProductSchema) 

export { Product, validateMining as validate };

