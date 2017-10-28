const {populate} = require('feathers-hooks-common');
const {authenticate} = require('feathers-authentication').hooks;
const populatePeriods = require('./../../hooks/periods')
module.exports = {
  before: {
    all: [authenticate('jwt')],
    find: [],
    get: [],
    create: [populatePeriods()],
    update: [],
    patch: [],
    remove: []
  },

  after: {
    all: [populate({
      schema: {
        include: [{
          service: 'users',
          nameAs: 'user',
          parentField: 'userId',
          childField: '_id'
        }]
      }
    })],
    find: [],
    get: [],
    create: [],
    update: [],
    patch: [],
    remove: []
  },

  error: {
    all: [],
    find: [],
    get: [],
    create: [],
    update: [],
    patch: [],
    remove: []
  }
};
