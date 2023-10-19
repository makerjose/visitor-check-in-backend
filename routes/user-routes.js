const express = require("express");
const {
  signup,
  login,
  verifyToken,
  getUser,
  refreshToken,
  logout,
} = require("../controllers/user-controller");

const {
  createVisitor,
  updateVisitor,
  deleteVisitor,
} = require("../controllers/visitor-controller");

const router = express.Router();

router.post("/signup", signup);
router.post("/login", login);
router.get("/user", verifyToken, getUser);
router.get("/refresh", refreshToken, verifyToken, getUser);
router.post("/logout", verifyToken, logout);
router.post("/create", createVisitor);
router.put("/update", updateVisitor);
router.delete("/delete", deleteVisitor);
module.exports = router;

