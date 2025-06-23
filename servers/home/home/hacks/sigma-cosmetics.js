// servers/home/home/hacks/sigma-cosmetics.js
async function main(ns) {
  const target = "sigma-cosmetics";
  const moneyThresh = ns.getServerMaxMoney(target);
  const securityThresh = ns.getServerMinSecurityLevel(target);
  while (true) {
    if (ns.getServerSecurityLevel(target) >= securityThresh + 5) {
      await ns.weaken(target);
    } else if (ns.getServerMoneyAvailable(target) <= moneyThresh * 0.7) {
      await ns.grow(target);
    } else {
      await ns.hack(target);
    }
  }
}
export {
  main
};
