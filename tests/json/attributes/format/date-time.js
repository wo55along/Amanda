if (typeof module !== 'undefined' && module.exports) {
  var expect = require('expect.js');
  var amanda = require('../../../../releases/latest/amanda.js');
}

/**
 * Format
 * --------------------
 */
suite('JSON/Attribute/format#date-time', function() {

  /**
   * Schema
   */
  var schema = {
    format: 'date-time'
  };

  /**
   * Validator
   */
  var Validator = amanda('json');

  test('should not return an error', function () {
    [
      '2018-12-06T14:37:38',
      '2018-12-06T14:37:38.5',
      '2018-12-06T14:37:38.543',
      '2018-12-06T14:37:38.543543',
      '2018-12-06T14:37:38.543Z',
      '2018-12-06T14:37:38.543+03:00',
      '2018-12-06T14:37:38.543-03:00',
      '2018-12-06T14:37:38Z',
      '2018-12-06T14:37:38+03:00',
      '2018-12-06T14:37:38-03:00',
    ].forEach(function (data) {
      Validator.validate(data, schema, function (error) {
        expect(error).to.not.be.ok();
      });
    });
  });

  test('should return an error', function() {
    [
      0,
      1,
      2,
      '123',
      '+@#$~^*{}',
      'lorem ipsum',
      ' ',
      123,
      null,
      [],
      {},
      function() {},
      null,
      '2018-12-06',
      '14:37:38',
      '2018-12-06 14:37:38',
      '2018-12-06T14:37:38+0300',
    ].forEach(function(data) {
      Validator.validate(data, schema, function(error) {
        expect(error).to.be.ok();
      });
    });
  });
});
