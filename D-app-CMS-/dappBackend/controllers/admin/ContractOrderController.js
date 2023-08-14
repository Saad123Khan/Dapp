import asyncHandler from "#middlewares/asyncHandler";

import { Product} from "#models/contract_product_model";
import { Wallet } from "#models/wallet_model";

import { User } from "#models/user_model";
import { Order, validate } from "#models/contract_order_model";
import _  from "lodash"
/**
 @desc     create Ai Contract Order
 @route    POST /api/admin/contract_order
 @access   Private
 */

const createContractOrder = asyncHandler(async (req, res) => {
  const { error } = validate(req.body);
  if (error) {
    return res
      .status(400)
      .send({ status: false, message: error?.details[0]?.message });
  }

  
  const userFind = await User.findOne({user_address:req.body.user_address});

  const productFind = await Product.findOne({_id:req.body.productId,currency:req.body.coin});
  
  const walletFind = await Wallet.findOne({user_address:req.body.user_address, currency:req.body.coin});
  

 if(!userFind) {
   return res
      .status(404)
      .json({ status: false, message: "User not found" });
  }


  if(!productFind) {
   return res
      .status(404)
      .json({ status: false, message: "Product not found" });
  }


  if(!walletFind) {
    return res
       .status(404)
       .json({ status: false, message: "Wallet not found" });
   }


if(!(walletFind?.balance >= req.body.amount)) {
    return res
       .status(404)
       .json({ status: false, message: "You do not have sufficient balance" });
   }

  const aiOrderCreated = await new Order( _.pick(req.body,["productId","user_address","currency","coin","expected","amount","opening_price","direction"])).save();
  if (aiOrderCreated) {
    res
      .status(201)
      .json({
        status: true,
        message: "Contract Order Created Successfully",
      });
  } else {
    res.status(400).json({ status: false, message: "Something Error" });
  }
});

/**
 @desc     Get All Contract Order
 @route    GET /api/admin/contract_order
 @access   Private
 */
const getAllContractOrder  = asyncHandler(async (req, res) => {
  const order = await Order.find({});

  order.length === 0
    ? res
        .status(200)
        .send({
          status: false,
          message: "Contract order does not exist",
          order: [],
        })
    : res.status(200).send({ status: true, order });
});






/*
@desc     Get One Contract Order 
@route    GET /api/admin/contract_order/:id
@access   Private
*/
const getOneContractOrder  = asyncHandler(async (req, res) => {
    const { id } = req.params; 
    const order = await Order.findById(id);
  
    if (order) {
      res.status(200).json({
        status: true,
        order,
      });
    } else {
      res
        .status(404)
        .json({ status: false, message: "No Contract Order exists with this Id" });
    }
  });


/*
@desc     Update One Contract Order 
@route    PUT /api/admin/contract_order/:id
@access   Private
*/
  const updateContractOrder  = asyncHandler(async (req, res) => {
    const checkedvalid = await Order.findById(req.params.id)
      if(!checkedvalid)
      {    
          return res.status(400).json({status : true , message : "Contract Order does not exists!"})        
      }
         const update = await Order.findByIdAndUpdate(req.params.id, req.body, { new: true });
         if(update)
         {
          return res.status(200).json({status : true , message : "Contract Order updated successfully" ,order : update})
         }else {
          res.status(400).json({ status: false, message: "Something Error" });
        }
          
    })





/*
@desc     Update One Contract Order 
@route    PUT /api/admin/contract_order/:id
@access   Private
*/
const updateContractOrderSuccess  = asyncHandler(async (req, res) => {
  const checkedvalid = await Order.findOne({productId:req.body.productId, _id:req.params.id,user_address:req.body.user_address,status:'progress',result:'progress'})
    if(!checkedvalid)
    {    
        return res.status(400).json({status : true , message : "Contract Order does not exists!"})        
    }
       const update = await Order.findByIdAndUpdate(req.params.id,  {closed_price:req.body.closed_price, result:req.body.result,status:'completed',enTrust:false}, { new: true });
      if(req.body.result === "win")
      {
        await Wallet.findOneAndUpdate({user_address:req.body.user_address,currency:req.body.currency,$inc : {balance:checkedvalid?.expected}})
      }
      else{
        await Wallet.findOneAndUpdate({user_address:req.body.user_address,currency:req.body.currency,$inc : {balance:-checkedvalid?.amount}})
      }
       if(update)
       {
        return res.status(200).json({status : true , message : "Contract Order updated successfully" ,order : update})
       }
       else {
        res.status(400).json({ status: false, message: "Something Error" });
      }
        
  })


export { createContractOrder, getAllContractOrder,getOneContractOrder,updateContractOrder,updateContractOrderSuccess};
