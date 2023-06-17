const bs = require("browser-sync").create();
const { resolve } = require("path");

const STATIC_DIR = resolve(__dirname, "./static");

function startBrowserSync() {
  bs.init({ server: STATIC_DIR, ui: false, watch: true, open: false });
}

startBrowserSync();
