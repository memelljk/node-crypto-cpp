#include <node.h>
#include <cstdlib>
#include <string>
#include <algorithm>
// #include <iostream>

#include "../includes/cvv8/convert.hpp"
#include "ccrypto.hpp"
#include "ccrypto_fn.hpp"

namespace ccrypto {

v8::Handle<v8::Value> md5_hex_digest_fn(const v8::Arguments& args) {
    v8::HandleScope scope;

    v8::Handle<v8::Value> arg = args[0];

    // No input?
    if (arg.IsEmpty() || arg->IsUndefined() || arg->IsNull()) {
        return scope.Close(arg);
    }

    if (arg->IsArray()) {
        const std::vector<std::string> list(cvv8::CastFromJS< std::vector<std::string> >(arg));
        const std::string md5 = md5_hex_digest(list);
        return scope.Close(cvv8::CastToJS<std::string>(md5));
    }
    else {
        const std::string list(cvv8::CastFromJS< std::string >(arg));
        const std::string md5 = md5_hex_digest(list);
        return scope.Close(cvv8::CastToJS<std::string>(md5));
    }
}

}
