const assert = require('assert');
const app = require('../../src/app');

describe('\'periods\' service', () => {
  it('registered the service', () => {
    const service = app.service('periods');

    assert.ok(service, 'Registered the service');
  });
});
