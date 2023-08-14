import express from "express";
import { multerUpload } from "#utils/multer";





import { getAllUser , deleteUser,getAllUserWallets,updateUserWallet } from "#controllers/admin/user.controller";

import { createQuantitativeProduct, getAllQuantitativeProduct,getOneQuantitativeProduct,updateQuantitativeProduct} from "#controllers/admin/QuantitativeProductController";


import { createQuantitativeOrder, getAllQuantitativeOrder,getOneQuantitativeOrder,updateQuantitativeOrder} from "#controllers/admin/QuantitativeOrderController";



import { createMiningProduct, getAllMiningProduct,getOneMiningProduct,updateMiningProduct} from "#controllers/admin/MiningProductController";
import { createContractProduct, getAllContractProduct,getOneContractProduct,updateContractProduct} from "#controllers/admin/ContractProductController";

import { createContractOrder, getAllContractOrder,getOneContractOrder,updateContractOrder} from "#controllers/admin/ContractOrderController";

import {createMiningOrder, getAllMiningOrder,getOneMiningOrder,updateMiningOrder} from "#controllers/admin/MiningOrderController";



import validateObjectId from "#middlewares/validateObjectId";

const adminRoute = express.Router(); 

//Routes User
adminRoute.delete("/user/:id",deleteUser);

adminRoute
.route('/user/wallet')
.get(getAllUserWallets)
.put(updateUserWallet)


getAllUserWallets
adminRoute
.route('/user')
.get(getAllUser)




//Routes Quantitattive Product


adminRoute
  .route("/quantitative-product/:id")
  .get(validateObjectId,getOneQuantitativeProduct)
  .put(multerUpload.array("image"),validateObjectId,updateQuantitativeProduct)



adminRoute
  .route("/quantitative-product")
  .get(getAllQuantitativeProduct)
  .post(multerUpload.array("image"), createQuantitativeProduct)


//Routes Quantitattive Order


adminRoute
  .route("/quantitative-order/:id")
  .get(validateObjectId,getOneQuantitativeOrder)
  .put(validateObjectId,updateQuantitativeOrder)



adminRoute
  .route("/quantitative-order")
  .get(getAllQuantitativeOrder)
  .post(createQuantitativeOrder)
  

  
//Routes Mining Product

  adminRoute
  .route("/mining-product/:id")
  .get(validateObjectId,getOneMiningProduct)
  .put(validateObjectId,updateMiningProduct)


  adminRoute
    .route("/mining-product")
    .get(getAllMiningProduct)
    .post(createMiningProduct)
  


//Routes Mining Order

  adminRoute
  .route("/mining-order/:id")
  .get(validateObjectId,getOneMiningOrder)
  .put(validateObjectId,updateMiningOrder)


  adminRoute
    .route("/mining-order")
    .get(getAllMiningOrder)
    .post(createMiningOrder)


  
//Routes Contract Product
 
adminRoute
.route("/contract-product/:id")
.get(validateObjectId,getOneContractProduct)
.put(validateObjectId,updateContractProduct)


adminRoute
  .route("/contract-product")
  .get(getAllContractProduct)
  .post(createContractProduct)



//Routes Contract Order
 
adminRoute
.route("/contract-order/:id")
.get(validateObjectId,getOneContractOrder)
.put(validateObjectId,updateContractOrder)


adminRoute
  .route("/contract-order")
  .get(getAllContractOrder)
  .post(createContractOrder)



export default adminRoute;
