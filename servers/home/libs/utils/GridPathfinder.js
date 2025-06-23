// servers/home/libs/utils/GridPathfinder.js
async function main(ns) {
  function numberOfPaths(r2, c2) {
    if (r2 === 1 || c2 === 1) {
      return 1;
    }
    return numberOfPaths(r2 - 1, c2) + numberOfPaths(r2, c2 - 1);
  }
  const r = 8;
  const c = 6;
  ns.tprint(numberOfPaths(r, c));
}
export {
  main
};
