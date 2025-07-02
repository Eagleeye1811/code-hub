const fs = require("fs").promises; //fs is file system comes with node, and promises is a utility which helps to create a file 
const path = require("path");

async function initRepo(){
    const repoPath = path.resolve(process.cwd(), ".code");
    const commitsPath = path.join(repoPath, "commits");

    try{
        await fs.mkdir(repoPath,{recursive: true});
        await fs.mkdir(commitsPath,{recursive: true});
        await fs.writeFile(
            path.join(repoPath,"config.json"),
            JSON.stringify({bucket: process.env.S3_BUCKET})
        );
        console.log("Repository initialized!!");
    }catch(err){
        res.error("Error in initialising repository: ", err);
    }
}

module.exports = {initRepo};