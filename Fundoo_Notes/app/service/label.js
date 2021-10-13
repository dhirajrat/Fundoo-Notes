const labelModel = require('../models/label');

class Service {

    createLabel = (label) => {
        return new Promise((resolve, reject) => {
        labelModel.createLabel(label)
        .then((data) => resolve(data))
        .catch((error) => reject(error));
        })
    }
}
module.exports = new Service();