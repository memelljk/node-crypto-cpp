var path = require('path');
var mocha = require('mocha');
var chai = require('chai');
var should = chai.should();

var ccrypto = require('../index.js');

var shared_spec = function(tag, ccrypto) {
	// Validate the Input matches the Output
	describe(tag, function() {
		it('undefined -> undefined', function() {
			chai.assert.isUndefined(ccrypto(undefined));
		});

		it('null -> null', function() {
			chai.assert.isNull(ccrypto(null));
		});

		it('false -> "68934a3e9455fa72420237eb05902327"', function() {
			chai.assert.deepEqual(ccrypto(false), '68934a3e9455fa72420237eb05902327');
		});

		it('true -> "b326b5062b2f0e69046810717534cb09"', function() {
			chai.assert.deepEqual(ccrypto(true), 'b326b5062b2f0e69046810717534cb09');
		});

		it('"" -> "d41d8cd98f00b204e9800998ecf8427e"', function() {
			chai.assert.deepEqual(ccrypto(''), 'd41d8cd98f00b204e9800998ecf8427e');
		});

		it('"a,b,c" -> "a44c56c8177e32d3613988f4dba7962e"', function() {
			chai.assert.deepEqual(ccrypto('a,b,c'), 'a44c56c8177e32d3613988f4dba7962e');
		});

		it('["a", "b", "c"] -> "a44c56c8177e32d3613988f4dba7962e"', function() {
			chai.assert.deepEqual(ccrypto(["a", "b", "c"]), 'a44c56c8177e32d3613988f4dba7962e');
		});
	});
};

describe('CCrypto Tests: md5_hex_digest', function() {

	shared_spec('Pure JavaScript Implementation', ccrypto.md5_hex_digest_js);

	shared_spec('Pure C++ Implementation', ccrypto.md5_hex_digest_fn);

});
