// servers/home/libs/utils/Scanner.js
// Many thanks to GitHub user femboyfireball for providing this!
async function main(ns) {
  let copyFile = ``;
  let runFile = ``;
  let hasSSH = false;
  let hasFTP = false;
  let hasSMTP = false;
  let hasHTTP = false;
  let hasSQL = false;
  let currentServer = 0;
  let ramToUse = 100;
  let serverList = ns.scan(`home`);
  let scannedServers = [];
  let serverClasses = [];
  if (ns.fileExists(`BruteSSH.exe`, `home`)) hasSSH = true;
  if (ns.fileExists(`FTPCrack.exe`, `home`)) hasFTP = true;
  if (ns.fileExists(`relaySMTP.exe`, `home`)) hasSMTP = true;
  if (ns.fileExists(`HTTPWorm.exe`, `home`)) hasHTTP = true;
  if (ns.fileExists(`SQLInject.exe`, `home`)) hasSQL = true;
  if (ns.args.includes(`-c`) || ns.args.includes(`--copyfile`)) copyFile = await ns.prompt(`What file are we copying?`, { type: `text` });
  if (ns.args.includes(`--runfile`)) {
    runFile = await ns.prompt(`What file are we running?`, { type: `text` });
    ramToUse = await ns.prompt(`How much ram do we use with this? Range: 0-100 (Percent value)`, { type: `text` });
  }
  for (; currentServer < serverList.length; currentServer++) {
    const targetServer = ns.getServer(serverList[currentServer]);
    if (scannedServers.includes(targetServer.hostname) || targetServer.hostname.includes(`home`)) continue;
    scannedServers.push(targetServer.hostname);
    const buffer = ns.scan(targetServer.hostname);
    buffer.filter((server) => !server.includes(scannedServers));
    serverList.push(...buffer);
    const serverClass = new Server(
      targetServer.ip,
      targetServer.hostname,
      targetServer.cpucores,
      targetServer.hasAdminRights,
      targetServer.maxRam,
      targetServer.minimumSecurity,
      targetServer.isPuchased,
      targetServer.reqHackingLevel
    );
    if (ns.args.includes(`--root`) && !targetServer.hasAdminRights) {
      if (!targetServer.sshPortOpen && hasSSH) ns.brutessh(targetServer.hostname);
      if (!targetServer.ftpPortOpen && hasFTP) ns.ftpcrack(targetServer.hostname);
      if (!targetServer.smtpPortOpen && hasSMTP) ns.relaysmtp(targetServer.hostname);
      if (!targetServer.httpPortOpen && hasHTTP) ns.httpworm(targetServer.hostname);
      if (!targetServer.sqlPortOpen && hasSQL) ns.sqlinject(targetServer.hostname);
      try {
        ns.nuke(targetServer.hostname);
      } catch {
      }
    }
    if (ns.args.includes(`-k`) || ns.args.includes(`--killall`)) ns.killall(targetServer.hostname);
    if (ns.args.includes(`-c`) || ns.args.includes(`--copyfile`)) ns.scp(copyFile, targetServer.hostname);
    if (ns.args.includes(`--runfile`) && ns.fileExists(runFile, targetServer.hostname) && (runFile.includes(`.js`) || runFile.includes(`.scripts`))) {
      const threads = Math.floor((targetServer.maxRam - targetServer.ramUsed) * ramToUse / ns.getScriptRam(runFile, targetServer.hostname));
      ns.exec(runFile, targetServer.hostname, threads);
    }
  }
}
export {
  main
};
