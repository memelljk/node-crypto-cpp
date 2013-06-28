#include <v8.h>
#include <node.h>

#include "ccrypto.hpp"
#include "ccrypto_fn.hpp"

void RegisterModule(v8::Handle<v8::Object> target) {
    node::SetMethod(
        target,
        "md5_hex_digest_fn",
        ccrypto::md5_hex_digest_fn);
}

NODE_MODULE(ccrypto, RegisterModule);
