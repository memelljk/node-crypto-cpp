//
// Required Libraries
//
var path = require('path');
var mocha = require('mocha');
var chai = require('chai');
var should = chai.should();
var titlecaps = require('titlecaps')
	.titlecaps;
var v8_profiler_table = require('v8-profiler-table');
var repeats_callback_wrapper = v8_profiler_table.repeats_callback_wrapper;

var ccrypto = require('../index.js');


// 
// Repeat the callback X-Many times in JavaScript
// 
var ccrypto_js = {};
ccrypto_js.md5_hex_digest = ccrypto.md5_hex_digest_js;
ccrypto_js.repeat_in_js = {
	md5_hex_digest: function(num_times, value) {
		var loop = repeats_callback_wrapper(num_times, function() {
			return ccrypto_js.md5_hex_digest(value);
		});
		return loop();
	},
};


// 
// Repeat the callback X-Many times in C++
// 
var ccrypto_cpp = {};
ccrypto_cpp.md5_hex_digest_fn_repeater = require('../build/Release/ccrypto_speed_tests.node')
	.md5_hex_digest_fn_repeater;
ccrypto_cpp.repeat_in_cpp = {
	md5_hex_digest: function(num_times, value) {
		return ccrypto_cpp.md5_hex_digest_fn_repeater(num_times, value);
	},
};


//
// Helpers
//

function compare_ratios(tag, timings) {
	describe(tag, function() {
		// Clear the profiles
		v8_profiler_table.reset_profiles();

		console.log('Starting profiler for: ' + tag);

		// Log the run-times of the Original and C++ versions
		v8_profiler_table.record_profile('Original JS Version', timings.original_in_js);
		v8_profiler_table.record_profile('All C++ Version', timings.fn_in_cpp);

		if (process.env.VERBOSE) {
			console.log('');
			console.log('----- [' + titlecaps(tag) + '] -----');
			console.log(v8_profiler_table.stringify());
		}

		it('Original JS Version', function() {
			var profile = v8_profiler_table.profiles()['Original JS Version'];

			// Sanity checks
			profile.title.should.equal('Original JS Version');
			profile.ratio_to_base.should.equal(1);
			chai.assert.ok(profile.total_seconds <= 4.50, JSON.stringify(profile, undefined, 2));
		});

		it('All C++ Version is at least 1.5x as fast', function() {
			var profile = v8_profiler_table.profiles()['All C++ Version'];

			// Sanity checks
			profile.title.should.equal('All C++ Version');
			chai.assert.ok(profile.ratio_to_base >= 1.50, JSON.stringify(profile, undefined, 2));
			chai.assert.ok(profile.total_seconds <= 3.00, JSON.stringify(profile, undefined, 2));
		});
	});
};


//
// Test Suite
//
describe('Speed Tests', function() {
	this.timeout(0);

	var speed_tests = function(str, arr) {
		var num_runs = 1000 * 1000;

		compare_ratios('Encodes String as MD5', {
			original_in_js: function() {
				return ccrypto_js.repeat_in_js.md5_hex_digest(num_runs, str);
			},
			fn_in_cpp: function() {
				return ccrypto_cpp.repeat_in_cpp.md5_hex_digest(num_runs, str);
			},
		});

		// compare_ratios('Encodes Array of Strings as MD5', {
		// 	original_in_js: function() {
		// 		return ccrypto_js.repeat_in_js.md5_hex_digest(num_runs, arr);
		// 	},
		// 	fn_in_cpp: function() {
		// 		return ccrypto_cpp.repeat_in_cpp.md5_hex_digest(num_runs, arr);
		// 	},
		// });
	};

	describe('10x Sample String & Array', function() {
		// Build some sample data
		var arr = [];
		for (var i = 0; i < 10; i++) arr.push(i.toString());
		var str = arr.join('|');

		speed_tests(str, arr);
	});

});
