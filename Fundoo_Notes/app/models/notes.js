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
}

  module.exports = new Model();