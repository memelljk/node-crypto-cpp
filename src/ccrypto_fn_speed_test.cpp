#include <node.h>
#include <cstdlib>
#include <string>
#include <algorithm>
#include <iostream>

#include "../includes/cvv8/convert.hpp"
#include "ccrypto.hpp"
#include "ccrypto_fn.hpp"
#include "ccrypto_fn_speed_test.hpp"

namespace ccrypto {

// Repeat the internal call 1_000_000 times
v8::Handle<v8::Value> md5_hex_digest_fn_repeater(const v8::Arguments& args) {
    v8::HandleScope scope;


    long num_loops = cvv8::CastFromJS<long>(args[0]);

#ifdef DEBUG
    std::cout
            << "md5_hex_digest( x"
            << num_loops
            << " ) Starting ..." << std::endl;
#endif


    v8::Handle<v8::Value> arg = args[1];

    // No input?
    if (arg.IsEmpty() || arg->IsUndefined() || arg->IsNull()) {
        std::cerr << "md5_hex_digest(error) !!!" << std::endl;
        return scope.Close(arg);
    }


    std::string output;
    if (arg->IsArray()) {
        const std::vector<std::string> input(cvv8::CastFromJS< std::vector<std::string> >(arg));

#ifdef DEBUG
        std::cout << "md5_hex_digest(array) Starting ..." << std::endl;
#endif

        for(long i = 0; i < num_loops; i++) {
#ifdef DEBUG
            std::cout << "md5_hex_digest(array) x " << i << std::endl;
#endif

            output = md5_hex_digest(input);
        }

        std::cout << "md5_hex_digest(array) Ended!" << std::endl;
    }
    else {
        const std::string input(cvv8::CastFromJS< std::string >(arg));

#ifdef DEBUG
        std::cout << "md5_hex_digest(string) Starting ..." << std::endl;
#endif

        for(long i = 0; i < num_loops; i++) {
#ifdef DEBUG
            std::cout << "md5_hex_digest(string) x " << i << std::endl;
#endif

            output = md5_hex_digest(input);
        }

#ifdef DEBUG
        std::cout << "md5_hex_digest(string) Ended!" << std::endl;
#endif
    }

    return scope.Close(cvv8::CastToJS<std::string>(output));
}

}
