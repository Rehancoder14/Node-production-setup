import config from "../config/config";

const mongoose = require('mongoose');


// const connectDb = async()=>{
//     try {
       
//         const connect = await mongoose.connect("mongodb+srv://morlucifer61:nmf8NTwsYcVXRZdy@cluster0.qh1hy.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0",);
//         console.log(" Database connected: " , connect.connection.host, connect.connection.name);
//     } catch (error) {
//         console.log(error);
//         process.exit(1); 
//     }
// }

// module.exports  = connectDb;

export default  {
    connectDb:async ()=>{
        try {
            await mongoose.connect(config.DATABASE_URL);
            return  mongoose.connection;
        } catch (error) {
            throw error;
        }
    }
}