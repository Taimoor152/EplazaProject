const jwt = require("jsonwebtoken");
const secret_key = "Asdf_1122";
module.exports = (req, res, next) => {
  //get header
  const authHeader = req.get("Authorization");
  //check header exist or not
  if (!authHeader) {
    req.isAuth = false;
    return next();
  }
  //get token
  const token = authHeader.split(" ")[1];

  //check token
  if (!token || token === "") {
    req.isAuth = false;
    return next();
  }
  let decodedToken;
  try {
    decodedToken = jwt.verify(token, secret_key);
  } catch (err) {
    console.log("err", err);

    req.isAuth = false;
    return next();
  }

  if (!decodedToken) {
    req.isAuth = false;
    return next();
  }
  req.isAuth = true;
  req.user_id = decodedToken.user_id;
  next();
};
