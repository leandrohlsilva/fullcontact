describe('FullContact.Enrich', function () {
  'use strict';

  const FullContact = require('..');
  const chai = require('chai');

  chai.config.includeStack = true;

  //
  // The API key we use for testing.
  //
  const key = process.env.API_KEY;
  if (!key) {
    throw new Error('Please provide your API using the API_KEY env variable.');
  }

  //
  // Some of the requests take a really long time, so set a really long timeout
  //
  this.timeout(20000);

  //
  // Pre-create an API instance
  //
  const api = new FullContact(key);

  describe('#email', function () {
    it('retrieves data by e-mail', function (done) {
      api.enrich.email('arnout@observe.it', done);
    });

  });

  describe('#email with webhook url/id', function () {
    it('retrieves data by e-mail and sets up a webhook with the right url and id', function (done) {
      api.enrich.email('arnout@observe.it', null, 'http://requestb.in/1bxgb751', 'webhookTest', done);
    });
  });
  
  describe('#email with webhook url/id/bodyType', function () {
    it('retrieves data by e-mail and sets up a webhook with the right url and id and body type', function (done) {
      api.enrich.email('arnout@observe.it', null, 'http://requestb.in/1bxgb751', 'webhookTest', 'json', done);
    });
  });
  
  describe('#email with webhook url/id/bodyType/style', function () {
    it('retrieves data by e-mail and sets up a webhook with the right url and id', function (done) {
      api.enrich.email('arnout@observe.it', null, 'http://requestb.in/1bxgb751', 'webhookTest', 'json', 'dictionary', done);
    });
  });

  describe('#email with webhook url/id/bodyType/style/macromeasures', function () {
    it('retrieves data by e-mail with macromeasures enabled', function (done) {
      api.enrich.email('arnout@observe.it', null, null, null, null, null, true, done);
    });
  });

  describe('#md5', function () {
    const md5 = require('crypto').createHash('md5')
    .update('arnout@observe.it')
    .digest('hex')
    .toString();

    it('retrieves data by md5 e-mail', function (done) {
      api.enrich.md5(md5, done);
    });
  });

  describe('#twitter', function () {
    it('retrieves data by twitter handle', function (done) {
      api.enrich.twitter('observe_it', done);
    });
  });

  describe('#phone', function () {
    it('retrieves data by phone number', function (done) {
      api.enrich.phone('+13037170414', done);
    });
  });
});
