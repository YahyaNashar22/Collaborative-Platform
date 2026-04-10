import chalk from "chalk";
import Service from "../models/serviceModel.js";
import User from "../models/userModel.js";

// Create Service
export const createServiceService = async ({ name, description, image }) => {
  try {
    const newService = new Service({
      name,
      description,
      image,
    });
    await newService.save();
    console.log(
      chalk.green.bold(`${newService.name} Service Created Successfully!`)
    );
    return newService;
  } catch (error) {
    console.log(chalk.red.bold("Failed To Create Service!"));
    console.error(error);
  }
};

// Edit Service
export const editServiceService = async (
  serviceId,
  { name, description, image }
) => {
  try {
    const editedService = await Service.findByIdAndUpdate(
      serviceId,
      {
        name,
        description,
        image,
      },
      { new: true }
    );
    console.log(
      chalk.green.bold(`${editedService.name} Service Edited Successfully!`)
    );
    return editedService;
  } catch (error) {
    console.log(chalk.red.bold("Failed To Edit Service!"));
    console.error(error);
  }
};

// Delete Service
export const deleteServiceService = async (serviceId) => {
  try {
    const deletedService = await Service.findByIdAndDelete(serviceId);
    console.log(
      chalk.green.bold(`${deletedService.name} Service Deleted Successfully!`)
    );
    return deletedService;
  } catch (error) {
    console.log(chalk.red.bold("Failed To Delete Service!"));
    console.error(error);
  }
};

// Get All Services
export const getAllServicesService = async () => {
  try {
    const services = await Service.aggregate([
      {
        $lookup: {
          from: "users",
          let: { serviceId: "$_id" },
          pipeline: [
            {
              $match: {
                $expr: {
                  $and: [
                    { $eq: ["$role", "provider"] },
                    { $eq: ["$banned", false] },
                    { $in: ["$$serviceId", "$services"] },
                  ],
                },
              },
            },
            {
              $project: {
                _id: 1,
              },
            },
          ],
          as: "providers",
        },
      },
      {
        $addFields: {
          providerCount: { $size: "$providers" },
          hasActiveProviders: { $gt: [{ $size: "$providers" }, 0] },
        },
      },
      {
        $project: {
          providers: 0,
        },
      },
      {
        $sort: { createdAt: -1 },
      },
    ]);
    console.log(chalk.green.bold("All Services Retrieved Successfully!"));
    return services;
  } catch (error) {
    console.log(chalk.red.bold("Failed To Fetch all Services!"));
    console.error(error);
  }
};

export const getAvailableServicesService = async () => {
  try {
    const activeProviderServices = await User.aggregate([
      {
        $match: {
          role: "provider",
          banned: false,
          services: { $exists: true, $ne: [] },
        },
      },
      {
        $unwind: "$services",
      },
      {
        $group: {
          _id: "$services",
        },
      },
    ]);

    const serviceIds = activeProviderServices.map(({ _id }) => _id);

    return await Service.find({ _id: { $in: serviceIds } })
      .sort({ createdAt: -1 })
      .select("_id name description");
  } catch (error) {
    console.log(chalk.red.bold("Failed To Fetch available Services!"));
    console.error(error);
    return [];
  }
};

// Get One Service By Id
export const getSingleServiceByIdService = (serviceId) => {
  try {
    const service = Service.findById(serviceId);
    console.log(
      chalk.green.bold(`${service.name} Service Fetched Successfully!`)
    );
    return service;
  } catch (error) {
    console.log(chalk.red.bold("Failed To Fetch Requested Service!"));
    console.error(error);
  }
};
