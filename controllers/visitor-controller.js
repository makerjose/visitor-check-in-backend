const Visitor = require("../model/Visitor");
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
        // Fetch all visitor records from the database
        const visitors = await Visitor.find();
    
        // Send the visitor data as a JSON response
        res.status(200).json(visitors);
      } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Failed to fetch visitors" });
      }
}

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
exports.fetchVisitors = fetchVisitors;