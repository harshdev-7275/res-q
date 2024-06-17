import jwt from "jsonwebtoken"


export const generateToken = (res, userId)=>{
    const token = jwt.sign({userId}, "wada@342",{
        expiresIn: "30d"
    })
    res.cookie("jwt", token,{
        httpOnly: true,
        // secure: process.env.NODE_ENV !== "development",
        sameSite: "strict",
        maxAge: 30 * 24 * 60 * 60 * 1000,
    })
}