const UserModel = require('../models/userModel');

module.exports = {
  getAllUsers: (req, res) => {
    const users = UserModel.getAll();
    res.status(200).json(users);
  },
  getUserById: (req, res) => {
    const user = UserModel.getById(req.params.id);
    if (!user) return res.status(404).json({ message: 'User not found' });
    res.status(200).json(user);
  },
  createUser: (req, res) => {
    const { name, email } = req.body;
    if (!name || !email) return res.status(400).json({ message: 'Name and email are required' });
    const newUser = UserModel.create({ name, email });
    res.status(201).json(newUser);
  },
  updateUser: (req, res) => {
    const updatedUser = UserModel.update(req.params.id, req.body);
    if (!updatedUser) return res.status(404).json({ message: 'User not found' });
    res.status(200).json(updatedUser);
  },
  deleteUser: (req, res) => {
    const result = UserModel.delete(req.params.id);
    if (!result) return res.status(404).json({ message: 'User not found' });
    res.status(200).json({ message: 'User deleted successfully' });
  },

  // View handlers
  renderUserList: (req, res) => {
    const users = UserModel.getAll();
    res.render('users/list', { title: 'User List', users });
  },
  renderCreateForm: (req, res) => {
    res.render('users/new', { title: 'Create User' });
  },
  handleCreateForm: (req, res) => {
    const { name, email } = req.body;
    if (!name || !email) return res.render('users/new', { title: 'Create User', error: 'Name and email are required' });
    UserModel.create({ name, email });
    res.redirect('/users');
  },
  renderEditForm: (req, res) => {
    const user = UserModel.getById(req.params.id);
    if (!user) return res.redirect('/users');
    res.render('users/edit', { title: 'Edit User', user });
  },
  handleEditForm: (req, res) => {
    const { name, email } = req.body;
    const updatedUser = UserModel.update(req.params.id, { name, email });
    if (!updatedUser) return res.redirect('/users');
    res.redirect('/users');
  },
  handleDelete: (req, res) => {
    UserModel.delete(req.params.id);
    res.redirect('/users');
  }
};