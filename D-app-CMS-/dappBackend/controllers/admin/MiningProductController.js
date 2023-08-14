import asyncHandler from "#middlewares/asyncHandler";
import { Product, validate } from "#models/mining_product_model";

/**
 @desc     create Mining Product
 @route    POST /api/admin/mining_product
 @access   Private
 */

const createMiningProduct = asyncHandler(async (req, res) => {
  const { error } = validate(req.body);
  if (error) {
    return res
      .status(400)
      .send({ status: false, message: error?.details[0]?.message });
  }


  const aiMiningCreated = await new Product(req.body).save();
  if (aiMiningCreated) {
    res
      .status(201)
      .json({
        status: true,
        message: "Mining product Created Successfully",
      });
  } else {
    res.status(400).json({ status: false, message: "Something Error" });
  }
});

/**
 @desc     Get All Mining Product
 @route    GET /api/admin/mining_product
 @access   Private
 */
const getAllMiningProduct = asyncHandler(async (req, res) => {
  const product = await Product.find({});

  product.length === 0
    ? res
        .status(200)
        .send({
          status: false,
          message: "Mining product does not exist",
          mining: [],
        })
    : res.status(200).send({ status: true, mining: product });
});






/*
@desc     Get One Mining Product 
@route    GET /api/admin/mining_product/:id
@access   Private
*/
const getOneMiningProduct = asyncHandler(async (req, res) => {
    const { id } = req.params; 
    const mining = await Product.findById(id);
  
    if (mining) {
      res.status(200).json({
        status: true,
        mining,
      });
    } else {
      res
        .status(409)
        .json({ status: true, message: "No Mining product exists with this Id" });
    }
  });





/*
@desc     Update One Mining Product 
@route    PUT /api/admin/mining_product/:id
@access   Private
*/
  const updateMiningProduct = asyncHandler(async (req, res) => {
    const checkedvalid = await Product.findById(req.params.id)
      if(!checkedvalid)
      {    
          return res.status(400).json({status : true , message : "Mining product does not exists!"})        
      }
         const update = await Product.findByIdAndUpdate(req.params.id, req.body, { new: true });
         if(update)
         {
          return res.status(200).json({status : true , message : "Mining product updated successfully" ,mining : update})
         }else {
          res.status(400).json({ status: false, message: "Something Error" });
        }
          
    })

export { createMiningProduct, getAllMiningProduct,getOneMiningProduct,updateMiningProduct};
