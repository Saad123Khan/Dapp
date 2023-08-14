import asyncHandler from "#middlewares/asyncHandler";
import { Product, validate } from "#models/quantitative_product_model";
import { PATH } from "#constant/constant";


/**
 @desc     create Quantitative Product
 @route    POST /api/admin/quantitative_product
 @access   Private
 */

const createQuantitativeProduct = asyncHandler(async (req, res) => {
  console.log(req.body,'req');
  const { error } = validate(req.body);
  if (error) {
    return res
      .status(400)
      .send({ status: false, message: error?.details[0]?.message });
  }
  if (req.uploadError) {
    res.status(400);
    throw new Error(req.uploadError);
  }

  const image = req?.files;

  let imageArray = [];
  image?.map((item) => {
    let icon = `${PATH}/uploads/${item?.filename}`;
    imageArray.push(icon);
  });
  req.body.currency_icons = imageArray;

  const aiQuantitativeCreated = await new Product(req.body).save();
  if (aiQuantitativeCreated) {
    res
      .status(201)
      .json({
        status: true,
        message: "Quantitative product created successfully",
      });
  } else {
    res.status(400).json({ status: false, message: "Something Error" });
  }
});

/**
 @desc     Get All Quantitative Product
 @route    GET /api/admin/quantitative_product
 @access   Private
 */
const getAllQuantitativeProduct = asyncHandler(async (req, res) => {
  const product = await Product.find({});

  product.length === 0
    ? res
        .status(200)
        .send({
          status: false,
          message: "Quantitative product does not exist",
          product: [],
        })
    : res.status(200).send({ status: true, product });
});



/*
@desc     Get One Quantitative Product 
@route    GET /api/admin/quantitative_product/:id
@access   Private
*/
const getOneQuantitativeProduct = asyncHandler(async (req, res) => {
    const { id } = req.params; 
    const quantitative = await Product.findById(id);
  
    if (quantitative) {
      res.status(200).json({
        status: true,
        product:quantitative,
      });
    } else {
      res
        .status(409)
        .json({ status: true, message: "No quantitative product exists with this Id" });
    }
  });



  
/*
@desc     Update One Quantitative Product 
@route    PUT /api/admin/quantitative_product/:id
@access   Private
*/
const updateQuantitativeProduct = asyncHandler(async (req, res) => {
  const { error } = validate(req.body);
  if (error) {
    return res
      .status(400)
      .send({ status: false, message: error?.details[0]?.message });
  }


  if (req.uploadError) {
    res.status(400);
    throw new Error(req.uploadError);
  }
  
  const checkedvalid = await Product.findById(req.params.id)
    if(!checkedvalid)
    {    
        return res.status(400).json({status : true , message : "Quantitative product does not exists!"})        
    }
    const image = req?.files;
    let imageArray = [];

if(image?.length > 0)
{
    image?.map((item) => {
      let icon = `${PATH}/uploads/${item?.filename}`;
      imageArray.push(icon);
    });
    req.body.currency_icons = imageArray;
  
  }
  else{
    req.body.currency_icons=checkedvalid?.currency_icons
  }

       const update = await Product.findByIdAndUpdate(req.params.id, req.body, { new: true });
       if(update)
       {
        return res.status(200).json({status : true , message : "Quantitative product updated successfully" ,product : update})
       }else {
        res.status(400).json({ status: false, message: "Something Error" });
      }
        
  })
export { createQuantitativeProduct, getAllQuantitativeProduct,getOneQuantitativeProduct,updateQuantitativeProduct};
