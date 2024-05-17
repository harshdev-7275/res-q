import express from "express"
import { createAdmin,createAmbulances,createHospital, createTraffic } from "../controllers/adminController.js";
import { isAuth } from "../middlewares/authMiddleware.js";



const router = express.Router()

router.post("/create-admin", createAdmin);

//create ambulance

router.post("/create-ambulance",isAuth, createAmbulances);


//create hospital

router.post("/create-hospital",isAuth, createHospital);


// create traffci

router.post("/create-traffic", isAuth, createTraffic)

export default router;