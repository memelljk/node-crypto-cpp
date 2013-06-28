var _node_crypto = require('crypto');

// Short-hand to the "md5_hex_digest" function
module.exports = function(input) {
	// Invalid input
	if (undefined === input || null === input) {
		return input;
	}

	// Concatinate Arrays
	if (input.constructor == Array) {
		input = input.join(',');
	}

	// Cast to a string if it is not one
	if (input.constructor != String) {
		input = input.toString();
	}

	return _node_crypto.createHash('md5')
		.update(input)
		.digest("hex");
};
