/* eslint-disable @typescript-eslint/no-require-imports */
const dotenv = require('dotenv');
const path = require('path');

dotenv.config({ path: path.resolve(__dirname, '../.env.local') });

module.exports = {
  BOT_TOKEN: "7742991693:AAEfrcne8T7JCwKvcf098COVtvLbgbrpXSM",
  WEBAPP_URL: process.env.WEBAPP_URL
};