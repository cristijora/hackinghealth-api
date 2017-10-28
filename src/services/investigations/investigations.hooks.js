const {authenticate} = require('feathers-authentication').hooks;
const {populate} = require('feathers-hooks-common');
const processChild = require('../../hooks/process-child');
const jsonValidator = require('./../../hooks/json-validator');

var schema = {
  message: 'Investigation validation',
  properties: {
    name: {
      type: 'string',
      required: true,
      minLength: 2
    },
    category: {
      type: 'string',
      required: true,
      enum: ['vaccin', 'investigatii', 'consult', 'dezvoltare', 'alimentatie']
    },
    period: {
      type: 'number',
      required: true
    },
    description: {
      type: 'string'
    },
    required: {
      type: 'boolean',
      required: true
    },
    notes: {
      type: 'string'
    },
    files: {
      type: 'array'
    },
    done: {
      type: 'boolean',
      required: true
    },
    doneDate: {
      type: 'string',
      format: 'date'
    },
    dueDate: {
      type: 'number',
      required: true
    }
  }
};

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
