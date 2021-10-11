const noteModel = require('../models/notes');
const logger = require('../../logger/logger');

class Service {
  /**
   * Create Note
   * @param {*} note 
   * @param {*} callback 
   */
  createNote = (note, callback) => {
    noteModel.createNote(note, (error, data) => {
      if (error) {
        logger.error(error);
        return callback(error, null);
      } else {
        return callback(null, data);
      }
    }
    );
  }

  /**
   * Get All Notes
   * @param {*} userId 
   * @param {*} callback 
   */
  getAllNotes = (userId, callback) => {
    noteModel.getAllNotes(userId, (error, data) => {
      if (error) {
        logger.error(error);
        return callback(error, null);
      } else {
        return callback(null, data);
      }
    }
    );
  }

  /**
   * Get Notes By NoteId
   * @param {*} ids 
   * @param {*} callback 
   */
  getNoteById = (ids, callback) => {
    noteModel.getNoteById(ids, (error, data) => {
      if (error) {
        logger.error(error);
        return callback(error, null);
      } else {
        return callback(null, data);
      }
    }
    );
  }
}
module.exports = new Service();