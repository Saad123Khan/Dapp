import nodemailer from "nodemailer";
import { PATH } from "#constant/constant";


const email = (email,OTP)=>{
  const mailOptions = {
        from: "sk5908774@gmail.com",
        to: email ,
        subject: "Otp Send By Dapp",
        text: `Your OTP is : ${OTP}`
    }
    
    let transport = nodemailer.createTransport({
        service: "gmail",
        auth: {
          user: "sk5908774@gmail.com",
          pass: "otwduudpsiaonjaz",
        },
      });
      transport.sendMail(mailOptions, (error, info) => {
        if (error) {
          console.log(error);
        }
      });
}

const forgetEmail = (email,verificationId,uniqueString)=>{
  const mailOptions = {
    from: "sk5908774@gmail.com",
    to: email,
    subject: "Verify Your Email",
    html : `<p>Verify your email address to forget the password</p><p>This link 
    <b>expires in 5 minutes</b></p><p>Press <a href=${PATH + "api/user/verify/" +verificationId +"/"+ uniqueString+"/"+email}>here </a>to proceed </p>`,
}
    
    let transport = nodemailer.createTransport({
        service: "gmail",
        auth: {
          user: "sk5908774@gmail.com",
          pass: "otwduudpsiaonjaz",
        },
      });
      transport.sendMail(mailOptions, (error, info) => {
        if (error) {
          console.log(error);
        }
      });
}

export{email ,forgetEmail}