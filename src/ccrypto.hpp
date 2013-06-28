//
// C++ Methods for MD5 encoding strings
//
#ifndef _NODE_CCRYPTO_HPP
#define _NODE_CCRYPTO_HPP

#include <string>
#include <vector>

namespace ccrypto {
	std::string md5_hex_digest(const std::string & a);
	std::string md5_hex_digest(const std::vector<std::string> & a);
}

#endif /* end .hpp */
