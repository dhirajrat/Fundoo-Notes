const noteModel = require('../models/notes');
const logger = require('../../logger/logger');
const redisClass = require('../utility/redis')

class Service {
  /**
   * Create Note
   * @param {*} note 
   * @param {*} callback 
   */
  createNote = (note) => {
    return new Promise((resolve, reject) => {
      noteModel.createNote(note)
      .then((data) => {
        resolve(data)
      })
      .catch(() => reject());
    })
  }

  /**
   * Get All Notes
   * @param {*} userId 
   * @param {*} callback 
   */
  getAllNotes = (userId) => {
    return new Promise((resolve, reject) => {
      noteModel.getAllNotes(userId).then((data) => { 
        resolve(data)
      })
      .catch(() => reject());
    })
  }

  /**
   * Get Notes By NoteId
   * @param {*} ids 
   * @param {*} callback 
   */
  getNoteById = (ids) => {
    return new Promise((resolve, reject) => {
      noteModel.getNoteById(ids)
      .then((data) => {
        const rdata = JSON.stringify(data);
        redisClass.setDataInCache(data.id, 3600, rdata);
        resolve(data);
      })
      .catch((error) => {
        reject(error)
      });
    })
  }

  /**
   * Update Note By Note Id
   * @param {*} data 
   * @param {*} callback 
   */
  updateNoteById = (data, callback) => {
    noteModel.updateNoteById(data, (error, data) => {
      if (error) {
        logger.error(error);
        return callback(error, null);
      } else {
        redisClass.clearCache(data.id);
        return callback(null, data);
      }
    }
    );
  }

  /**
   * Delete Note By Note Id
   * @param {*} data 
   * @param {*} callback 
   */
  deleteNoteById = async (data, callback) => {
    await noteModel.deleteNoteById(data, (error, data) => {
      if (error) {
        logger.error(error);
        return callback(error, null);
      } else {
        redisClass.clearCache(data.id);
        return callback(null, data);
      }
    }
    );
  }

  addLabelToNote = (labeldata) => {
    return new Promise((resolve, reject) => {
      noteModel.addLabelToNote(labeldata)
      .then((data) => {
        redisClass.clearCache(data.id);
        resolve(data);
      })
      .catch((error) => {
        reject(error)
      });
    })
  }

  deleteLabelFromNote = (labeldata) => {
    return new Promise((resolve, reject) => {
      noteModel.deleteLabelFromNote(labeldata)
      .then((data) => {
        redisClass.clearCache(data.id);
        resolve(data);
      })
      .catch((error) => {
        reject(error)
      });
    })
  }

}
module.exports = new Service();