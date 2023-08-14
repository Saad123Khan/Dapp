import mongoose from "mongoose";
import Joi from "joi";
import { ACCOUNT_TYPE,COINS ,STATE} from "#constant/constant";

const WalletSchema = new mongoose.Schema({
  user_address: {
    type: String
  },
  account_type: {
    type: String,
    enum:ACCOUNT_TYPE
  },
  currency:{
    type: String,  
    enum:COINS
  },
  balance:{
    type: Number,
  },
  ferozen:{
    type: Number,
  },
  state:{
    type:String,
    enum:STATE,
    default:'normal'
  }

},{timestamps : true});


function validateWallet(user) {
  const schema = Joi.object({
    user_address : Joi.string().required(),
    account_type: Joi.string().valid(...ACCOUNT_TYPE).required(),
    currency: Joi.string().valid(...COINS).required(),
    balance: Joi.number().required(),
    ferozen: Joi.number().required(),
    state: Joi.string().valid(...STATE),
  });
  return schema.validate(user);
}

const Wallet = mongoose.model("Wallet", WalletSchema);

export { Wallet, validateWallet};
