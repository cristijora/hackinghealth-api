const users = require('./users/users.service.js');
const children = require('./children/children.service.js');
module.exports = function () {
  const app = this; // eslint-disable-line no-unused-vars
  app.configure(users);
  app.configure(children);
};
