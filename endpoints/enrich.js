'use strict';

/**
 * Retrieve personal / contact information.
 *
 * @constructor
 * @param {FullContact} api
 * @api private
 */
function Enrich(api) {
  this.api = api;

  // [HACK] only enrich API can be v3
  api.version = 'v3';

  this.endpoint = 'https://api.fullcontact.com/' + api.version + '/person.enrich';
  this.send = api.v3Process.bind(api, this);
}

/**
 * Retrieve contact information by e-mail.
 *
 * ```js
 * fullcontact.enrich.email('opensource@observe.it', [queue], [webhookUrl], [webhookId], [webhookBody], [style], [macromeasures], fn);
 * ```
 *
 * @returns {Person}
 * @api public
 */
Enrich.prototype.email = function email() {
  var args = this.api.args(arguments, 'queue', 'webhookUrl', 'webhookId', 'webhookBody', 'style', 'macromeasures');

  this.send({ email: args.value }, args);
  return this;
};

/**
 * Retrieve contact information by e-mail which is transformed to an MD5.
 *
 * ```js
 * fullcontact.enrich.md5('opensource@observe.it', [queue], fn);
 * ```
 *
 * @returns {Person}
 * @api public
 */
Enrich.prototype.md5 = function md5() {
  var args = this.api.args(arguments, 'queue');

  this.send({ emailHash: args.value }, args);
  return this;
};

/**
 * Retrieve contact information by Twitter handle.
 *
 * ```js
 * fullcontact.enrich.twitter('@3rdEden', [queue], fn);
 * ```
 *
 * @returns {Person}
 * @api public
 */
Enrich.prototype.twitter = function twitter() {
  var args = this.api.args(arguments, 'queue');

  this.send({ twitter: args.value }, args);
  return this;
};

/**
 * Retrieve contact information by phone number.
 *
 * ```js
 * fullcontact.enrich.phone('98470947', [queue], fn);
 * ```
 *
 * @returns {Person}
 * @api public
 */
Enrich.prototype.phone = function phone() {
  var args = this.api.args(arguments, 'queue');

  this.send({ phone: args.value }, args);
  return this;
};

//
// Expose the Person endpoint.
//
module.exports = Enrich;
