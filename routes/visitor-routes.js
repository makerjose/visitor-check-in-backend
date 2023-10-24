const express = require("express");

const {
  createVisitor,
  updateVisitor,
  deleteVisitor,
  fetchVisitors,
} = require("../controllers/visitor-controller");

const visitorRouter = express.Router();

visitorRouter.post("/create", createVisitor);
visitorRouter.put("/update", updateVisitor);
visitorRouter.get("/fetch", fetchVisitors);
visitorRouter.delete("/delete", deleteVisitor);

module.exports = visitorRouter;

