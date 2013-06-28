#include <stdio.h>
#include <stdlib.h>
#include <string>
#include <boost/algorithm/string.hpp>
#include <boost/algorithm/string/join.hpp>

#if defined(__APPLE__)

#define COMMON_DIGEST_FOR_OPENSSL
#include <CommonCrypto/CommonDigest.h>
#define SHA1 CC_SHA1

#else

#include <openssl/md5.h>

#endif

#include "ccrypto.hpp"

// Pulled from node_crypto.cc
namespace ccrypto {

	std::string str2md5(const char *str, int length) {
			// Setup the context
	    MD5_CTX context;
	    MD5_Init(&context);

			// While we have any characters left loop
	    while (length > 0) {
	        if (length > 512) {
	            MD5_Update(&context, str, 512);
	        } else {
	            MD5_Update(&context, str, length);
	        }
	        length -= 512;
	        str += 512;
	    }

			// Teardown
	    unsigned char digest[16];
	    MD5_Final(digest, &context);

			// Copy the digest to the buffer
	    char buffer[33]; for(int i = 0; i < 33; i++) buffer[i] = 0;
	    for (int n = 0; n < 16; ++n) {
	        snprintf(&(buffer[n*2]), 16*2, "%02x", (unsigned int)digest[n]);
	    }

			// Return a std::string
			return std::string(buffer);
	}
	
	std::string md5_hex_digest(const std::string & a) {
		return str2md5(a.c_str(), a.length());
	}
	
	std::string md5_hex_digest(const std::vector<std::string> & a) {
    // Join the CSV string
		return md5_hex_digest(boost::algorithm::join(a, ","));
	}
}
