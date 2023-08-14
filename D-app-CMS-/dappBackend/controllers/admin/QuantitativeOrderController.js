import asyncHandler from "#middlewares/asyncHandler";
import { Order, validate } from "#models/quantitative_order_model";


/**
 @desc     create Quantitative Order
 @route    POST /api/admin/quantitative_order
 @access   Private
 */

const createQuantitativeOrder = asyncHandler(async (req, res) => {
  const { error } = validate(req.body);
  if (error) {
    return res
      .status(400)
      .send({ status: false, message: error?.details[0]?.message });
  }

  const aiQuantitativeCreated = await new Order(req.body).save();
  if (aiQuantitativeCreated) {
    res
      .status(201)
      .json({
        status: true,
        message: "Quantitative Order created successfully",
      });
  } else {
    res.status(400).json({ status: false, message: "Something Error" });
  }
});

/**
 @desc     Get All Quantitative Order
 @route    GET /api/admin/quantitative_Order
 @access   Private
 */
const getAllQuantitativeOrder = asyncHandler(async (req, res) => {
  const order = await Order.find({}).populate("productId userId");

  order.length === 0
    ? res
        .status(200)
        .send({
          status: false,
          message: "Quantitative Order does not exist",
          order: [],
        })
    : res.status(200).send({ status: true, order });
});



/*
@desc     Get One Quantitative Order 
@route    GET /api/admin/quantitative_Order/:id
@access   Private
*/
const getOneQuantitativeOrder = asyncHandler(async (req, res) => {
    const { id } = req.params; 
    const quantitative = await Order.findById(id);
  
    if (quantitative) {
      res.status(200).json({
        status: true,
        order:quantitative,
      });
    } else {
      res
        .status(409)
        .json({ status: true, message: "No quantitative Order exists with this Id" });
    }
  });



  
/*
@desc     Update One Quantitative Order 
@route    PUT /api/admin/quantitative_Order/:id
@access   Private
*/
const updateQuantitativeOrder = asyncHandler(async (req, res) => {
  const { error } = validate(req.body);
  if (error) {
    return res
      .status(400)
      .send({ status: false, message: error?.details[0]?.message });
  }

  
  const checkedvalid = await Order.findById(req.params.id)
    if(!checkedvalid)
    {    
        return res.status(400).json({status : true , message : "Quantitative Order does not exists!"})        
    }
    
       const update = await Order.findByIdAndUpdate(req.params.id, req.body, { new: true });
       if(update)
       {
        return res.status(200).json({status : true , message : "Quantitative Order updated successfully" ,order : update})
       }else {
        res.status(400).json({ status: false, message: "Something Error" });
      }
        
  })
export { createQuantitativeOrder, getAllQuantitativeOrder,getOneQuantitativeOrder,updateQuantitativeOrder};
