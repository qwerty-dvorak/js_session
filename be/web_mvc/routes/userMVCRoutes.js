const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController');

// --- MVC view routes ---
router.get('/',            userController.renderUserList);
router.get('/new',         userController.renderCreateForm);
router.post('/',           userController.handleCreateForm);
router.get('/:id/edit',    userController.renderEditForm);
router.post('/:id/edit',   userController.handleEditForm);
router.post('/:id/delete', userController.handleDelete);

module.exports = router;