import asyncHandler from "#middlewares/asyncHandler";
import { User , validate } from "#models/user_model";
import { COINS } from "#constant/constant";
import {Wallet,validateWallet} from "#models/wallet_model"
//@desc  Create User
//@route  /user
//@request Post Request
//@acess  public

const createSignUpAndLogin = asyncHandler(async (req, res) => {

  const ip = req.socket?.remoteAddress?.split(':').at(-1)
  req.body.ip = ip;
  req.body.location = "Abc";
console.log(req.body)

  const { error } = validate(req.body);
  if (error) {
    return res
      .status(400)
      .send({ status: false, message: error?.details[0]?.message });
  }

  const userValid = await User.findOne({ user_address: req.body.user_address });

  if (userValid) {
  
  await User.findOneAndUpdate({user_address:req.body.user_address},{ip:ip,last_login:Date.now()})
  
  return res
 .status(200)
 .json({ status: true, message: "User Login Successfully",user:userValid});
  
    }
  else{
 const user = await new User(req.body).save();
 if(user)
 {
for (const currency of COINS)
{
  await new Wallet({
    user_address:user?.user_address,
    currency:currency,
    balance:0,
    ferozen:0
  }).save();
}  
 }
 
 return res
    .status(200)
    .json({ status: true, message: "User Registered Successfully",user});

  }

  }


);

//@desc  User Get One
//@route  /user/:id
//@request Get Request
//@acess  private

const getOneUser = asyncHandler(async (req, res) => {

  const user = await User.findOne({user_address : req.params.id});
  if (user) {
    return res.status(200).json({
      status: true,
      user
    })}
  else {
    return res.status(200).json({ status: true, message: "User does not exists" });
  }
});



//@desc  User All
//@route  /user
//@request Get Request
//@acess  private

const getAllUser = asyncHandler(async (req, res) => {
  const user = await  User.find();
  if (user.length > 0) {
    return res.status(200).json({
      status: true,
      user
    })}
  else {
    return res.status(200).json({ status: true, message: "User record not exists" });
  }
});



//@desc  Update SUer
//@route  /user/:id
//@request Put Request
//@acess  private


const updateProfile = asyncHandler(async (req, res) => {
const checkedvalid = await User.findById(req.params.id)
  if(!checkedvalid)
  {    
      return res.status(400).json({status : true , message : "User does not exists!"})        
  }
     const update = await User.findByIdAndUpdate(req.params.id, req.body, { new: true });
      return res.status(200).json({status : true , message : "User profile updated successfully" ,user : update})
})

/**
 @desc     Delete User
 @route    DELETE /api/user
 @access   Private
 */
 const deleteUser = asyncHandler(async (req, res) => {
  
  const user = await User.findOneAndDelete(req.params.id);

  if (!user)
      return res?.status(200).send({status: false, message: 'nothing to delete'})

  res?.status(200).send({status: true, message: `User deleted successfully`})
})


/**
 @desc     User Wallet
 @route    GET /api/user/wallet/:id
 @access   Private
 */
 const getUserWallet = asyncHandler(async (req, res) => {
  
  const userWallet = await Wallet.find({user_address:req.params.id});

  if (userWallet?.length>0)
      return res?.status(200).send({status: true, wallet:userWallet})

  res?.status(404).send({status: false, message: `Nothing wallet exists with this address`})
})



/**
 @desc     User Wallet
 @route    GET /api/admin/user/wallet
 @access   Private
 */
 const getAllUserWallets = asyncHandler(async (req, res) => {
  
  const userWallet = await Wallet.find({});

  if (userWallet?.length>0)
      return res?.status(200).send({status: true, wallet:userWallet})

  res?.status(404).send({status: false, message: `Nothing wallet exists`})
})




//@desc  Update User Wallet
//@route  /user/wallet/:id
//@request Put Request
//@acess  private


const updateUserWallet = asyncHandler(async (req, res) => {
  const { error } = validateWallet(req.body);
  if (error) {
    return res
      .status(400)
      .send({ status: false, message: error?.details[0]?.message });
  }
  const checkedvalid = await Wallet.findOne({user_address:req.body.user_address,currency:req.body.currency})
    if(!checkedvalid)
    {    
        return res.status(400).json({status : true , message : "User Wallet does not exists!"})        
    }
       const update = await Wallet.findOneAndUpdate({user_address:req.body.user_address}, req.body, { new: true });
        return res.status(200).json({status : true , message : "User wallet updated successfully" ,user : update})
  })
  

export {getAllUserWallets,getUserWallet,createSignUpAndLogin,getOneUser , updateProfile ,getAllUser,deleteUser,updateUserWallet}