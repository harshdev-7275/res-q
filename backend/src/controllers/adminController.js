import { prisma } from "../config/prismaConfig.js";

const createAdmin = async (req, res) => {
  try {
    const { email, name, password } = req.body;
    const adminExist = await prisma.user.findUnique({
      where: { email },
    });
    if (adminExist) {
      return res
        .status(400)
        .json({ success: false, error: "Admin already exists" });
    }
    await prisma.user.create({
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

// Ambulance
const createAmbulances = async (req, res) => {
  try {
    const { email, name, password, phoneNumber } = req.body;
    if (!email || !name || !password || !phoneNumber) {
      return res
        .status(400)
        .json({
          success: false,
          error: "Please provide email, name, password, and phoneNumber",
        });
    }
    const ambulanceExist = await prisma.user.findUnique({ where: { email } });
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
          create: { phoneNumber },
        },
      },
      include: { ambulanceProfile: true },
    });
    return res
      .status(201)
      .json({
        success: true,
        message: "Ambulance created successfully",
        data: user,
      });
  } catch (error) {
    console.error(error);
    return res
      .status(500)
      .json({ success: false, error: "Internal Server Error" });
  }
};

const getAllAmbulance = async (req, res) => {
  try {
    const ambulances = await prisma.user.findMany({
      where: { role: "AMBULANCE" },
      select: {
        id: true,
        email: true,
        name: true,
        ambulanceProfile: { select: { phoneNumber: true } },
      },
    });
    return res.status(200).json({ success: true, data: ambulances });
  } catch (error) {
    console.error(error);
    return res
      .status(500)
      .json({ success: false, error: "Internal Server Error" });
  }
};

const updateAmbulance = async (req, res) => {
  try {
    const { id } = req.params;
    const { email, name, password, phoneNumber } = req.body;

    const ambulanceExist = await prisma.user.findUnique({
      where: { id: Number(id) },
      include: { ambulanceProfile: true },
    });

    if (!ambulanceExist) {
      return res
        .status(400)
        .json({ success: false, error: "Ambulance not found" });
    }

    const user = await prisma.user.update({
      where: { id: Number(id) },
      data: {
        email: email || ambulanceExist.email,
        name: name || ambulanceExist.name,
        password: password || ambulanceExist.password,
        ambulanceProfile: {
          update: {
            phoneNumber:
              phoneNumber || ambulanceExist.ambulanceProfile.phoneNumber,
          },
        },
      },
    });

    return res
      .status(200)
      .json({
        success: true,
        message: "Ambulance updated successfully",
        data: user,
      });
  } catch (error) {
    console.error(error);
    return res
      .status(500)
      .json({ success: false, error: "Internal Server Error" });
  }
};

const deleteAmbulance = async (req, res) => {
  try {
    const { id } = req.params;

    await prisma.ambulanceProfile.deleteMany({ where: { userId: Number(id) } });
    const user = await prisma.user.delete({ where: { id: Number(id) } });

    return res
      .status(200)
      .json({
        success: true,
        message: "Ambulance deleted successfully",
        data: user,
      });
  } catch (error) {
    console.error(error);
    return res
      .status(500)
      .json({ success: false, error: "Internal Server Error" });
  }
};

// Hospital
const createHospital = async (req, res) => {
  try {
    const { email, name, password, phoneNumber, location } = req.body;
    if (!email || !name || !password || !phoneNumber || !location) {
      return res
        .status(400)
        .json({
          success: false,
          error:
            "Please provide email, name, password, location, and phoneNumber",
        });
    }
    const hospitalExist = await prisma.user.findUnique({ where: { email } });
    if (hospitalExist) {
      return res
        .status(400)
        .json({ success: false, error: "Hospital already exists" });
    }
    await prisma.user.create({
      data: {
        email,
        name,
        password,
        role: "HOSPITAL",
        hospitalProfile: {
          create: { phoneNumber, location },
        },
      },
    });
    return res
      .status(201)
      .json({ success: true, message: "Hospital created successfully" });
  } catch (error) {
    console.error(error);
    return res
      .status(500)
      .json({ success: false, error: "Internal Server Error" });
  }
};

const getAllHospital = async (req, res) => {
  try {
    const hospitals = await prisma.user.findMany({
      where: { role: "HOSPITAL" },
      select: {
        id: true,
        email: true,
        name: true,
        hospitalProfile: {
          select: { phoneNumber: true, location: true, status: true },
        },
      },
    });
    return res.status(200).json({ success: true, data: hospitals });
  } catch (error) {
    console.error(error);
    return res
      .status(500)
      .json({ success: false, error: "Internal Server Error" });
  }
};

