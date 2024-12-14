
const path = require("path")

const { PrismaClient } = require("@prisma/client");


const prisma = new PrismaClient();

const getServices = async (req,res)=>{
    try {
        const data = await prisma.service.findMany({
            include: {
        whychooseus: true,
    },
        });
        res.status(200).json(data)
        console.log(data)
    } catch (error) {
        res.status(500).json({msg: error.message})
    }
}

const getServiceById = async (req,res)=>{
    const { id } = req.params;
    if(!id) {
        res.status(400).json({error:"id required"})
        }
    try {
        const serviceId = await prisma.service.findUnique({
            where: { id: parseInt(id) },
            include: {
        whychooseus: true, // Include related ServiceList data
      },
        })
        if (!serviceId) {
      return res.status(404).json({ error: 'service not found' });
    }
        res.status(200).json(serviceId)
    } catch (error) {
        res.status(404).json({msg: error.message});
    }
}


const createServiceItem = async (req, res) => {
    const { title, description, whychooseus} = req.body;
    const imagePath = req.file?.filename;

  if (!title || !description || !whychooseus) {
    res.status(400).json({ msg: "Fill all required fields" });
    return;
  }
  let whyChooseUsArray = [];
    if (whychooseus) {
      whyChooseUsArray = JSON.parse(whychooseus);
    }
  try {
    const service = await prisma.service.create({
      data: {
        title: title,
        description: description,
        photo: imagePath,
        whychooseus: {
          create: whyChooseUsArray.map((item) => ({
            description: item.description, // Assuming `reason` is a field in ServiceList
          })),
        },
      },
    });
    console.log(service)
    res.status(200).json(service);
  } catch (error) {
    console.error(error.message);
    res.status(500).json({ error: error.message });
  }
};

const serviceUpdate = async (req, res) => {
  const { id } = req.params; // Assuming service ID is in the route params
  const { title, description, whychooseus } = req.body;
  const imagename = req.file?.filename;


  let whyChooseUsArray = [];
  if (whychooseus) {
    try {
      // Parse the 'whychooseus' field to ensure it contains a valid array of objects
      whyChooseUsArray = JSON.parse(whychooseus);
    } catch (error) {
      return res.status(400).json({ msg: "Invalid 'whychooseus' format" });
    }
  }

  try {
    // Update the Service
    const updatedService = await prisma.service.update({
      where: { id: parseInt(id) },
      data: {
        title,
        photo: imagename,
        description,
        whychooseus: {
          deleteMany: {}, // Remove existing whychooseus entries
          create: whyChooseUsArray.map(item => ({
            description: item.description, // Ensure description is a string
          })),
        },
      },
      include: {
        whychooseus: true,
      },
    });

    if (!updatedService) {
      return res.status(404).json({ error: 'Service not found' });
    }

    res.status(200).json(updatedService);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Failed to update service.' });
  }
};


const deleteService = async (req,res)=>{
    const { id } = req.params; // Assuming the service ID is passed as a route parameter

  try {
    await prisma.serviceList.deleteMany({
      where: { serviceid: parseInt(id) },
    });
    // Delete the service and its associated ServiceList entries
    const deletedService = await prisma.service.delete({
      where: { id: parseInt(id) },
      include: {
        whychooseus: true, // Include the associated whychooseus entries in the response
      },
    });
    if (!deletedService) {
      return res.status(404).json({ error: 'delete service not found' });
    }
    res.status(200).json({
      message: 'Service deleted successfully.',
      deletedService,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Failed to delete service.' });
  }
}



module.exports = {getServices,createServiceItem,serviceUpdate,getServiceById,deleteService}