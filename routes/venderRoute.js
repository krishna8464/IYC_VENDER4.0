const express = require("express");
const Venderroute = express.Router();
require("dotenv").config();

const jwt = require("jsonwebtoken");

const { Vender } = require("../models/venderModel");
// const { logger } = require("../middleware/logger");
const { authMiddleware } = require("../middleware/auth");
const {
  createVender,
  getOTP,
  validateOTP,
  updateVenderbyid,
  updateVenderbyauth,
  deleteVender,
  getoneVender,
  getallVender,
  getcoutallVender,
  venderLogout,
  venderincCount,
  venderdecCount,
  venderStatistics,
  vendertopScore,
  venderscoreASC,
  venderscoreDESC,
  vendernameASC,
  findVender,
  assignVender,
  assignWorker,
  releaveWorker,
  assignInspector,
  releaveInspector,
  releaveInspectorbyrecordcount,
  getcountofnotassignedUserstoworker,
  getcountofnotassignedUserstoinspectors,
  getmastercountofnotassignedUserstoinspectors,
  getinspectorallassignedUsers,
  getinspectornotverifiedUsers,
  getinspectorverifiedUsers,
  getWorkers,
  getInspectors,
  workergetASC,
  inspectorgetASC,
  workergetDESC,
  inspectorgetDESC,
  getStatisticsbyworkerid,
  getStatisticsbyworkerauth,
  getStatisticsbyinspectorid,
  getStatisticsbyinspectorauth,
  getMasterstatisticsbyinspectorid,
  getMasterstatisticsbyauth,
  getworkerassignedallUsers,
  getworkerverifiedUsers,
  getworkernotverifiedUsers,
  recordInspectorstatistics,
  masterrecordInspectorstatistics,
  unassignedrecordstoInspector,
  masterunassignedrecordstoInspector,
  masterunassignedrecordstotheInspectorreport,
  getverificationfailedRecords,
  getverificationfailedRecordsbyauth,
  inspectorReport,
  masterinspectorReport,
  getverifiedrecordsReport,
  getverificationfailedrecordsReport,
  getverifiedandverificationfailedReport,
  getvenderHistorybyid,
  getoneVenderbyAuth,
  getinspecassignedusersbyconditontoadminUsers,
  getfilterdataforinspector,
  getvenderdistrictsbyid,
  getvenderdistrictsbyauth,
  getvenderHistorybyauth,
  getnominationstatistics,
  getnominationstatisticsbyid,
  getnominationstatisticsbyauth
} = require("../controllers/vendercontroller");

Venderroute.post("/create", createVender);

Venderroute.post("/getOTP", getOTP);

Venderroute.post("/validateOTP", validateOTP);

Venderroute.patch("/update/:id", authMiddleware, updateVenderbyid);

Venderroute.get("/getvenderHistorybyid/:id", getvenderHistorybyid);

Venderroute.get("/getvenderHistorybyauth", authMiddleware, getvenderHistorybyauth)

Venderroute.get("/getvenderdistrictsbyid/:id", getvenderdistrictsbyid);

Venderroute.get("/getvenderdistrictsbyauth", authMiddleware, getvenderdistrictsbyauth);

Venderroute.patch( "/updateVenderbyauth",  authMiddleware,updateVenderbyauth);

Venderroute.delete("/delete/:id", deleteVender);

Venderroute.get("/getone/:id", getoneVender);

Venderroute.get("/getall", getallVender);

Venderroute.get("/getcount", getcoutallVender);

Venderroute.post("/logout", authMiddleware, venderLogout);

Venderroute.patch("/increcount", authMiddleware, venderincCount);

Venderroute.patch("/deccount", authMiddleware, venderdecCount);

Venderroute.get("/venderStatistics", authMiddleware, venderStatistics);

Venderroute.get("/topthree/:state_code", vendertopScore);

Venderroute.get("/venderscoreASC", venderscoreASC);

Venderroute.get("/venderscoreDSC", venderscoreDESC);

Venderroute.get("/vendernameASC", vendernameASC);

Venderroute.get("/search/:key/:value/:state_code", authMiddleware,findVender);
 
Venderroute.post("/assignWorker/:venderid/:recordcount", authMiddleware,assignWorker);

Venderroute.post("/releaveworker/:venderid", authMiddleware,releaveWorker);

Venderroute.post("/assignInspector/:venderid/:recordcount/:state_code", authMiddleware,assignInspector);

