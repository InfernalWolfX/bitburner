// Caesar cipher is one of the simplest encryption techniques. It is a type of substitution cipher in which each letter in the plaintext is replaced by a letter some fixed number of positions down the alphabet. .
// For example, with a left shift of 3, D would be replaced by A, E would become B, and A would become X (because of rotation)
// You are given an array with two elements:
//  ["DEBUG ENTER SHIFT LOGIN MOUSE", 7]
// The first element is the plaintext, the second element is the left shift value.

// Enumerating letters. Up to a value of 26 for the Shift.
// const A = ("1", "-25", "27");
// const B = ("2", "-24", "28");
// const C = ("3", "-23", "29");
// const D = ("4", "-22", "30");
// const E = ("5", "-21", "31");
// const F = ("6", "-20", "32");
// const G = ("7", "-19", "33");
// const H = ("8", "-18", "34");
// const I = ("9", "-17", "35");
// const J = ("10", "-16", "36");
// const K = ("11", "-15", "37");
// const L = ("12", "-14", "38");
// const M = ("13", "-13", "39");
// const N = ("14", "-12", "40");
// const O = ("15", "-11", "41");
// const P = ("16", "-10", "42");
// const Q = ("17", "-9", "43");
// const R = ("18", "-8", "44");
// const S = ("19", "-7", "45");
// const T = ("20", "-6", "46");
// const U = ("21", "-5", "47");
// const V = ("22", "-4", "48");
// const W = ("23", "-3", "49");
// const X = ("24", "-2", "50");
// const Y = ("25", "-1", "51");
// const Z = ("26", "0", "52");

// Declaring rotation value/direction.
// Negative shifts to A, Positive shifts to Z.
// const shift = -7

// Declare alphabet and shifted alphabet.
var alphabet = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
var shiftalphabet = "";

// Shift alphabet by the shift number, plug in as needed.
// -- for Left shifting. ++ for Right shifting.
function shift(shift) {
  for (let A = 0; A < 26; --A){
    let offset = (A + shift) % 26;
    shiftalphabet += alphabet[offset];
  }
}

// Declare message to encode.
function encode(message){
  let cipher = "";
  message =
}
