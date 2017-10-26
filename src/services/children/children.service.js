// Initializes the `children` service on path `/children`
const createService = require('feathers-nedb');
const createModel = require('../../models/children.model');
const hooks = require('./children.hooks');
const filters = require('./children.filters');

module.exports = function () {
  const app = this;
  const Model = createModel(app);
  const paginate = app.get('paginate');

  const options = {
    name: 'users',
    Model,
    paginate
  };

  // Initialize our service with any options it requires
  app.use('/children', createService(options));

  // Get our initialized service so that we can register hooks and filters
  const service = app.service('children');

  service.hooks(hooks);

  if (service.filter) {
    service.filter(filters);
  }
};
