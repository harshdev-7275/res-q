import { generateToken } from "../config/generateToken.js";
import { prisma } from "../config/prismaConfig.js";

const loginUser = async(req, res)=>{
    try {
      
        const {email, password} = req.body ;
        if(!email || !password){
            return res.status(400).json({success: false, error: "Please provide email and password"})
        }
        const userExists = await prisma.user.findUnique({
            where:{
                email
            }
        })
        if(!userExists){
            return res.status(400).json({success: false, error: "User not found"})
        }
        if(userExists.password !== password){
            return res.status(400).json({success: false, error: "Invalid Credentials"})
        }
        generateToken(res, userExists.id);
        return res.status(200).json({
            id : userExists.id,
            email : userExists.email,
            name:userExists.name,
            role : userExists.role,
            lat:userExists?.lat,
            lng:userExists.lng
        })
    } catch (error) {
        console.error(error);
        return res.status(500).json({ success: false, error: "Internal Server Error" });
    }
}
export {loginUser}