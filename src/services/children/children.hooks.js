const {authenticate} = require('feathers-authentication').hooks;
const {populate} = require('feathers-hooks-common');
const processChild = require('../../hooks/process-child');
const jsonValidator = require('./../../hooks/json-validator');

var schema = {
  message: 'Child validation',
  properties: {
    name: {
      type: 'string',
      required: true,
      minLength: 2
    },
    birthDate: {
      type: 'string',
      format: 'date',
      required: true
    },
    birthWeight: {
      type: 'number',
      required: true
    },
    currentWeight: {
      type: 'number'
    },
    birthHeight: {
      type: 'number',
      required: true
    },
    currentHeight: {
      type: 'number'
    },
    gender: {
      type: 'string',
      required: true,
      enum: ['feminin', 'masculin']
    }
  }
};

module.exports = {
  before: {
    all: [authenticate('jwt')],
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
