#!/usr/bin/env node

var argv = require('optimist')
	.argv;


// Load the implementation type
// Default is C++ Object
var impl = undefined;
if (argv.impl && argv.impl === 'cpp') {
	impl = require('../index.js')
		.cpp_object;
} else if (argv.impl && argv.impl === 'js') {
	impl = require('../index.js')
		.original_implementation;
} else {
	impl = require('../index.js')
		.cpp_object;
}

if (argv.md5) {
	var md5 = impl.md5(argv.value)
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
