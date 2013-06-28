#include <v8.h>
#include <node.h>

#include "ccrypto.hpp"
#include "ccrypto_fn.hpp"
#include "ccrypto_fn_speed_test.hpp"

void RegisterModule(v8::Handle<v8::Object> target) {
    node::SetMethod(
        target,
        "md5_hex_digest_fn",
        ccrypto::md5_hex_digest_fn);
    node::SetMethod(
        target,
        "md5_hex_digest_fn_repeater",
        ccrypto::md5_hex_digest_fn_repeater);
}

NODE_MODULE(ccrypto_speed_tests, RegisterModule);
