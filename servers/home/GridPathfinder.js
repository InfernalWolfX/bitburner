/** @param {NS} ns */
export async function main(ns) {

// Computes the number of unique paths from the top-left corner
// to the bottom-right corner of an r×c grid, moving only down or right.

// {number} r - Number of rows in the grid.
// {number} c - Number of columns in the grid.
// Returns {number} The total number of unique paths.

  function numberOfPaths(r, c) {
    // Base case: if there's only one row or one column,
    // there is exactly one path (all the way right or all the way down).
    if (r === 1 || c === 1) {
      return 1;
    }

    // Recursive step: sum of paths from the cell above (r-1, c)
    // and from the cell to the left (r, c-1)
    return numberOfPaths(r - 1, c) + numberOfPaths(r, c - 1);
  }

  // Plug in the numbers of the grid you need:
  const r = 8;
  const c = 6;

  ns.tprint(numberOfPaths(r, c));  // Outputs the number of paths for a grid.
}
