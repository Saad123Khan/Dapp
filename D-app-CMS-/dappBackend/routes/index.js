import error from "#middlewares/error";

import contractRoute from "#routes/contract.routes";
import userRoute from "#routes/user.routes";

import adminRoute from "#routes/admin.routes";

const routes = (app) => {
  // app.get("*",(req,res)=>{
  //   res.send("404 Page Not Found!")
  // })

  app.use(error);

  //User
  app.use("/api", userRoute);

  
  
  //Contract
  app.use("/api", contractRoute);

  //Admin
  app.use("/api/admin", adminRoute);

};
export default routes;
