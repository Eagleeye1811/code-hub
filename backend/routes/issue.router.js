const express = require("express");
const {createIssue,updateIssueById,deleteIssueById,getAllIssues,getIssueById} = require("../controllers/issueController");

const issueRouter = express.Router();

issueRouter.post("/issue/create", createIssue);
issueRouter.put("/issue/update/:id", updateIssueById);
issueRouter.delete("/issue/delete/:id", deleteIssueById);
issueRouter.get("/issue/all", getAllIssues);
issueRouter.get("/issue/:id", getIssueById);

module.exports = issueRouter;