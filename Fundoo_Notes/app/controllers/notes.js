const noteService = require('../service/notes');
const logger = require('../../logger/logger');

class Note {
    /**
     * Create Note
     * @param {*} req 
     * @param {*} res 
     * @returns 
     */
    createNote = (req, res) => {
        try {
        const note = {
            userId: req.userData.id,
            title: req.body.title,
            description: req.body.description
            };

            noteService.createNote(note, (error, data) => {
                if (error) {
                    logger.error('note not created');
                    return res.status(400).json({
                        message: 'note not created',
                        success: false
                    });
                } else {
                    logger.info('Successfully created note');
                    return res.status(201).send({
                        message: 'Successfully created note',
                        success: true,
                        data: data
                    });
                }
            })
        } catch {
        logger.error('Internal server error');
        return res.status(500).json({
            message: 'Internal server error',
            success: false
        });
        }
    }
}

module.exports = new Note();