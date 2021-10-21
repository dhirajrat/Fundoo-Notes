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
  /**
   * Create Label
   * @param {*} data 
   * @returns 
   */
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

    /**
     * Get Label
     * @param {*} id 
     * @returns 
     */
    getLabel = (id) => {
        return new Promise((resolve, reject) => {
          Label.find({ userId: id })
          .then((data) => {
            resolve(data);
          })
            .catch((error) => reject(error));
        });
      }

      /**
       * Get Label By ID
       * @param {*} ids 
       * @returns 
       */
    getLabelById = (ids) =>{
        return new Promise((resolve, reject) => {
          Label.findOne( { _id: ids.labelId } , (error, data) => {
            if (data) {
              resolve(data);
            } else {
              reject(error);
            }
          })
        })
    }

    /**
     * Update Label
     * @param {*} data 
     * @returns 
     */
    async updateLabelById (data){
        return await Label.findOneAndUpdate({ _id:data.labelId, userId: data.userId }, {labelName: data.labelName}, {new: true})
    }

    /**
     * Delete Label
     * @param {*} data 
     * @returns 
     */
    async deleteLabelById (data){
      return await Label.findOneAndDelete({ _id:data.labelId, userId: data.userId })
    }
}

module.exports = new Model();
