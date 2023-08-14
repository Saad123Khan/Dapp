import mongoose from "mongoose";
import Joi from "joi";

const UserSchema = new mongoose.Schema({
  user_address : {
    type: String,
  },
  ip:{
    type: Number,  
  },
  location:{
    type: String,
  },
  last_login:{
    type: Date,
    default:Date.now()
  }
},{timestamps : true});


function validateUser(user) {
  const schema = Joi.object({
    user_address : Joi.string().required(),
    location: Joi.string(),
    ip: Joi.number(),
    last_login: Joi.date()
});
  return schema.validate(user);
}

const User = mongoose.model("User", UserSchema);

export { User, validateUser as validate };
