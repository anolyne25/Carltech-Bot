








const fs = require('fs-extra');
const { Sequelize } = require('sequelize');
if (fs.existsSync('config.env'))
    require('dotenv').config({ path: __dirname + '/config.env' });
const path = require("path");
const databasePath = path.join(__dirname, './database.db');
const DATABASE_URL = process.env.DATABASE_URL === undefined
    ? databasePath
    : process.env.DATABASE_URL;
module.exports = { session: process.env.SESSION_ID || 'SPARK-X-2025;;;eyJub2lzZUtleSI6eyJwcml2YXRlIjp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoiSUp6K0pOdzVYbVJlQ3lWMGd3ZHREbDMrZUlsUll0MStzUlJVV3VINituZz0ifSwicHVibGljIjp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoiRXpGZldTUEVpNmxvWUtaL0FPQlRvMTlyS2VWbG1QeTBZdStRY0NWRFR4Yz0ifX0sInBhaXJpbmdFcGhlbWVyYWxLZXlQYWlyIjp7InByaXZhdGUiOnsidHlwZSI6IkJ1ZmZlciIsImRhdGEiOiJJRlM1bjZEajBweGZ6d24wRHozOTI1ZmZaeE1VQU1POVlXZzRYOHFoczBNPSJ9LCJwdWJsaWMiOnsidHlwZSI6IkJ1ZmZlciIsImRhdGEiOiI5czRBOTNOWEtheTBMNXFSSGxUMjZmTmI5MmY1ckFlSmZhdGJNY1BxSmxrPSJ9fSwic2lnbmVkSWRlbnRpdHlLZXkiOnsicHJpdmF0ZSI6eyJ0eXBlIjoiQnVmZmVyIiwiZGF0YSI6ImtNQzE5WTZNT2NNMW1wd3JZbkoyZFlVUGE2Qk9PbGFuTjhSZXVoRndxRWc9In0sInB1YmxpYyI6eyJ0eXBlIjoiQnVmZmVyIiwiZGF0YSI6IjBPMHRDZzAzY1EzUEFhbk5VU2d6VDhLVUF3TkdYSjJTN2JEekxwSWlLUW89In19LCJzaWduZWRQcmVLZXkiOnsia2V5UGFpciI6eyJwcml2YXRlIjp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoiMkljY0daL0xwVkF5a1lWQmZNQ0lmWVY3Y3dES2IvOTN0MGJ0RDBWdjBGUT0ifSwicHVibGljIjp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoiS05QbGhFalV3MDNLTGlDWkdCNllEMXovdVNEQWtpZ2wvb3VFTGcycmwyTT0ifX0sInNpZ25hdHVyZSI6eyJ0eXBlIjoiQnVmZmVyIiwiZGF0YSI6InY3MHJDZmFsNEE4RnJXNXFCVFFQTnNtNm1SWDRFWHBYVUF4RTJVYTdpOHl3K2ZyalhBL3hxNW1PODVTYWFaaE81M1l4TkZGVitEMklJK2tqQjAxd2dRPT0ifSwia2V5SWQiOjF9LCJyZWdpc3RyYXRpb25JZCI6MTQyLCJhZHZTZWNyZXRLZXkiOiJmOVhVd2NQWkt1SW5wdTMvV2drcElhZGY0UGgvclZLRlh6SC9DYmFyaUF3PSIsInByb2Nlc3NlZEhpc3RvcnlNZXNzYWdlcyI6W10sIm5leHRQcmVLZXlJZCI6NjEsImZpcnN0VW51cGxvYWRlZFByZUtleUlkIjo2MSwiYWNjb3VudFN5bmNDb3VudGVyIjoxLCJhY2NvdW50U2V0dGluZ3MiOnsidW5hcmNoaXZlQ2hhdHMiOmZhbHNlfSwiZGV2aWNlSWQiOiJzSkh5NW5Ob1RMaUktdDNkY2tqNXZnIiwicGhvbmVJZCI6IjExY2VmMDI5LTg4YWEtNGExMC1iZjBkLTFlZjcxNjgxYzExNyIsImlkZW50aXR5SWQiOnsidHlwZSI6IkJ1ZmZlciIsImRhdGEiOiIvcWxyWkF3RlZFN2RVeDdXTEpsT3lQdFBvYmc9In0sInJlZ2lzdGVyZWQiOnRydWUsImJhY2t1cFRva2VuIjp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoic1c1N2cxaklwV1czZUJnSjh6UzY0ZGtRV0dNPSJ9LCJyZWdpc3RyYXRpb24iOnt9LCJwYWlyaW5nQ29kZSI6IlpWUkUzVDk3IiwibWUiOnsiaWQiOiIyNTQ3OTM3NTMzMjc6NjZAcy53aGF0c2FwcC5uZXQiLCJuYW1lIjoi8J2QjfCdkJ7wnZCw8J2QrfCdkKjwnZCnIPCdkIDwnZCn8J2QnfCdkJrwnZCl8J2QmiJ9LCJhY2NvdW50Ijp7ImRldGFpbHMiOiJDS3JpL2FvQ0VNcmsrY0FHR0FNZ0FDZ0EiLCJhY2NvdW50U2lnbmF0dXJlS2V5Ijoid3dNd01wc1IrdUxpdnZoMmQ0MVhhTWtRbXVlcGllaUVtQjJ6cUJkcFNsQT0iLCJhY2NvdW50U2lnbmF0dXJlIjoiSE0za1lON2E2M0RSNmt5QUl2UTRSN0oyejJ1RXdwaTgrRkhxcmJUS2txMFlsN2FMRW9YUTZuaytSWjV5ZjBqd2t3YmRlZUVkcWRZQWRsM3UyU0ZZQVE9PSIsImRldmljZVNpZ25hdHVyZSI6Inp0OVAxK2szYS9rZG9hcW5YUnZxUHFRRkpuKzVWZTBiSFdxaDNUSzIwSTVFTkszcVltaUdyRWJkbWhPbjYvMXhXYnRTckdOZmpJNEQ5VDRLN2EydGhnPT0ifSwic2lnbmFsSWRlbnRpdGllcyI6W3siaWRlbnRpZmllciI6eyJuYW1lIjoiMjU0NzkzNzUzMzI3OjY2QHMud2hhdHNhcHAubmV0IiwiZGV2aWNlSWQiOjB9LCJpZGVudGlmaWVyS2V5Ijp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoiQmNNRE1ES2JFZnJpNHI3NGRuZU5WMmpKRUpybnFZbm9oSmdkczZnWGFVcFEifX1dLCJwbGF0Zm9ybSI6InNtYmEiLCJsYXN0QWNjb3VudFN5bmNUaW1lc3RhbXAiOjE3NDY4MjU4MTYsIm15QXBwU3RhdGVLZXlJZCI6IkFBQUFBRVlaIn0=',
    PREFIXE: process.env.PREFIX || ".",
    OWNER_NAME: process.env.OWNER_NAME || "®NEWTON",
    NUMERO_OWNER : process.env.NUMERO_OWNER || "254793753327",              
    AUTO_READ_STATUS: process.env.AUTO_READ_STATUS || "yes",
    AUTO_DOWNLOAD_STATUS: process.env.AUTO_DOWNLOAD_STATUS || 'no',
    BOT : process.env.BOT_NAME || 'SPARK-X-2025',
    URL : process.env.BOT_MENU_LINKS || '=https://files.catbox.moe/ugqf62.js',
    MODE: process.env.PUBLIC_MODE || "yes",
    PM_PERMIT: process.env.PM_PERMIT || 'yes',
    HEROKU_APP_NAME : process.env.HEROKU_APP_NAME,
    HEROKU_APY_KEY : process.env.HEROKU_APY_KEY ,
    WARN_COUNT : process.env.WARN_COUNT || '3' ,
    ETAT : process.env.PRESENCE || '',
    CHATBOT : process.env.CHATBOT || 'no',
    CHATBOT1 : process.env.CHATBOT1 || 'no',
    DP : process.env.STARTING_BOT_MESSAGE || "yes",
    ANTIDELETE1 : process.env.ANTIDELETE1 || 'yes',
    ANTIDELETE2 : process.env.ANTIDELETE2 || 'yes',
    ANTICALL : process.env.ANTICALL || 'yes',
                  MENUTYPE : process.env.MENUTYPE || '',
                  AUTO_REACT : process.env.AUTO_REACT || 'yes',
                  AUTO_REACT_STATUS : process.env.AUTO_REACT_STATUS || 'yes',
                  AUTO_REPLY : process.env.AUTO_REPLY || 'yes',
                  AUTO_READ : process.env.AUTO_READ || 'yes',
                  AUTO_SAVE_CONTACTS : process.env.AUTO_SAVE_CONTACTS || 'no',
                  AUTO_REJECT_CALL : process.env.AUTO_REJECT_CALL || 'yes',
                  AUTO_BIO : process.env.AUTO_BIO || 'yes',
                  AUDIO_REPLY : process.env.AUDIO_REPLY || 'yes',
                  AUTO_SAVE_CONTACTS_NAME: "SPARK-X", // Default name prefix for new contacts
                  AUTO_REPLY_MESSAGE: "", 
    DATABASE_URL,
    DATABASE: DATABASE_URL === databasePath
        ? "postgresql://postgres:bKlIqoOUWFIHOAhKxRWQtGfKfhGKgmRX@viaduct.proxy.rlwy.net:47738/railway" : "postgresql://postgres:bKlIqoOUWFIHOAhKxRWQtGfKfhGKgmRX@viaduct.proxy.rlwy.net:47738/railway",
   
};
let fichier = require.resolve(__filename);
fs.watchFile(fichier, () => {
    fs.unwatchFile(fichier);
    console.log(`mise à jour ${__filename}`);
    delete require.cache[fichier];
    require(fichier);
});
