// Simple in-memory model for users
let users = [
  { id: 1, name: 'John Doe', email: 'john@example.com' },
  { id: 2, name: 'Jane Smith', email: 'jane@example.com' }
];

module.exports = {
  getAll: () => {
    return users;
  },
  
  getById: (id) => {
    return users.find(user => user.id === parseInt(id));
  },
  
  create: (userData) => {
    const newId = users.length > 0 ? Math.max(...users.map(user => user.id)) + 1 : 1;
    const newUser = { id: newId, ...userData };
    users.push(newUser);
    return newUser;
  },
  
  update: (id, userData) => {
    const index = users.findIndex(user => user.id === parseInt(id));
    if (index === -1) return null;
    
    const updatedUser = { ...users[index], ...userData };
    users[index] = updatedUser;
    return updatedUser;
  },
  
  delete: (id) => {
    const index = users.findIndex(user => user.id === parseInt(id));
    if (index === -1) return false;
    
    users.splice(index, 1);
    return true;
  }
};