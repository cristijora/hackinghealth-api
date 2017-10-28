const users = require('./users/users.service.js');
const children = require('./children/children.service.js');
const periods = require('./periods/periods.service.js');
const investigations = require('./investigations/investigations.service.js');
module.exports = function () {
  const app = this; // eslint-disable-line no-unused-vars
  app.configure(users);
  app.configure(children);
  app.configure(periods);
  app.configure(investigations);
};
