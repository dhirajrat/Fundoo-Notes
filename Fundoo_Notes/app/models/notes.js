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
  labels: {
    type: [{ type: mongoose.Schema.Types.ObjectId,
      ref: 'label'
    }]
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
    createNote = (info) => {
      return new Promise((resolve, reject) => {
        const note = new Notes({
          userId: info.userId,
          title: info.title,
          description: info.description
        });
        note.save()
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
    getAllNotes = (user) => {
      return new Promise((resolve, reject) => {
        console.log("46 "+user.userId);
        Notes.find({ userId: user.userId }).then((data) => resolve(data))
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
        Notes.find({_id:ids.noteId, userId: ids.userId})
        .then((data) => {
          resolve(data);
        })
        .catch((error) => {
          reject(error);
        });
      })
    }

    /**
     * Update Note By Note ID
     */
    // updateNoteById = (notedata, callback) => {
    //       Notes.findOneAndUpdate({_id: notedata.noteId, userId: notedata.userId}, {
    //         title: notedata.title,
    //         description: notedata.description
    //       }, { new : true}, (error, data) => {
    //         if (error) {
    //           logger.error(error);
    //           return callback(error, null);
    //         } else {
    //           return callback(null, data);
    //         }
    //       });
    // }

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

    addLabelToNote = (labeldata) => {
      console.log("128 : "+labeldata.noteId," ",labeldata.labelId);
      return new Promise((resolve, reject) => {
        Notes.findOneAndUpdate({_id:labeldata.noteId, userId:labeldata.userId}, {$push : { "labels": {$each: labeldata.labelId}} }, {new: true})
        .then((data) => {
          resolve(data);
        })
        .catch((error) => {
          reject(error);
        });
      })
    }
    
    deleteLabelFromNote = (labeldata) => {
      console.log("128 : "+labeldata.noteId," ",labeldata.labelId);
      return new Promise((resolve, reject) => {
        Notes.findOneAndUpdate(
          {_id:labeldata.noteId, userId:labeldata.userId},
          { $pull: { labels: labeldata.labelId[0] } },
          { new: true }
        )
        .then((data) => {
          resolve(data);
        })
        .catch((error) => {
          reject(error);
        });
      })
    }

}

  module.exports = new Model();