const crypto = require("crypto");

function Hash(psw) {
  var pswHash = crypto
    .createHash("sha256")
    .update(psw)
    .digest("hex");
  return pswHash;
}

module.exports.Hash = Hash;