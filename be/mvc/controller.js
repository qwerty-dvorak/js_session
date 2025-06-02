const model = require('./model');
const view = require('./view');

module.exports = {
  show: () => {
    const data = model.getData();
    view.render(data);
  },
  update: (newData) => {
    model.setData(newData);
    view.render(model.getData());
  }
};