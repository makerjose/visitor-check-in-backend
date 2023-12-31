const express = require("express");

const {
  createVisitor,
  updateVisitor,
  deleteVisitor,
  fetchVisitors,
} = require("../controllers/visitor-controller");

const visitorRouter = express.Router();

visitorRouter.post("/create", createVisitor);
visitorRouter.put("/update/:visitorId", updateVisitor); 
visitorRouter.get("/fetch", fetchVisitors);
visitorRouter.delete("/delete/:visitorId", deleteVisitor);

module.exports = visitorRouter;
