const express = require('express');

const router = express.Router();

const documentController = require('@controllers/document.controller');


router.get('/', documentController.getAll);

router.get('/:id', documentController.getById);

router.post('/', documentController.store);

router.put('/:id', documentController.update);

router.delete('/:id', documentController.delete);


module.exports = router;