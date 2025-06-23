// servers/home/libs/hacks/n00dlesdrain.js
async function main(ns) {
  const target = "n00dles";
  while (true) {
    if (ns.getServerMoneyAvailable(target) > 0) {
      await ns.hack(target);
    }
  }
}
export {
  main
};
