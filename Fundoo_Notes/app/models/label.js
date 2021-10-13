const mongoose = require('mongoose');

const LabelSchema = new mongoose.Schema({
  labelName: {
    type: String,
    required: true,
  },
  userId: {
    type: mongoose.Schema.Types.ObjectId, ref: 'user',
  },
  noteId: {
    type: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Note' }],
  },
}, {
  timestamps: true,
});

const Label = mongoose.model('label', LabelSchema);

class Model {
    createLabel = (data) => {
        return new Promise((resolve, reject) => {
            const label = new Label({
              userId: data.userId,
              labelName: data.labelName
            });
            label.save()
            .then((data) => resolve(data))
            .catch((error) => reject(error));
          });
    }
}

module.exports = new Model();
