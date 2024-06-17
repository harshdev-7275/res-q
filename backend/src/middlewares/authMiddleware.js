import jwt from "jsonwebtoken";
import { prisma } from "../config/prismaConfig.js";

export const isAuth = async (req, res, next) => {
  let token;
  token = req.cookies.jwt;
  if (!token) {
    res.status(401);
    return res.json({
      success: false,
      message: "Please login first",
    });
  }
  console.log(token);
  try {
    // console.log(process.env.JWT_SECRET);
    const decoded = jwt.verify(token, "wada@342");
    console.log(decoded);
    req.user = await prisma.user.findUnique({
      where: {
        id: decoded.userId,
      },
      select: {
        id: true,
        name: true,
        email: true,
        role: true,
      },
    });
    next();
  } catch (error) {
    console.error(error);
    res.status(501);
    return res.json({
      success: false,
      message: "Internal server error",
    });
  }
};
