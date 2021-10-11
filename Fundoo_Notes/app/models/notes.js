const mongoose = require('mongoose');
const logger = require('../../logger/logger');

const noteSchema = mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId,
    ref: 'user' 
    },
  title: {
    type: String,
  },
  description: {
    type: String,
    required: true,
    minlength: 2,
  },
},
{
  timestamps: true,
});

const Notes = mongoose.model('Note', noteSchema);

class Model {
  /**
   * Create Note
   * @param {*} info 
   * @param {*} callback 
   */
    createNote = (info, callback) => {
      const note = new Notes({
        userId: info.userId,
        title: info.title,
        description: info.description
      });
      note.save((error, data) => {
        if (error) {
          logger.error(error);
          return callback(error, null);
        } else {
          return callback(null, data);
        }
      });
    }

    /**
     * Get All Notes
     * @param {*} userId 
     * @param {*} callback 
     */
    getAllNotes = (userId, callback) => {
      console.log("46"+userId.id);
      Notes.find({ userId: userId.userId }, (error, data) => {
        if (error) {
          logger.error(error);
          return callback(error, null);
        } else {
          return callback(null, data);
        }
      });
    }

    /**
     * Get Notes By NoteId
     * @param {*} ids 
     * @param {*} callback 
     */
    getNoteById = (ids, callback) => {
      console.log("46 "+ids.userId+" "+ids.noteId);
      Notes.find({$and:[{userId: ids.userId},{_id:ids.noteId}]}, (error, data) => {
        if (error) {
          logger.error(error);
          return callback(error, null);
        } else {
          return callback(null, data);
        }
      });
    }

    /**
     * Update Note By Note ID
     */
    updateNoteById = (notedata, callback) => {
      console.log("46 "+notedata.userId+" "+notedata.noteId);
      Notes.find({$and:[{userId: notedata.userId},{_id:notedata.noteId}]}, (error, data) => {
        if (error) {
          logger.error(error);
          return callback(error, null);
        } else {
          Notes.findByIdAndUpdate({_id: notedata.noteId}, {
            title: notedata.title,
            description: notedata.description
          }, { new : true}, (error, data) => {
            if (error) {
              return callback(error, null);
            } else {
              return callback(null, data);
            }
          });
        }
      });
    }

}

  module.exports = new Model();