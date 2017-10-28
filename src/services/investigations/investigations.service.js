// Initializes the `investigations` service on path `/investigations`
const createService = require('feathers-nedb');
const createModel = require('../../models/investigations.model');
const hooks = require('./investigations.hooks');
const filters = require('./investigations.filters');

module.exports = function () {
  const app = this;
  const Model = createModel(app);
  const paginate = app.get('paginate');

  const options = {
    name: 'investigations',
    Model,
    paginate
  };

  // Initialize our service with any options it requires
  app.use('/investigations', createService(options));

  // Get our initialized service so that we can register hooks and filters
  const service = app.service('investigations');

  service.hooks(hooks);

  if (service.filter) {
    service.filter(filters);
  }
};
