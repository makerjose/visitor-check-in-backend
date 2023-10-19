const Visitor = require("../model/Visitor");

const createVisitor = async (req, res, next) => {
  try {
    const { firstName, lastName, email, phoneNumber, department, unitToken } = req.body;

    // Create a new visitor object
    const visitor = new Visitor({
      firstName,
      lastName,
      email,
      phoneNumber,
      department,
      unitToken,
    });

    // Save to the database
    await visitor.save();

    return res.status(201).json({ message: "Visitor created successfully", visitor });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "Failed to create visitor" });
  }
};



const updateVisitor = async (req, res, next) => {
  try {
    const { visitorId } = req.params;
    const { checkOutTime } = req.body;

    // Find the visitor by ID and update the checkOutTime
    const visitor = await User.findByIdAndUpdate(visitorId, { checkOutTime }, { new: true });

    if (!visitor) {
      return res.status(404).json({ message: "Visitor not found" });
    }

    return res.status(200).json({ message: "Visitor updated successfully", visitor });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "Failed to update visitor" });
  }
};


const deleteVisitor = async (req, res, next) => {
  try {
    const { visitorId } = req.params;

    // Find the visitor by ID and remove it
    const visitor = await User.findByIdAndRemove(visitorId);

    if (!visitor) {
      return res.status(404).json({ message: "Visitor not found" });
    }

    return res.status(200).json({ message: "Visitor deleted successfully" });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "Failed to delete visitor" });
  }
};

exports.createVisitor = createVisitor;
exports.updateVisitor = updateVisitor;
exports.deleteVisitor = deleteVisitor;
