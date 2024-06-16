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

const getAllAmbulance = async (req, res) => {
  try {
    const ambulances = await prisma.user.findMany({
      where: {
        role: "AMBULANCE",
      },
      select: {
        id: true,
        email: true,
        name: true,
        ambulanceProfile: {
          select: {
            phoneNumber: true,
          },
        },
      },
    });
    return res.status(200).json({
      success: true,
      data: ambulances,
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({
      success: false,
      error: "Internal Server Error",
    });
  }
};
const updateAmbulance = async (req, res) => {
  try {
    const { id } = req.params;
    console.log(id);
    const { email, name, password, phoneNumber } = req.body;
    console.log(req.body);

    const ambulanceExist = await prisma.user.findUnique({
      where: {
        id: Number(id), // Ensure id is a number
      },
    });

    if (!ambulanceExist) {
      return res.status(400).json({
        success: false,
        error: "Ambulance not found",
      });
    }

    const user = await prisma.user.update({
      where: {
        id: Number(id),
      },
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

    return res.status(200).json({
      success: true,
      message: "Ambulance updated successfully",
      data: user,
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({
      success: false,
      error: "Internal Server Error",
    });
  }
};
const deleteAmbulance = async (req, res) => {
  try {
    const { id } = req.params;

    // First, delete the associated ambulance profile
    await prisma.ambulanceProfile.deleteMany({
      where: {
        userId: Number(id),
      },
    });

    // Then, delete the user
    const user = await prisma.user.delete({
      where: {
        id: Number(id),
      },
    });

    return res.status(200).json({
      success: true,
      message: "Ambulance deleted successfully",
      data: user,
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({
      success: false,
      error: "Internal Server Error",
    });
  }
};

//hospital

const createHospital = async (req, res) => {
  try {
    const { email, name, password, phoneNumber, location,lat,lng } = req.body;
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
            lat,
            lng
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

const getAllHospital = async (req, res) => {
  try {
    const hospitals = await prisma.user.findMany({
      where: {
        role: "HOSPITAL",
      },
      select: {
        id: true,
        email: true,
        name: true,
        hospitalProfile: {
          select: {
            phoneNumber: true,
            location: true,
            status: true,
          },
        },
      },
    });
    return res.status(200).json({
      success: true,
      data: hospitals,
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({
      success: false,
      error: "Internal Server Error",
    });
  }
};
const updateHospital = async (req, res) => {
  try {
    const { id } = req.params;
    const { email, name, password, phoneNumber, location, status } = req.body;

    const hospitalExist = await prisma.user.findUnique({
      where: {
        id: Number(id), // Ensure id is a number
      },
      include: {
        hospitalProfile: true, // Include the hospitalProfile
      },
    });

    if (!hospitalExist) {
      return res.status(400).json({
        success: false,
        error: "Hospital not found",
      });
    }

    // Check if hospitalProfile exists
    if (!hospitalExist.hospitalProfile) {
      return res.status(400).json({
        success: false,
        error: "Hospital profile not found",
      });
    }

    const user = await prisma.user.update({
      where: {
        id: Number(id),
      },
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

    return res.status(200).json({
      success: true,
      message: "Hospital updated successfully",
      data: user,
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({
      success: false,
      error: "Internal Server Error",
    });
  }
};
const deleteHospital = async (req, res) => {
  try {
    const { id } = req.params;

    // First, delete the associated ambulance profile
    await prisma.hospitalProfile.deleteMany({
      where: {
        userId: Number(id),
      },
    });

    // Then, delete the user
    const user = await prisma.user.delete({
      where: {
        id: Number(id),
      },
    });

    return res.status(200).json({
      success: true,
      message: "Hospital deleted successfully",
      data: user,
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({
      success: false,
      error: "Internal Server Error",
    });
  }
};

//traffic conrtrollers

const createTraffic = async (req, res) => {
  try {
    const { email, name, password, phoneNumber, location } = req.body;
    if (!email || !name || !password || !location || !phoneNumber) {
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

const getAllTraffic = async (req, res) => {
  try {
    const traffic = await prisma.user.findMany({
      where: {
        role: "TRAFFIC",
      },
      select: {
        id: true,
        email: true,
        name: true,
        trafficProfile: {
          select: {
            phoneNumber: true,
            location: true,
            status: true,
          },
        },
      },
    });
    return res.status(200).json({
      success: true,
      data: traffic,
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({
      success: false,
      error: "Internal Server Error",
    });
  }
};
const updateTraffic = async (req, res) => {
  try {
    const { id } = req.params;
    const { email, name, password, phoneNumber, location, status } = req.body;

    const trafficExist = await prisma.user.findUnique({
      where: {
        id: Number(id),
      },
      include: {
        trafficProfile: true,
      },
    });

    if (!trafficExist) {
      return res.status(400).json({
        success: false,
        error: "Traffic not found",
      });
    }

    // Check if hospitalProfile exists
    if (!trafficExist.trafficProfile) {
      return res.status(400).json({
        success: false,
        error: "Hospital profile not found",
      });
    }

    const user = await prisma.user.update({
      where: {
        id: Number(id),
      },
      data: {
        email: email || trafficExist.email,
        name: name || trafficExist.name,
        password: password || trafficExist.password,
        trafficProfile: {
          update: {
            phoneNumber: phoneNumber || trafficExist.trafficProfile.phoneNumber,
            location: location || trafficExist.trafficProfile.location,
            status:
              typeof status === "boolean"
                ? status
                : trafficExist.trafficProfile.status,
          },
        },
      },
    });

    return res.status(200).json({
      success: true,
      message: "Traffic updated successfully",
      data: user,
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({
      success: false,
      error: "Internal Server Error",
    });
  }
};

const deleteTraffic = async (req, res) => {
  try {
    const { id } = req.params;

    // First, delete the associated ambulance profile
    await prisma.trafficProfile.deleteMany({
      where: {
        userId: Number(id),
      },
    });

    // Then, delete the user
    const user = await prisma.user.delete({
      where: {
        id: Number(id),
      },
    });

    return res.status(200).json({
      success: true,
      message: "Traffic deleted successfully",
      data: user,
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({
      success: false,
      error: "Internal Server Error",
    });
  }
};
const createNotification = async (req, res) => {
  const { Tolat, Tolng, Bylat, Bylng } = req.body.selectedHospital;
  console.log(req.body.selectedHospital);
  try {
    const notification = await prisma.notification.create({
      data: {
        Bylat,
        Bylng,
        Tolat,
        Tolng
      }
    });
    res.status(201).json(notification);
  } catch (error) {
    console.log(error);
    res.status(400).json({ error: error.message });
  }
};
const getNotifications = async (req, res) => {
  const { lat, lng } = req.body;
  console.log(lat,lng);
 const Tolat = lat;
 const Tolng = lng;

  try {
    const notifications = await prisma.notification.findMany({
      where: {
        Tolat,
        Tolng
      }
    });
    res.status(200).json(notifications);
  } catch (error) {
    res.status(500).json({ error: 'Internal server error' });
  }
};
const changeNotificationStatus = async (req, res) => {
  const { id, status } = req.body;

  try {
    const notification = await prisma.notification.update({
      where: { id: id },
      data: { status }, 
    });
    res.status(200).json(notification);
  } catch (error) {
    console.error('Error updating notification status:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
};
const getNotificationStatus = async (req, res) => {
  const { Tolat, Tolng } = req.body;
  console.log(req.body,Tolat, Tolng);
  try {
    const notification = await prisma.notification.findFirst({
      where: {
        Tolat: parseFloat(Tolat),
        Tolng: parseFloat(Tolng),
      },
    });

    if (notification) {
      res.status(200).json({ status: notification.status });
    } else {
      res.status(404).json({ error: 'Notification not found' });
    }
  } catch (error) {
    console.error('Error fetching notification status:', error);
    res.status(500).json({ error: 'Internal server error' });
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
  createNotification,
  getNotifications,
  changeNotificationStatus,
  getNotificationStatus
};
