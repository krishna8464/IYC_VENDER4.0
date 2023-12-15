const express = require("express");
const Userroute = express.Router();
const { Users } = require("../models/userModel");
const { logger } = require("../middleware/logger");
const {
  createUser,
  getUsers,
  mastergetUsers,
  updatebyId,
  deletebyId,
  getuserbyId,
  getCount,
  filterbyStatus,
  masterfilterbyStatus,
  getallcount,
  findUser,
  adminfindUser,
} = require("../controllers/usercontroller");
const { authMiddleware } = require("../middleware/auth");

Userroute.get("/database", async (req, res) => {
  res.send("Working");
});

Userroute.post("/create", createUser);

Userroute.get("/get/:state_code/:page", authMiddleware, getUsers);

Userroute.get("/masterget/:page", authMiddleware, mastergetUsers);

Userroute.patch("/update/:id", authMiddleware, updatebyId);

Userroute.delete("/delete/:id",authMiddleware, deletebyId);

Userroute.get("/getone/:id",authMiddleware, getuserbyId);

Userroute.get("/getnumber/:state_code",authMiddleware, getCount);

Userroute.get("/filter/:key/:value/:msg/:venderStatus/:state_code/:page",authMiddleware , filterbyStatus );

Userroute.get("/masterfilterbyStatus/:page",authMiddleware,masterfilterbyStatus);

Userroute.get("/getallcount",authMiddleware, getallcount);

Userroute.get("/search/:key/:value",authMiddleware, findUser);

Userroute.get("/adminfindUser/:key/:value/:page",authMiddleware,adminfindUser);

module.exports = { Userroute };
