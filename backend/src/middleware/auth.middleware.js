import jwt from "jsonwebtoken";
import User from "../models/user.model.js";

export const protectRoute = async (req , res , next) => {
 try{
   const token = req.cookies.jwt;

  if(!token){
    return res.status(401).json({
      message: "Not authorized, no token provided"
    })
  }
  const decoded = jwt.verify(token, process.env.JWT_SECRET);

  if(!decoded){
    return res.status(401).json({
      message: "Not authorized, Invalid token"
    })
  }

  const user = await User.findById(decoded.userId).select("-password");

  if(!user){
    return res.status(401).json({
      message: "Not authorized, user does not exist"
    })
  }

  req.user = user;
  next();
 }catch(err){
  if (err instanceof jwt.JsonWebTokenError) {
    return res.status(401).json({
      message: "Not authorized, invalid or expired token",
    });
  }
  console.error("Error in protectRoute middleware:", err);
  res.status(500).json({
    message: "Internal server error",
  });

 }


}