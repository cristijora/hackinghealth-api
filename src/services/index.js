const users = require('./users/users.service.js');
const children = require('./children/children.service.js');
const periods = require('./periods/periods.service.js');
const investigations = require('./investigations/investigations.service.js');
const childData = require('./child-data/child-data.service.js');
module.exports = function () {
  const app = this; // eslint-disable-line no-unused-vars
  app.configure(users);
  app.configure(children);
  app.configure(periods);
  app.configure(investigations);
  app.configure(childData);
};
