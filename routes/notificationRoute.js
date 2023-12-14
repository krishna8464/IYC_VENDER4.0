const express = require("express");
const Notification = express.Router();
const { logger } = require("../middleware/logger");
// const { State } = require("../models/stateModel");
const { Op } = require("sequelize");
const { sequelize } = require("../config/db");
const { authMiddleware } = require("../middleware/auth");


const {
    postNotification ,
    updateNotification,
    getNotificationbyauth
 } = require("../controllers/notificationcontroller")

Notification.post("/postNotification" , logger , authMiddleware , postNotification);

Notification.patch("/updateNotification/:id" , logger , authMiddleware , updateNotification);

Notification.get("/getNotificationbyauth/:read/:bookmark/:page" , logger , authMiddleware , getNotificationbyauth);



module.exports = { Notification };