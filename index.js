var md5_hex_digest_fn = require('./lib/ccrypto_fn.js');
var md5_hex_digest_js = require('./lib/ccrypto_js.js');

// 
// Aliases & Short-Hand
// 
module.exports = {};
module.exports.md5 = md5_hex_digest_fn
module.exports.md5_hex_digest = md5_hex_digest_fn;

// 
// Export the C++ implementation
// 
module.exports.md5_hex_digest_fn = md5_hex_digest_fn;

// 
// Export the JS implementation
// 
module.exports.md5_hex_digest_js = md5_hex_digest_js;
