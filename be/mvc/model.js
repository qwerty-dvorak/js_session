let data = "Hello, MVC!";

module.exports = {
  getData: () => data,
  setData: (newData) => { data = newData; }
};