const { Vender } = require("../models/venderModel");
// const { client } = require("../config/db");
const { Tocken } = require("../models/tockenModel");
const { Users } = require("../models/userModel");
const { Nominationbackup } = require("../models/nominationbackeup");
const { Nomination } = require("../models/nomination");
const { Notification } = require("../models/notificationModel")
const { sequelize } = require("../config/db");
const { Sequelize, DataTypes, Op } = require("sequelize");


exports.postNotification = async ( req , res ) => {
    const ID = req.body.venderId;
    try {
      const notifications = req.body;
      if (!Array.isArray(notifications)) {
        return res.status(400).json({ error: 'Invalid request body. Expecting an array of notifications.' });
      };
  
       // Map iteration to add state_code, posted_by_id, and posted_by_name to each notification
       const notificationsWithDetails = await Promise.all(
        notifications.map(async (notification) => {
          // Find Vender based on the primary key obtained from the authentication key
          const vender = await Vender.findByPk(ID);
  
          // If Vender details are found, add them to the notification
          if (vender) {
            return {
              ...notification,
              state_code: vender.state_code,
              posted_by_id: vender.id,
              posted_by_name: vender.name,
            };
          } else {
            return null;
          }
        })
      );
  
     const validNotifications = notificationsWithDetails.filter((notification) => notification !== null);
     const Notifications =  await Notification.bulkCreate(validNotifications);
      res.status(201).json({Notifications});
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Internal Server Error.' });
    }
};

exports.updateNotification = async ( req , res ) => {
    let id = req.params["id"];
try {
     const notification = await Notification.findByPk(id);

     if (!notification) {
       return res.status(404).json({ error: 'Notification not found' });
     }
    //  req.body.notification_status="Edited"
 
     const updatedNotification = await notification.update(req.body);
 
     res.status(200).json(updatedNotification);
    
} catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error' });
}
};

exports.getNotificationbyauth = async ( req , res ) => {
    const ID = req.body.venderId;
    try {
  const bookmark = req.params["bookmark"];
  const readstatus = req.params["read"];
  const page = req.params["page"];
  const user = await Vender.findByPk(ID);
  const state_code = user.state_code;

  const whereConditions = {};
  whereConditions.Notifier_id = ID;
  whereConditions.state_code = state_code;
  if (bookmark === "0") {
    whereConditions.bookmark = false;
  }
  if (readstatus === "0") {
    whereConditions.read = false;
  };
  if (bookmark != "0") {
    whereConditions.bookmark = true;
  }
  if (readstatus != "0" && bookmark === "0") {
    whereConditions.read = true;
    delete whereConditions.bookmark
  };

      const limit = 10;
      const offset = (page - 1) * limit;
      const userRecords = await Notification.findAndCountAll({
        where: whereConditions,
        limit: limit,
        offset: offset,
      });
      res.status(200).send(userRecords);
        
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Internal Server Error' });
    }
}

