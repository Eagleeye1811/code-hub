const express = require("express");
const {createRespository,getAllRepositories,fetchRepositoryById,fetchRepositoryByName,fetchRepositoriesForCurrentUser,updateRepositoryById,deleteRepositoryById,toggleVisibilityById} = require("../controllers/repoController");

const repoRouter = express.Router();

repoRouter.post("/repo/create", createRespository);
repoRouter.get("/repo/all", getAllRepositories);
repoRouter.get("/repo/:id", fetchRepositoryById);
repoRouter.get("/repo/name/:name", fetchRepositoryByName);
repoRouter.get("/repo/user/:userID", fetchRepositoriesForCurrentUser);
repoRouter.put("/repo/update/:id", updateRepositoryById);
repoRouter.delete("/repo/delete/:id", deleteRepositoryById);
repoRouter.patch("/repo/toggle/:id", toggleVisibilityById);

module.exports = repoRouter;