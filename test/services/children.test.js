const assert = require('assert');
const app = require('../../src/app');

describe('\'children\' service', () => {
  it('registered the service', () => {
    const service = app.service('children');

    assert.ok(service, 'Registered the service');
  });
});
