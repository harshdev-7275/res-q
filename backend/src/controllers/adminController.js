import { prisma } from "../config/prismaConfig.js";

const createAdmin = async (req, res) => {
  try {
    const { email, name, password } = req.body;
    const adminExist = await prisma.user.findUnique({
      where: {
        email,
      },
    });
    if (adminExist) {
      return res
        .status(400)
        .json({ success: false, error: "Admin already exists" });
    }
    const admin = await prisma.user.create({
      data: {
        email,
        password,
        name,
        role: "ADMIN",
      },
    });
    return res
      .status(201)
      .json({ success: true, message: "Admin created successfully" });
  } catch (error) {
    console.log(error);
    return res
      .status(500)
      .json({ success: false, error: "Internal Server Error" });
  }
};

//ambulance
const createAmbulances = async (req, res) => {
  try {
    const { email, name, password, phoneNumber } = req.body;
    if (!email || !name || !password || !phoneNumber) {
      return res.status(400).json({
        success: false,
        error: "Please provide email, name, password and phoneNumber",
      });
    }
    const ambulanceExist = await prisma.user.findUnique({
      where: {
        email,
      },
    });
    if (ambulanceExist) {
      return res
        .status(400)
        .json({ success: false, error: "Ambulance already exists" });
    }
    const user = await prisma.user.create({
      data: {
        email,
        name,
        password,
        role: "AMBULANCE",
        ambulanceProfile: {
          create: {
            phoneNumber,
          },
        },
      },
      include: {
        ambulanceProfile: true,
      },
    });
    return res
      .status(201)
      .json({ success: true, message: "Ambulance created successfully" });
  } catch (error) {
    console.error(error);
    return res
      .status(500)
      .json({ success: false, error: "Internal Server Error" });
  }
};

//hospital

const createHospital = async (req, res) => {
  try {
    const { email, name, password, phoneNumber, location } = req.body;
    if (!email || !name || !password || !location || !phoneNumber) {
      return res.status(400).json({
        success: false,
        error: "Please provide email, name, password and location",
      });
    }
    const hospitalExist = await prisma.user.findUnique({
      where: {
        email,
      },
    });
    if (hospitalExist) {
      return res
        .status(400)
        .json({ success: false, error: "Hospital already exists" });
    }
    const user = await prisma.user.create({
      data: {
        email,
        name,
        password,

        role: "HOSPITAL",
        hospitalProfile: {
          create: {
            phoneNumber,
            location,
          },
        },
      },
    });
    return res.status(201).json({
      success: true,
      message: "Hospital created successfully",
    });
  } catch (error) {
    console.error(error);
    return res
      .status(500)
      .json({ success: false, error: "Internal Server Error" });
  }
};

//traffic conrtrollers

const createTraffic = async (req, res) => {
  try {
    const { email, name, password, phoneNumber, location } = req.body;
    if (!email || !name || !password || !location || !phoneNumber ) {
      return res.status(400).json({
        success: false,
        error: "Please provide email, name, password and location",
      });
    }
    const trafficExist = await prisma.user.findUnique({
      where: {
        email,
      },
    });
    if (trafficExist) {
      return res
        .status(400)
        .json({ success: false, error: "Traffic already exists" });
    }
    const user = await prisma.user.create({
      data: {
        email,
        name,
        password,
        role: "TRAFFIC",
        trafficProfile: {
          create: {
            phoneNumber: phoneNumber,
            location,
          },
        },
      },
    });
    return res.status(201).json({
      success: true,
      message: "Traffic created successfully",
    });
  } catch (error) {
    console.error(error);
    return res
      .status(500)
      .json({ success: false, error: "Internal Server Error" });
  }
};

export { createAdmin, createAmbulances, createHospital, createTraffic };
