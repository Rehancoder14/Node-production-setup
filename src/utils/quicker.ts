import os from 'os';
import config from '../config/config';

export default{
    getSystemHealth: ()=>{
        return {
            cpuUsage: os.loadavg(),
            totalmemory:  `${os.totalmem() /1024/1024} MB`,
            freememory:  `${os.freemem() /1024/1024} MB`,
        }
    },
    getApplicationHealth:()=>{
        return {
            environment: config.ENV,
            uptime: `${os.uptime().toFixed(2)} seconds`,
            memoryusage:{
                heapTotal:  `${process.memoryUsage().heapTotal /1024/1024} MB`,
                heapUsed:  `${process.memoryUsage().heapUsed /1024/1024} MB`,
            },
            version: process.version
        }
    }
}