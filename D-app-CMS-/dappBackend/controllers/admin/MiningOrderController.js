import asyncHandler from "#middlewares/asyncHandler";

import { Order, validate } from "#models/mining_order_model";

import { Product } from "#models/mining_product_model";

import { User } from "#models/user_model";

/**
 @desc     create Mining Order
 @route    POST /api/admin/mining_order
 @access   Private
 */

const createMiningOrder = asyncHandler(async (req, res) => {
  const { error } = validate(req.body);
  if (error) {
    return res
      .status(400)
      .send({ status: false, message: error?.details[0]?.message });
  }

  const userFind = await User.findById(req.body.userId);

  const productFind = await Product.findById(req.body.productId);
  
 if(!userFind) {
    res
      .status(404)
      .json({ status: false, message: "User not found" });
  }


  if(!productFind) {
    res
      .status(404)
      .json({ status: false, message: "Product not found" });
  }

  const aiMiningCreated = await new Order(req.body).save();
  if (aiMiningCreated) {
    res
      .status(201)
      .json({
        status: true,
        message: "Mining Order Created Successfully",
      });
  } else {
    res.status(400).json({ status: false, message: "Something Error" });
  }
});


/**
 @desc     Get All Mining Order
 @route    GET /api/admin/mining_Order
 @access   Private
 */
const getAllMiningOrder = asyncHandler(async (req, res) => {
  const order = await Order.find({}).populate("productId userId");

  order.length === 0
    ? res
        .status(200)
        .send({
          status: false,
          message: "Mining Order does not exist",
          order: [],
        })
    : res.status(200).send({ status: true, order });
});



/*
@desc     Get One Mining Order 
@route    GET /api/admin/mining_Order/:id
@access   Private
*/
const getOneMiningOrder = asyncHandler(async (req, res) => {
    const { id } = req.params; 
    const mining = await Order.findById(id);
  
    if (mining) {
      res.status(200).json({
        status: true,
        order: mining,
      });
    } else {
      res
        .status(409)
        .json({ status: true, message: "No Mining Order exists with this Id" });
    }
  });


/*
@desc     Update One Mining Order 
@route    PUT /api/admin/mining_Order/:id
@access   Private
*/
  const updateMiningOrder = asyncHandler(async (req, res) => {
    const checkedvalid = await Order.findById(req.params.id)
      if(!checkedvalid)
      {    
          return res.status(400).json({status : true , message : "Mining order does not exists!"})        
      }
         const update = await Order.findByIdAndUpdate(req.params.id, req.body, { new: true });
         if(update)
         {
          return res.status(200).json({status : true , message : "Mining order updated successfully" ,order : update})
         }else {
          res.status(400).json({ status: false, message: "Something Error" });
        }
          
    })

export { createMiningOrder, getAllMiningOrder,getOneMiningOrder,updateMiningOrder};
