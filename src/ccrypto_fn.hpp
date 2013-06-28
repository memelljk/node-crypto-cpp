//
// Node-C++ Bindings for MD5 encoding strings
//
#ifndef _NODE_CCRYPTO_FN_HPP
#define _NODE_CCRYPTO_FN_HPP

#include <cstdlib>
#include <string>

namespace ccrypto {
	v8::Handle<v8::Value> md5_hex_digest_fn(const v8::Arguments& args);
}

#endif /* end .hpp */
