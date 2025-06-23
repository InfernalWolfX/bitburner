// LZ Bitburner compression
// Lempel-Ziv (LZ) compression is a data compression technique which encodes data
// using references to earlier parts of the data.
// In this variant of LZ, data is encoded in two types of chunk.
// Each chunk begins with a length L, encoded as a single ASCII digit from 1 to 9,
// followed by the chunk data, which is either:
// 1. Exactly L characters, which are to be copied directly into the uncompressed data.
// 2. A reference to an earlier part of the uncompressed data.
// To do this, the length is followed by a second ASCII digit
// X: each of the L output characters is a copy of the character X places before it in the uncompressed data.
// First X characters from Y characters back OF THE UNCOMPRESSED DATA.
// For both chunk types, a length of 0 instead means the chunk ends immediately,
// and the next character is the start of a new chunk.
// The two chunk types alternate, starting with type 1, and the final chunk may be of either type.
// decoding '5aaabb450723abb' chunk-by-chunk
//
//    5aaabb           ->  aaabb
//    5aaabb45         ->  aaabbaaab
//    5aaabb450        ->  aaabbaaab
//    5aaabb45072      ->  aaabbaaababababa
//    5aaabb450723abb  ->  aaabbaaababababaabb

// 961OYZh4xe0723Uux6h179ZLh3Y6EDl09fBfUfUX8x782XG446UHK8mW595Cz88J848a183T6DP

// 961OYZh4xe                                                                   ->  61OYZh4xe
// 961OYZh4xe0                                                                  ->  61OYZh4xe
// 961OYZh4xe0723Uux6h                                                          ->  61OYZh4xe23Uux6h
// 961OYZh4xe0723Uux6h17                                                        ->  61OYZh4xe23Uux6h2
// 961OYZh4xe0723Uux6h179ZLh3Y6EDl                                              ->  61OYZh4xe23Uux6h2ZLh3Y6EDl
// 961OYZh4xe0723Uux6h179ZLh3Y6EDl0                                             ->  61OYZh4xe23Uux6h2ZLh3Y6EDl
// 961OYZh4xe0723Uux6h179ZLh3Y6EDl09fBfUfUX8x                                   ->  61OYZh4xe23Uux6h2ZLh3Y6EDlfBfUfUX8x
// 961OYZh4xe0723Uux6h179ZLh3Y6EDl09fBfUfUX8x78                                 ->  61OYZh4xe23Uux6h2ZLh3Y6EDlfBfUfUX8xBfUfUX8
// 961OYZh4xe0723Uux6h179ZLh3Y6EDl09fBfUfUX8x782XG                              ->  61OYZh4xe23Uux6h2ZLh3Y6EDlfBfUfUX8xBfUfUX8XG
// 961OYZh4xe0723Uux6h179ZLh3Y6EDl09fBfUfUX8x782XG44                            ->  61OYZh4xe23Uux6h2ZLh3Y6EDlfBfUfUX8xBfUfUX8XGX8XG
// 961OYZh4xe0723Uux6h179ZLh3Y6EDl09fBfUfUX8x782XG446UHK8mW                     ->  61OYZh4xe23Uux6h2ZLh3Y6EDlfBfUfUX8xBfUfUX8XGX8XGUHK8mW
// 961OYZh4xe0723Uux6h179ZLh3Y6EDl09fBfUfUX8x782XG446UHK8mW59                   ->  61OYZh4xe23Uux6h2ZLh3Y6EDlfBfUfUX8xBfUfUX8XGX8XGUHK8mW8XGUH
// 961OYZh4xe0723Uux6h179ZLh3Y6EDl09fBfUfUX8x782XG446UHK8mW595Cz88J             ->  61OYZh4xe23Uux6h2ZLh3Y6EDlfBfUfUX8xBfUfUX8XGX8XGUHK8mW8XGUHCz88J
// 961OYZh4xe0723Uux6h179ZLh3Y6EDl09fBfUfUX8x782XG446UHK8mW595Cz88J84           ->  61OYZh4xe23Uux6h2ZLh3Y6EDlfBfUfUX8xBfUfUX8XGX8XGUHK8mW8XGUHCz88Jz88Jz88J
// 961OYZh4xe0723Uux6h179ZLh3Y6EDl09fBfUfUX8x782XG446UHK8mW595Cz88J848a183T6DP  ->  61OYZh4xe23Uux6h2ZLh3Y6EDlfBfUfUX8xBfUfUX8XGX8XGUHK8mW8XGUHCz88Jz88Jz88Ja183T6DP
