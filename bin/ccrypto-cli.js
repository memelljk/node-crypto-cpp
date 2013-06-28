#!/usr/bin/env node

var argv = require('optimist')
	.argv;


// Load the implementation type
// Default is C++ Object
var impl = undefined;

var md5_hex_digest = undefined;
if (argv.impl && argv.impl === 'cpp') {
	md5_hex_digest = require('../index.js')
		.md5_hex_digest_fn;
} else if (argv.impl && argv.impl === 'js') {
	md5_hex_digest = require('../index.js')
		.md5_hex_digest_js;
} else {
	md5_hex_digest = require('../index.js')
		.md5_hex_digest_fn;
}

if (argv.md5) {
	var md5 = md5_hex_digest(argv.value)
	console.log(md5);
	process.exit(0);
}

console.log("");
console.log("crypto-cli.js [implementation type] [task] [arguments]");
console.log("");
console.log("\t--impl [cpp|js] (use C++ or JS implementation)");
console.log("");
console.log("\t--md5 --value 'string to encode' [ --value 'string to encode'] ");
console.log("");
console.log("Example usage:");
console.log("");
console.log("$ crypto-cli.js --md5 --value 'a,b,c'");
console.log("> a44c56c8177e32d3613988f4dba7962e");
console.log("");
console.log("$ crypto-cli.js --md5 --value 'a' --value 'b' --value 'c'");
console.log("> a44c56c8177e32d3613988f4dba7962e");
console.log("");
console.log("");

process.exit(0);
