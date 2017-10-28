const { authenticate } = require('feathers-authentication').hooks;
const {populate} = require('feathers-hooks-common');
const jsonValidator = require('./../../hooks/json-validator');
const processChild = require('./../../hooks/process-child');

var schema = {
  weight: {
    type: 'number',
    required: true
  },
  height: {
    type: 'number',
    required: true
  },
  date: {
    type: 'string',
    format: 'date',
    required: true
  }
}
module.exports = {
  before: {
    all: [ authenticate('jwt') ],
    find: [],
    get: [],
    create: [processChild(), jsonValidator(schema)],
    update: [processChild(), jsonValidator(schema)],
    patch: [processChild(), jsonValidator(schema)],
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
