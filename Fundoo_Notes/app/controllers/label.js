const labelService = require('../service/label');
const validatorObj = require('../utility/validation.js');
const logger = require('../../logger/logger');

class Label {
    createLabel = (req, res) => {
        try {
            const label = {
                labelName: req.body.labelName,
                userId: req.userData.id,
            };

            const valid = validatorObj.authLabel.validate(req.body);
            if (valid.error) {
              logger.error(valid.error);
              return res.status(400).send({
                success: false,
                message: 'Invalid Input',
                data: valid
              });           
            }

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

    getLabel = (req, res) => {
        const userId = req.userData.id;
        labelService.getLabel(userId)
        .then((data) => {
            logger.info('Found all labels');
            res.status(200).send({
              message: 'labels retrieved',
              success: true,
              data: data
            });
        })
        .catch((err) => {
            logger.error('Labels Not found');
            res.status(404).send({
              message: 'Labels not found ',
              success: false
            });
        })
      }

      getLabelById = (req, res) => {
          const ids = {
            userId: req.userData.id,
            labelId: req.params.id
          }
          labelService.getLabelById(ids)
          .then((data)=>{
            logger.info('Found label');
            res.status(200).send({
              message: 'label retrieved',
              success: true,
              data: data
            });
          })
          .catch((message)=>{
            logger.error('Labels Not found');
            res.status(404).send({
              message: message,
              success: false
            });
          })
      }

      updateLabelById = async (req, res) => {
        try {
        console.log("hello");
        const upInfo = {
            labelName: req.body.labelName,
            userId: req.userData.id,
            labelId: req.params.id
        }

        const valid = validatorObj.authLabel.validate(req.body);
        if (valid.error) {
          logger.error(valid.error);
          return res.status(400).send({
            success: false,
            message: 'Invalid Input',
            data: valid
          });           
        }

        const updatelabel = await labelService.updateLabelById(upInfo);
        console.log("86: "+updatelabel.message);
        if (updatelabel.message){
            logger.error('Labels Not found');
            return res.status(404).send({
            message: message,
            success: false
          });
        }
          logger.info('Found label');
          return res.status(200).send({
            message: 'label updated',
            success: true
          });
        } catch(error) {
            return res.status(500).send({
                message: 'Failed to update label',
                success: false,
                data: error
              });
        }
    }

    deleteLabelById = async (req, res) => {
        try {
        console.log("hello");
        const upInfo = {
            userId: req.userData.id,
            labelId: req.params.id
        }
        const deletelabel = await labelService.deleteLabelById(upInfo);
        console.log("86: "+deletelabel.message);
        if (deletelabel.message){
            logger.error('Labels Not deleted');
            return res.status(404).send({
            message: message,
            success: false
          });
        }
          logger.info('deleted label');
          return res.status(200).send({
            message: 'label deleted',
            success: true
          });
        } catch(error) {
            return res.status(500).send({
                message: 'Failed to delete label',
                success: false,
                data: error
              });
        }
    }
}

module.exports = new Label();
