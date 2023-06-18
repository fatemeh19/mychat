import '../utils/loadEnv.js'
import jwt from "jsonwebtoken";
const createJWT = ( payload ) => {
 
  const token = jwt.sign(payload, process.env.JWT_SECRET_KEY, {
    expiresIn: '30d',
  });
  return token;
};

export default createJWT
