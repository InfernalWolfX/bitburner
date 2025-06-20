/** @param {NS} ns */
export async function main(ns) {
  // ALL CREDIT to Reddit user u/Low_Painting6291
  // for this fantastic stock exchange visualizer!
  /** asciiTV.js – v3  (10 fps interactive ASCII chart)
   *  Keys in the tail window:
   *      A / D  : previous / next ticker
   *      W / S  : +1 min / –1 min timeframe  (bounds 5–60 min)
   *  Chart size: 100×18, 10 vertical grid cells.
   *  RAM: ≈3.2 GB

    /* ----------- tunables -------------------------- */
    const PRICE_TICK_MS = 6_000;    // real stock tick
    const UI_REFRESH_MS = 100;      // 10 frames per second
    const WIDTH = 100;
    const HEIGHT = 18;
    const V_STEP = WIDTH / 10;
    const H_STEP = 5;
    const LABEL_W = 10;
    const MAX_MINUTES = 60;       // buffer cap
    const MIN_MINUTES = 5;
    const MAX_TICKS = MAX_MINUTES * 10;   // 600

    /* ----------- data --------------------------------------------- */
    const symbols = ns.stock.getSymbols();
    const buffers = Object.fromEntries(symbols.map(s => [s, []]));      // price history
    const tfMinutes = Object.fromEntries(symbols.map(s => [s, 5]));       // per‑symbol tf
    let curIdx = Math.max(0, symbols.indexOf(ns.args[0] ?? symbols[0]));

    /* ----------- keyboard ------------------------------------------ */
    const doc = eval("document");
    doc.addEventListener("keydown", e => {
      switch (e.key.toLowerCase()) {
        case "a": curIdx = (curIdx - 1 + symbols.length) % symbols.length; break;
        case "d": curIdx = (curIdx + 1) % symbols.length; break;
        case "w": tfMinutes[symbols[curIdx]] =
          Math.min(MAX_MINUTES, tfMinutes[symbols[curIdx]] + 1); break;
        case "s": tfMinutes[symbols[curIdx]] =
          Math.max(MIN_MINUTES, tfMinutes[symbols[curIdx]] - 1); break;
      }
    });

    /* ----------- helpers ------------------------------------------- */
    const fmt = ms => new Date(ms).toLocaleTimeString("en-GB");
    const push = (buf, val) => { buf.push(val); if (buf.length > MAX_TICKS) buf.shift(); };

    function sampleWindow(buf, want, width) {
      const out = Array(width).fill(null);
      if (!buf.length) return out;
      const start = Math.max(0, buf.length - want);
      const span = buf.length - start;
      for (let col = width - 1; col >= 0; col--) {
        const rel = (width - 1 - col) / (width - 1);      // 0 … 1
        const idx = buf.length - 1 - Math.round(rel * (want - 1));
        out[col] = buf[idx] ?? buf[0];
      }
      return out;
    }

    function draw(sym, now) {
      const minutes = tfMinutes[sym];
      const wantTicks = minutes * 10;
      const buf = buffers[sym];
      const series = sampleWindow(buf, wantTicks, WIDTH);

      if (series.every(v => v === null))
        return `${sym} – gathering data…`;

      const valid = series.filter(v => v !== null);
      const max = Math.max(...valid);
      const min = Math.min(...valid);
      const span = max - min || 1;

      const grid = Array.from({ length: HEIGHT }, () => Array(WIDTH).fill(" "));
      for (let r = HEIGHT - 1; r >= 0; r -= H_STEP)
        for (let c = 0; c < WIDTH; c++) grid[r][c] = "-";
      for (let c = 0; c < WIDTH; c += V_STEP)
        for (let r = 0; r < HEIGHT; r++) grid[r][c] = "|";

      for (let c = 0; c < WIDTH; c++) {
        if (series[c] === null) continue;
        const lvl = Math.round((series[c] - min) / span * (HEIGHT - 1));
        for (let r = HEIGHT - 1; r >= HEIGHT - 1 - lvl; r--) grid[r][c] = "█";
      }

      let out = `${sym} – ${minutes} min\n`;
      for (let r = 0; r < HEIGHT; r++) {
        const label =
          r === 0 ? max.toFixed(2).padStart(LABEL_W) :
            r === HEIGHT - 1 ? min.toFixed(2).padStart(LABEL_W) :
              " ".repeat(LABEL_W);
        out += label + " " + grid[r].join("") + "\n";
      }
      out += " ".repeat(LABEL_W) + "-".repeat(WIDTH) + "\n";
      const start = now - (wantTicks - 1) * PRICE_TICK_MS;
      const sTime = fmt(start);
      const eTime = fmt(now);
      out += " ".repeat(LABEL_W) +
        sTime.padEnd(WIDTH - eTime.length) + eTime + "\n";
      return out;
    }

    const statusLine = () => symbols.map(s => `${s}:${tfMinutes[s]} min`).join("  ");

    /* ----------- loops ---------------------------------------------- */
    ns.disableLog("ALL");
    ns.ui.openTail();

    let nextSample = Date.now();           // when to fetch next prices

    while (true) {
      const now = Date.now();

      /* sample once per stock‑market tick (≈6 s) */
      if (now >= nextSample) {
        for (const s of symbols) push(buffers[s], ns.stock.getPrice(s));
        nextSample += PRICE_TICK_MS;
        // catch up if script was paused / lagged
        if (now > nextSample + PRICE_TICK_MS) nextSample = now + PRICE_TICK_MS;
      }

      /* UI frame (10 fps) */
      ns.clearLog();
      ns.print(statusLine() + "\n");
      ns.print(draw(symbols[curIdx], now));

      await ns.sleep(UI_REFRESH_MS);
    }
  }
