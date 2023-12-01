const Visitor = require("../model/Visitor");
const User = require('../model/User');
const moment = require('moment-timezone');
const createTransporter = require('./email');

const createVisitor = async (req, res, next) => {
  try {
    const { firstName, lastName, idNo, email, phoneNumber, department, unitToken } = req.body;

    // Convert local time to UTC time
    const localTime = moment.tz('Africa/Nairobi');
    // const utcTime = localTime.utc();

    // Add 3 hours to the UTC time
    const checkInTime = localTime.add(3, "hours");

    // Create a new visitor object with the modified checkInTime
    const visitor = new Visitor({
      firstName,
      lastName,
      idNo,
      email,
      phoneNumber,
      department,
      unitToken,
      checkInTime, 
    });

    // Save to the database
    await visitor.save();

    // Send an email to the visitor
    const transporter = createTransporter();

    const mailOptions = {
      from: 'josemakerdeng@gmail.com',
      to: visitor.email, // send to visitor's email address
      subject: 'Welcome to USIU',
      text: `Hi ${visitor.lastName}, Welcome to USIU! Your unique token is: ${unitToken}`,
    };

    try {
      const info = await transporter.sendMail(mailOptions); // sending email
      console.log('Email sent:', info.response);
    } catch (error) {
      console.error('Error sending email:', error);
    }

    return res.status(201).json({ message: "Visitor created successfully", visitor });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "Failed to create visitor" });
  }
};


const updateVisitor = async (req, res, next) => {
  try {
    const { visitorId } = req.params;

    // Find the visitor by ID
    const visitor = await Visitor.findById(visitorId);

    if (!visitor) {
      return res.status(404).json({ message: "Visitor not found" });
    }

    // Calculate the checkOutTime by adding 3 hours to the current time
    const localTime = moment.tz('Africa/Nairobi');
    const checkOutTime = localTime.add(3, 'hours');

    // Update the 'checkOutTime' and 'served' fields
    visitor.checkOutTime = checkOutTime;
    visitor.served = true;

    // Save the changes to the database
    await visitor.save();

    return res.status(200).json({ message: "Visitor updated successfully", visitor });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "Failed to update visitor" });
  }
};

const fetchVisitors = async (req, res) => {
  try {
    const { searchTerm } = req.query;

    let query = {};
    if (searchTerm) {
      // If searchTerm is provided, filter based on it
      const startDate = new Date(searchTerm);
      startDate.setHours(0, 0, 0, 0);

      const endDate = new Date(searchTerm);
      endDate.setHours(23, 59, 59, 999);

      query = {
        $or: [
          { firstName: { $regex: new RegExp(searchTerm, 'i') } },
          { lastName: { $regex: new RegExp(searchTerm, 'i') } },
          { email: { $regex: new RegExp(searchTerm, 'i') } },
          { phoneNumber: { $regex: new RegExp(searchTerm, 'i') } },
          { checkInTime: { $gte: startDate, $lt: endDate } },
        ],
      };
    }

    const visitors = await Visitor.find(query).sort({ checkInTime: -1 });
    res.json(visitors);
  } catch (error) {
    console.error("Failed to fetch visitors:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};



const deleteVisitor = async (req, res, next) => {
  try {
    const { visitorId } = req.params;

    // Find the visitor by ID and remove it
    const visitor = await Visitor.findByIdAndRemove(visitorId);

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
exports.fetchVisitors = fetchVisitors;