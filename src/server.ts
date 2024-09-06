import config from "./config/config";
import app from "./app";
import logger from "./utils/logger";



const server = app.listen(config.PORT, );

(() => {
  try {
    logger.info(`Application started`, {
      meta: {
        port: config.PORT,
        serverUrl: config.SERVER_URL,
      },
    });
  } catch (error) {
    logger.error(`Application Error: `, { meta: error });
    server.close((error)=>{
        if(error){
            process.exit(1);
        }
    });
  }
})(); // immediately invoked function
