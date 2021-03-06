const noteService = require('../service/notes');
const validatorObj = require('../utility/validation.js');
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

            const valid = validatorObj.authNote.validate(req.body);
            if (valid.error) {
              logger.error(valid.error);
              return res.status(400).send({
                success: false,
                message: 'Invalid Input',
                data: valid
              });           
            }

            noteService.createNote(note)
            .then((data) => {
                    logger.info('Successfully created note');
                    return res.status(201).send({
                        message: 'Successfully created note',
                        success: true,
                        data: data
                    });
            })
            .catch(() => {
                    logger.error('note not created');
                    return res.status(400).json({
                        message: 'note not created',
                        success: false
                    });
            })
        } catch {
        logger.error('Internal server error');
            return res.status(500).json({
                message: 'Internal server error',
                success: false
            });
        }
    }

    /**
     * Get All Notes
     * @param {*} req 
     * @param {*} res 
     * @returns 
     */
    getAllNotes = (req, res) => {
        try { 
        const user = {
            userId: req.userData.id
        }
        noteService.getAllNotes(user)
        .then((data) => {
            logger.info('Notes Found Successfully');
            return res.send({success: true, message: "Notes Retrieved!", data: data})
        })
        .catch(() => {
            return res.send({success: false, message: "Notes Not Retrieved!"})
        });
        } catch {
            logger.error('Internal server error');
            return res.status(500).json({
                message: 'Internal server error',
                success: false
            });
        }
    }

    /**
     * Get Note By NoteID
     * @param {*} req 
     * @param {*} res 
     * @returns 
     */
    getNoteById = (req, res) => {
        try {
            const ids = {
                userId: req.userData.id,
                noteId: req.params.id
            }
            noteService.getNoteById(ids)
            .then((data) => {
                logger.info('Notes Found Successfully');
                return res.send({success: true, message: "Notes Retrieved!", data: data})
            })
            .catch((error) => {
                return res.send({success: false, message: "Notes Not Retrieved!", data: error})
            })
            } catch {
                logger.error('Internal server error');
                return res.status(500).json({
                    message: 'Internal server error',
                    success: false
                });
            }
    }

    /**
     * Update Note By Note ID
     * @param {*} req 
     * @param {*} res 
     * @returns 
     */
    updateNoteById = (req, res) => {
        try {
            const idanddata = {
                title: req.body.title,
                description: req.body.description,
                userId: req.userData.id,
                noteId: req.params.id
            }

            const valid = validatorObj.authNote.validate(req.body);
            if (valid.error) {
              logger.error(valid.error);
              return res.status(400).send({
                success: false,
                message: 'Invalid Input',
                data: valid
              });           
            }

            noteService.updateNoteById(idanddata, (error, data) => {
                if (error) {
                    return res.send({success: false, message: "Notes Not Updated!", data: error})
                } else {
                    logger.info('Notes Updated Successfully');
                    return res.send({success: true, message: "Notes Updated!", data: data})
                }
            });
            } catch {
                logger.error('Internal server error');
                return res.status(500).json({
                    message: 'Internal server error',
                    success: false
                });
            }
    }

    /**
     * Delete Note By Note Id
     * @param {*} req 
     * @param {*} res 
     * @returns 
     */
    deleteNoteById = async (req, res) => {
        try {
            const idanddata = {
                userId: req.userData.id,
                noteId: req.params.id
            }
            console.log("73 "+idanddata.userId+" "+idanddata.noteId);
            await noteService.deleteNoteById(idanddata, (error, data) => {
                if (error) {
                    return res.send({success: false, message: "Note Not Deleted!", data: error})
                } else {
                    logger.info('Notes Deleted Successfully');
                    return res.send({success: true, message: "Notes Deleted!"})
                }
            });
            } catch {
                logger.error('Internal server error');
                return res.status(500).json({
                    message: 'Internal server error',
                    success: false
                });
            }
    }

    /**
     * Add Label to Note
     * @param {*} req 
     * @param {*} res 
     * @returns 
     */
    addLabelToNote = (req, res) => {
        try {
            const labelData = {
                labelId: [req.body.labelId],
                noteId: req.body.noteId,
                userId: req.userData.id
            }
            console.log("128 : "+req.body);
            noteService.addLabelToNote(labelData)
            .then((data) => {
                logger.info('');
                return res.send({success: true, message: "label successfully added to note"})
            })
            .catch((error) => {
                return res.send({success: false, message: "error adding label", error: error})
            })

        } catch {
            return res.status(500).json({
                message: 'Internal server error',
                success: false
            });
        }
    }

    /**
     * Delete Label From Note
     * @param {*} req 
     * @param {*} res 
     * @returns 
     */
    deleteLabelFromNote = (req, res) => {
        try {
            const labelData = {
                labelId: [req.body.labelId],
                noteId: req.body.noteId,
                userId: req.userData.id
            }
            console.log("128 : "+labelData.noteId);
            noteService.deleteLabelFromNote(labelData)
            .then((data) => {
                logger.info('label successfully deleted from note');
                return res.send({success: true, message: "label successfully deleted from note"})
            })
            .catch((error) => {
                return res.send({success: false, message: "error deleting label from note", error: error})
            })

        } catch {
            return res.status(500).json({
                message: 'Internal server error',
                success: false
            });
        }
    }

}

module.exports = new Note();