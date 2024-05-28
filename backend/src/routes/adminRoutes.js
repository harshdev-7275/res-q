import express from "express";
import {
  createAdmin,
  createAmbulances,
  createHospital,
  createTraffic,
  getAllAmbulance,
  updateAmbulance,
  deleteAmbulance,
  getAllHospital,
  updateHospital,
  deleteHospital,
  getAllTraffic,
  updateTraffic,
  deleteTraffic,
} from "../controllers/adminController.js";
import { isAuth } from "../middlewares/authMiddleware.js";

const router = express.Router();

router.post("/create-admin", createAdmin);

//create ambulance

router.post("/create-ambulance", createAmbulances);
router.get("/get-all-ambulance", getAllAmbulance);
router.put("/update-ambulance-byId/:id", updateAmbulance);
router.delete("/delete-ambulance-byId/:id", deleteAmbulance);

//create hospital

router.post("/create-hospital", createHospital);
router.get("/get-all-hospital", getAllHospital);
router.put("/update-hospital-byId/:id", updateHospital);
router.delete("/delete-hospital-byId/:id", deleteHospital);

// create traffic

router.post("/create-traffic", createTraffic);
router.get("/get-all-traffic", getAllTraffic);
router.put("/update-traffic-byId/:id", updateTraffic);
router.delete("/delete-traffic-byId/:id", deleteTraffic);

export default router;
