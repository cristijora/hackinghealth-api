const { authenticate } = require('feathers-authentication').hooks;
const commonHooks = require('feathers-hooks-common');
const { restrictToOwner } = require('feathers-authentication-hooks');
const local = require('feathers-authentication-local');
const jsonValidator = require('./../../hooks/json-validator')

var schema = {
  message: 'User validation failed',
  properties: {
    username: {
      type: 'string',
      required: true,
      maxLength: 20,
      minLength: 3
    },
    email: {
      type: 'string',
      format: 'email',
      required: true
    },
    password: {
      type: 'string',
      required: true,
      minLength: 5
    }
  }
}


const restrict = [
  authenticate('jwt'),
  restrictToOwner({
    idField: '_id',
    ownerField: '_id'
  })
];

module.exports = {
  before: {
    all: [],
    find: [ authenticate('jwt') ],
    get: [ ...restrict ],
    create: [jsonValidator(schema), local.hooks.hashPassword({ passwordField: 'password' })],
    update: [ ...restrict ],
    patch: [ ...restrict ],
    remove: [ ...restrict ]
  },

  after: {
    all: [
      commonHooks.when(
        hook => hook.params.provider,
        commonHooks.discard('password')
      )
    ],
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
