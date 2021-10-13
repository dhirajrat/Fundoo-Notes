const labelService = require('../service/label');
const logger = require('../../logger/logger');

class Label {
    createLabel = (req, res) => {
        try {
            const label = {
                labelName: req.body.labelName,
                userId: req.userData.id,
            };

            labelService.createLabel(label).then((data) => {
                logger.info('Label added');
                res.status(201).send({
                message: 'Label created successfully',
                success: true,
                data: data
                });
            }).catch((error) => {
                logger.error('Label not created');
                res.status(500).send({
                message: 'Label not created',
                success: false,
                error: error
                });
            })
        } catch {
            logger.error('Internal Error');
            return res.status(500).send({
            message: 'Internal Error',
            success: false
            });
        }
    }
}

module.exports = new Label();
