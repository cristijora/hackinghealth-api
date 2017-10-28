const assert = require('assert');
const app = require('../../src/app');

describe('\'child-data\' service', () => {
  it('registered the service', () => {
    const service = app.service('child-data');

    assert.ok(service, 'Registered the service');
  });
});
