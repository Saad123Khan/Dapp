import mongoose from "mongoose";
import Joi from "joi";
import { PRODUCT_STATUS } from "#constant/constant";


const quantitativeProductSchema = new mongoose.Schema({
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
  maximum_amount: {
    type: Number,
  },
  minimum_amount: {
    type: Number,
  },
  maximum_yield: {
    type: Number,
  },
  minimum_rate_of_return: {
    type: Number,
  },
  currency_icons: [{
    type: String,
  }]
},{timestamps:true});

function validateQuantitative(user) {
    const schema = Joi.object({
        product_name : Joi.string().required(),
        product_life : Joi.string().required(),
        product_to_sort: Joi.number().required(),
        product_status: Joi.string().valid(...PRODUCT_STATUS).required(),
        maximum_amount: Joi.number().required(),
        minimum_amount: Joi.number().required(),
      maximum_yield : Joi.number().required(),
      minimum_rate_of_return : Joi.number().required(),
      currency_icons:Joi.array()
  });
    return schema.validate(user);
  }
  

const Product = mongoose.model("quantitative_product",quantitativeProductSchema) 

export { Product, validateQuantitative as validate };

