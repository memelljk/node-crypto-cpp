//
// Node-C++ Bindings for MD5 encoding strings
//
#ifndef _NODE_CCRYPTO_FN_SPEED_TEST_HPP
#define _NODE_CCRYPTO_FN_SPEED_TEST_HPP

#include <cstdlib>
#include <string>

namespace ccrypto {
// Repeat the internal call 1_000_000 times
v8::Handle<v8::Value> md5_hex_digest_fn_repeater(const v8::Arguments& args);
}

#endif /* end .hpp */
