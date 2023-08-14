const express = require("express");
const app = express();
var cors = require("cors");
const speakeasy = require("speakeasy");
const qrcode = require("qrcode");
const fs = require("fs").promises;
const port = 5000;

app.use(cors());

app.get("/getQrCode", (req, res) => {
  var secret = speakeasy.generateSecret({
    name: "Coin",
    option: {
      encoding: "base32",
    },
  });
  fs.writeFile("token.json", JSON.stringify(secret));
  qrcode.toDataURL(`${secret.otpauth_url}`, (err, data) => {
    res.json(data);
  });
  console.log("🚀 ~ file: index.js:23 ~ secret:", secret);
});

app.get("/verify2FA/:code", async (req, res) => {
  const code = req.params.code;
  let token = await fs.readFile("token.json");

  token = JSON.parse(JSON.stringify(token));

  const verify = await speakeasy.totp.verify({
    secret: token.base32,
    encoding: "base32",
    token: code,
  });
  res.json(verify);
});

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
