// Initializes the `children` service on path `/children`
const createService = require('feathers-mongodb');
const hooks = require('./children.hooks');
const filters = require('./children.filters');

module.exports = function () {
  const app = this;
  const paginate = app.get('paginate');
  const mongoClient = app.get('mongoClient');
  const options = { paginate };

  // Initialize our service with any options it requires
  app.use('/children', createService(options));

  // Get our initialized service so that we can register hooks and filters
  const service = app.service('children');

  mongoClient.then(db => {
    service.Model = db.collection('children');
  });

  service.hooks(hooks);

  if (service.filter) {
    service.filter(filters);
  }
};
