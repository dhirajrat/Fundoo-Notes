const mongoose = require('mongoose');
const logger = require('../logger/logger');

const url = process.env.DB_CONNECT_URL;

class DBconnection {
  /**
   * Configuring Database
   * Connecting to Database Server
   */
    database = () => {
      // Configuring the database
      mongoose.Promise = global.Promise;
      //mongoose connect method help us to connect with DB
      mongoose.connect(url, {
        useNewUrlParser: true,
      }).then(() => {
        logger.info('**************** connected to database **************');
        console.log("sucessfully connected to the database");
      }).catch(err => {
        console.log("Could not connect to the database. Exiting now..", err);
        process.exit();
      });
    }
  }

module.exports = new DBconnection;