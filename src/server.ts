import config from "./config/config";
import app from "./app";



const server = app.listen(config.PORT, );

(() => {
  try {
    console.info(`Application started`, {
      meta: {
        port: config.PORT,
        serverUrl: config.SERVER_URL,
      },
    });
  } catch (error) {
    console.error(`Application Error: `, { meta: error });
    server.close((error)=>{
        if(error){
            process.exit(1);
        }
    });
  }
})(); // immediately invoked function
