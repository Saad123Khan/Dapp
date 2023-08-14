import express from "express";

import validateObjectId from "#middlewares/validateObjectId";

import { getContractProductDetails } from "#controllers/admin/ContractProductController";

import { updateContractOrderSuccess } from "#controllers/admin/ContractOrderController";

const contractRoute = express.Router();

contractRoute
  .route("/coins-details/:id")
  .get(getContractProductDetails);

contractRoute
  .route("/contract/update/:id")
  .put(validateObjectId, updateContractOrderSuccess);

export default contractRoute;
