// Initializes the `periods` service on path `/periods`
const createService = require('feathers-nedb');
const createModel = require('../../models/periods.model');
const hooks = require('./periods.hooks');
const filters = require('./periods.filters');

module.exports = function () {
  const app = this;
  const Model = createModel(app);
  const paginate = app.get('paginate');

  const options = {
    name: 'periods',
    Model,
    paginate
  };

  // Initialize our service with any options it requires
  app.use('/periods', createService(options));

  // Get our initialized service so that we can register hooks and filters
  const service = app.service('periods');

  service.hooks(hooks);

  if (service.filter) {
    service.filter(filters);
  }
};
