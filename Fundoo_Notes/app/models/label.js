const mongoose = require('mongoose');

const LabelSchema = new mongoose.Schema({
  labelName: {
    type: String,
    required: true,
  },
  userId: {
    type: mongoose.Schema.Types.ObjectId, ref: 'user',
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

    getLabel = (id) => {
        return new Promise((resolve, reject) => {
          Label.find({ userId: id })
          .then((data) => {
            resolve(data);
          })
            .catch((error) => reject(error));
        });
      }

    getLabelById = (ids) =>{
        return new Promise((resolve, reject) => {
          Label.find({ _id:ids.labelId, userId: ids.userId })
          .then((data) => {
            resolve(data);
          })
          .catch(() => reject("note Note Found"));
        })
    }

    async updateLabelById (data){
        return await Label.findOneAndUpdate({ _id:data.labelId, userId: data.userId }, {labelName: data.labelName}, {new: true})
    }

    async deleteLabelById (data){
      return await Label.findOneAndDelete({ _id:data.labelId, userId: data.userId })
    }
}

module.exports = new Model();
