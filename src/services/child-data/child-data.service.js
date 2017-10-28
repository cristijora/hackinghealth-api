// Initializes the `child-data` service on path `/child-data`
const createService = require('feathers-nedb');
const createModel = require('../../models/child-data.model');
const hooks = require('./child-data.hooks');
const filters = require('./child-data.filters');

module.exports = function () {
  const app = this;
  const Model = createModel(app);
  const paginate = app.get('paginate');

  const options = {
    name: 'child-data',
    Model,
    paginate
  };

  // Initialize our service with any options it requires
  app.use('/child-data', createService(options));

  // Get our initialized service so that we can register hooks and filters
  const service = app.service('child-data');

  service.hooks(hooks);

  if (service.filter) {
    service.filter(filters);
  }
};