const updateHospital = async (req, res) => {
  try {
    const { id } = req.params;
    const { email, name, password, phoneNumber, location, status } = req.body;

    const hospitalExist = await prisma.user.findUnique({
      where: { id: Number(id) },
      include: { hospitalProfile: true },
    });

    if (!hospitalExist) {
      return res
        .status(400)
        .json({ success: false, error: "Hospital not found" });
    }

    if (!hospitalExist.hospitalProfile) {
      return res
        .status(400)
        .json({ success: false, error: "Hospital profile not found" });
    }

    const user = await prisma.user.update({
      where: { id: Number(id) },
      data: {
        email: email || hospitalExist.email,
        name: name || hospitalExist.name,
        password: password || hospitalExist.password,
        hospitalProfile: {
          update: {
            phoneNumber:
              phoneNumber || hospitalExist.hospitalProfile.phoneNumber,
            location: location || hospitalExist.hospitalProfile.location,
            status:
              typeof status === "boolean"
                ? status
                : hospitalExist.hospitalProfile.status,
          },
        },
      },
    });

    return res
      .status(200)
      .json({
        success: true,
        message: "Hospital updated successfully",
        data: user,
      });
  } catch (error) {
    console.error(error);
    return res
      .status(500)
      .json({ success: false, error: "Internal Server Error" });
  }
};

const deleteHospital = async (req, res) => {
  try {
    const { id } = req.params;

    await prisma.hospitalProfile.deleteMany({ where: { userId: Number(id) } });
    const user = await prisma.user.delete({ where: { id: Number(id) } });

    return res
      .status(200)
      .json({
        success: true,
        message: "Hospital deleted successfully",
        data: user,
      });
  } catch (error) {
    console.error(error);
    return res
      .status(500)
      .json({ success: false, error: "Internal Server Error" });
  }
};

// Traffic Controllers
const createTraffic = async (req, res) => {
  try {
    const { email, name, password, phoneNumber, location, area } = req.body;
    if (!email || !name || !password || !phoneNumber || !location || !area) {
      return res
        .status(400)
        .json({
          success: false,
          error:
            "Please provide email, name, password, location, phoneNumber, and area",
        });
    }
    const trafficExist = await prisma.user.findUnique({ where: { email } });
    if (trafficExist) {
      return res
        .status(400)
        .json({ success: false, error: "Traffic already exists" });
    }
    await prisma.user.create({
      data: {
        email,
        name,
        password,
        role: "TRAFFIC",
        trafficProfile: {
          create: { phoneNumber, location, area },
        },
      },
    });
    return res
      .status(201)
      .json({ success: true, message: "Traffic Signal created successfully" });
  } catch (error) {
    console.error(error);
    return res
      .status(500)
      .json({ success: false, error: "Internal Server Error" });
  }
};

const getAllTraffic = async (req, res) => {
  try {
    const traffic = await prisma.user.findMany({
      where: { role: "TRAFFIC" },
      select: {
        id: true,
        email: true,
        name: true,
        trafficProfile: {
          select: {
            phoneNumber: true,
            location: true,
            status: true,
            area: true,
          },
        },
      },
    });
    return res.status(200).json({ success: true, data: traffic });
  } catch (error) {
    console.error(error);
    return res
      .status(500)
      .json({ success: false, error: "Internal Server Error" });
  }
};

const updateTraffic = async (req, res) => {
  try {
    const { id } = req.params;
    const { email, name, password, phoneNumber, location, status, area } =
      req.body;

    const trafficExist = await prisma.user.findUnique({
      where: { id: Number(id) },
      include: { trafficProfile: true },
    });

    if (!trafficExist) {
      return res
        .status(400)
        .json({ success: false, error: "Traffic Signal not found" });
    }

    if (!trafficExist.trafficProfile) {
      return res
        .status(400)
        .json({ success: false, error: "Traffic profile not found" });
    }

    const user = await prisma.user.update({
      where: { id: Number(id) },
      data: {
        email: email || trafficExist.email,
        name: name || trafficExist.name,
        password: password || trafficExist.password,
        trafficProfile: {
          update: {
            phoneNumber: phoneNumber || trafficExist.trafficProfile.phoneNumber,
            location: location || trafficExist.trafficProfile.location,
            area: area || trafficExist.trafficProfile.area,
            status:
              typeof status === "boolean"
                ? status
                : trafficExist.trafficProfile.status,
          },
        },
      },
    });

    return res
      .status(200)
      .json({
        success: true,
        message: "Traffic updated successfully",
        data: user,
      });
  } catch (error) {
    console.error(error);
    return res
      .status(500)
      .json({ success: false, error: "Internal Server Error" });
  }
};

const deleteTraffic = async (req, res) => {
  try {
    const { id } = req.params;

    await prisma.trafficProfile.deleteMany({ where: { userId: Number(id) } });
    const user = await prisma.user.delete({ where: { id: Number(id) } });

    return res
      .status(200)
      .json({
        success: true,
        message: "Traffic deleted successfully",
        data: user,
      });
  } catch (error) {
    console.error(error);
    return res
      .status(500)
      .json({ success: false, error: "Internal Server Error" });
  }
};

export {
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
};
