import asyncHandler from "#middlewares/asyncHandler";
import { Product, validate } from "#models/contract_product_model";
import { User } from "#models/user_model";
import { Wallet } from "#models/wallet_model";

/**
 @desc     create Ai Order Product
 @route    POST /api/admin/order
 @access   Private
 */

const createContractProduct = asyncHandler(async (req, res) => {
  const { error } = validate(req.body);
  if (error) {
    return res
      .status(400)
      .send({ status: false, message: error?.details[0]?.message });
  }

  const aiOrderCreated = await new Product(req.body).save();
  if (aiOrderCreated) {
    res.status(201).json({
      status: true,
      message: "Contract Product Created Successfully",
    });
  } else {
    res.status(400).json({ status: false, message: "Something Error" });
  }
});

/**
 @desc     Get All AI Order Product
 @route    GET /api/admin/order
 @access   Private
 */
const getAllContractProduct = asyncHandler(async (req, res) => {
  const product = await Product.find({});

  product.length === 0
    ? res.status(200).send({
        status: false,
        message: "Contract Product does not exist",
        product: [],
      })
    : res.status(200).send({ status: true, product });
});

/*
@desc     Get One AI Order Product 
@route    GET /api/admin/order/:id
@access   Private
*/
const getOneContractProduct = asyncHandler(async (req, res) => {
  const { id } = req.params;
  const product = await Product.findById(id);

  if (product) {
    res.status(200).json({
      status: true,
      product,
    });
  } else {
    res
      .status(404)
      .json({
        status: false,
        message: "No Contract product exists with this Id",
      });
  }
});

/*
@desc     Update One AI Order Product 
@route    PUT /api/admin/order/:id
@access   Private
*/
const updateContractProduct = asyncHandler(async (req, res) => {
  const checkedvalid = await Product.findById(req.params.id);
  if (!checkedvalid) {
    return res
      .status(400)
      .json({ status: true, message: "Contract product does not exists!" });
  }
  const update = await Product.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
  });
  if (update) {
    return res
      .status(200)
      .json({
        status: true,
        message: "Contract product updated successfully",
        product: update,
      });
  } else {
    res.status(400).json({ status: false, message: "Something Error" });
  }
});

/**
 @desc     Get All AI Order Product
 @route    GET /api/coin-details/:id
 @access   Private
 */
const getContractProductDetails = asyncHandler(async (req, res) => {
  const { id } = req.params;

  const user = await User.findOne({ user_address: id });

  if (!user) {
    return res
      .status(404)
      .send({ staus: false, message: "User address does not exists" });
  }

  const userWallets = await Wallet.find({ user_address: id , state:'normal'}).select("currency balance");

  let coinDetails = [];
  if (req.query.type) {
    if (userWallets?.length > 0) {
      const product = await Product.find({ currency: req.query.type });

      if (product?.length > 0) {
        product.map((item) => {
          coinDetails.push({ id:item?._id, time: item.deliveryTime, odds: item.odds });
        });
      }
      product.length === 0
      ? res.status(200).send({
          status: false,
          message: "Contract Product Details does not exist",
          product: [],
        })
      : res.status(200).send({ status: true, product:{coinDetails,userWallets} });
      }}
      else{
        res.status(400).send({
          status: false,
          message: "Invalid Fields Coins Type Query Required",
          product: [],
        })
      }




});

export {
  getContractProductDetails,
  createContractProduct,
  getAllContractProduct,
  getOneContractProduct,
  updateContractProduct,
};
