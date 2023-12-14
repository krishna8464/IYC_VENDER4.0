const { DataTypes } = require('sequelize');
const { sequelize } = require('../config/db');
const { Vender } = require("./venderModel")

const Notification = sequelize.define('Notification', {
  title: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  message: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  bookmark: {
    type: DataTypes.BOOLEAN,
    defaultValue: false,
  },
  read: {
    type: DataTypes.BOOLEAN,
    defaultValue: false,
  },
  posted_by_id: {
    type: DataTypes.INTEGER,
    allowNull: false,
    references: {
      model: Vender,
      key: 'id',
    },
  },
  posted_by_name: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  Notifier_id: {
    type: DataTypes.INTEGER,
    allowNull: false,
    references: {
      model: Vender,
      key: 'id',
    },
  },
  isPublic: {
    type: DataTypes.BOOLEAN,
    allowNull: false,
  },
  state_code: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  notification_status: {
    type: DataTypes.STRING,
    defaultValue: 'posted',
  },
});

// Establish the relationship between Notification and Vender
Notification.belongsTo(Vender, {
  foreignKey: 'posted_by_id',
  as: 'postedBy',
});

Notification.belongsTo(Vender, {
  foreignKey: 'Notifier_id',
  as: 'notifier',
});

sequelize.sync()
  .then(() => {
    console.log('Notification table synced successfully');
  })
  .catch(() => {
    console.log('Failed to sync Notification table');
  });

module.exports = {Notification}