Venderroute.post("/releaveInspector/:venderid/:state_code", authMiddleware,releaveInspector);

Venderroute.post("/releaveInspectorbyrecordcount/:venderid/:recordcount/:state_code", authMiddleware,releaveInspectorbyrecordcount);

Venderroute.get("/getcountofnotassignedUserstoworker", getcountofnotassignedUserstoworker);

Venderroute.get("/getcountofnotassignedUserstoinspectors/:state_code", getcountofnotassignedUserstoinspectors);

Venderroute.get("/getmastercountofnotassignedUserstoinspectors", getmastercountofnotassignedUserstoinspectors);

Venderroute.get("/getWorkers", getWorkers);

Venderroute.get("/getInspectors/:state_code", getInspectors);

Venderroute.get("/workergetASC", workergetASC);

Venderroute.get("/workergetDESC", workergetDESC);

Venderroute.get("/inspectorgetASC", inspectorgetASC);

Venderroute.get("/inspectorgetDESC", inspectorgetDESC);

Venderroute.get("/getStatisticsbyworkerid/:workerid", getStatisticsbyworkerid);

Venderroute.get("/getStatisticsbyworkerauth", authMiddleware,getStatisticsbyworkerauth);

Venderroute.get("/getStatisticsbyinspectorid/:inspectorid/:state_code", getStatisticsbyinspectorid);

Venderroute.get("/getStatisticsbyinspectorauth/:state_code", authMiddleware,getStatisticsbyinspectorauth);

Venderroute.get("/getMasterstatisticsbyinspectorid/:inspectorid", getMasterstatisticsbyinspectorid);

Venderroute.get("/getMasterstatisticsbyauth", authMiddleware,getMasterstatisticsbyauth);

Venderroute.get("/getworkerassignedallUsers", authMiddleware,getworkerassignedallUsers);

Venderroute.get("/getworkerverifiedUsers", authMiddleware,getworkerverifiedUsers);

Venderroute.get("/getworkernotverifiedUsers", authMiddleware,getworkernotverifiedUsers);

Venderroute.get("/getinspectornotverifiedUsers", authMiddleware,getinspectornotverifiedUsers);

Venderroute.get("/getinspectorverifiedUsers", authMiddleware,getinspectorverifiedUsers);

Venderroute.get("/getinspectorallassignedUsers", authMiddleware,getinspectorallassignedUsers);

Venderroute.get("/recordInspectorstatistics/:state_code", recordInspectorstatistics);

Venderroute.get("/masterrecordInspectorstatistics", masterrecordInspectorstatistics);

Venderroute.get("/unassignedrecordstoInspector/:page/:state_code", unassignedrecordstoInspector);

Venderroute.get("/masterunassignedrecordstotheInspectorreport", masterunassignedrecordstotheInspectorreport);

Venderroute.get("/masterunassignedrecordstoInspector/:page", masterunassignedrecordstoInspector);

Venderroute.get("/getverificationfailedRecords/:state_code", getverificationfailedRecords);

Venderroute.get("/getverificationfailedRecordsbyauth", authMiddleware, getverificationfailedRecordsbyauth);

Venderroute.get("/inspectorReport/:state_code", inspectorReport);

Venderroute.get("/masterinspectorReport", masterinspectorReport);

Venderroute.get("/getverifiedrecordsReport/:state_code", getverifiedrecordsReport);

Venderroute.get("/getverificationfailedrecordsReport/:state_code", getverificationfailedrecordsReport);

Venderroute.get("/getverifiedandverificationfailedReport/:state_code", getverifiedandverificationfailedReport);

Venderroute.get("/getonebyAuth", authMiddleware, getoneVenderbyAuth);

Venderroute.get("/getinspecassignedusersbyconditontoadminUsers/:msg/:inspectorId", getinspecassignedusersbyconditontoadminUsers);
 
Venderroute.post("/assignVender/:venderid/:userid", authMiddleware, assignVender);

Venderroute.get("/filter/:key/:value/:msg/:venderStatus/:page", authMiddleware, getfilterdataforinspector);

Venderroute.get("/getnominationstatistics", authMiddleware, getnominationstatistics);

Venderroute.get("/getnominationstatisticsbyid/:id", authMiddleware, getnominationstatisticsbyid);

Venderroute.get("/getnominationstatisticsbyauth", authMiddleware, getnominationstatisticsbyauth);




module.exports = { Venderroute };
