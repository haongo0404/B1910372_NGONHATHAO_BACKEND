const app = require("./app");
const config =require("./app/config");
const MongoDB = require("./app/utils/mongodb.util");

async function starServer(){
    try {
        await MongoDB.connect(config.db.uri);
        console.log("connect to the database!");
        const PORT =config.app.port;
        app.listen(PORT,()=>{
            console.log(`sever is rinning on port ${PORT}.`);
        });
    } catch (error) {
        console.log("connect to the  database!",error);
        process.exit();
    }
}
starServer();