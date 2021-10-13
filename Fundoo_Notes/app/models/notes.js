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
    // createNote = (info, callback) => {
    //   const note = new Notes({
    //     userId: info.userId,
    //     title: info.title,
    //     description: info.description
    //   });
    //   note.save((error, data) => {
    //     if (error) {
    //       logger.error(error);
    //       return callback(error, null);
    //     } else {
    //       return callback(null, data);
    //     }
    //   });
    // }

    createNote = (info) => {
      return new Promise((resolve, reject) => {
        const note = new Notes({
          userId: info.userId,
          title: info.title,
          description: info.description
        });
        console.log("52 "+info.title+" "+info.userId);
        note.save().then((data) => {
          console.log("54 "+data.title);
          resolve(data)
        }).catch(() => reject());
      })
    }

    /**
     * Get All Notes
     * @param {*} userId 
     * @param {*} callback 
     */
    // getAllNotes = (userId, callback) => {
    //   return new Promise((resolve, reject) => {
        
    //   })
    //   console.log("46 "+userId.userId);
    //   Notes.find({ userId: userId.userId }, (error, data) => {
    //     if (error) {
    //       logger.error(error);
    //       return callback(error, null);
    //     } else {
    //       return callback(null, data);
    //     }
    //   });
    // }

    getAllNotes = (userId) => {
      return new Promise((resolve, reject) => {
        console.log("46 "+userId.userId);
        Notes.find({ userId: userId.userId }).then((data) => resolve(data))
        .catch(() => reject());
      })

    }

    /**
     * Get Notes By NoteId
     * @param {*} ids 
     * @param {*} callback 
     */
    getNoteById = (ids, callback) => {
      Notes.find({_id:ids.noteId, userId: ids.userId}, (error, data) => {
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
          Notes.findOneAndUpdate({_id: notedata.noteId, userId: notedata.userId}, {
            title: notedata.title,
            description: notedata.description
          }, { new : true}, (error, data) => {
            if (error) {
              logger.error(error);
              return callback(error, null);
            } else {
              return callback(null, data);
            }
          });
    }

    /**
     * Delete Note By Note Id
     * @param {*} notedata 
     * @param {*} callback 
     */
    deleteNoteById = (notedata, callback) => {
          Notes.findOneAndDelete({_id: notedata.noteId, userId: notedata.userId}, (error, data) => {
            if (error) {
              return callback(error, null);
            } else {
              return callback(null, data);
            }
          });
    }

}

  module.exports = new Model();