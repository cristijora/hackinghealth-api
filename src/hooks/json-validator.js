// Use this hook to manipulate incoming or outgoing data.
// For more information on hooks see: http://docs.feathersjs.com/api/hooks.html
var revalidator = require('revalidator')
var errors = require('feathers-errors')

module.exports = function (schema) { // eslint-disable-line no-unused-vars
  return function jsonValidator(hook) {
    let result = revalidator.validate(hook.data, schema)

    if (result.valid) return hook

    let error = new Error(schema.message || 'Validation failed')

    error.errors = result.errors.map(error => {
      return {
        path: error.property,
        value: hook.data[error.property],
        message: `${error.property} ${error.message}`
      }
    })

    throw new errors.BadRequest(error, hook.data);
  };
};
