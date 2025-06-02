const express = require("express");
const fs = require("fs");
const app = express();

const PORT = 3000;
const FILE = "bigfile.txt";

// Helper: logs with timestamp and request ID
let reqId = 0;
function log(label, id) {
  console.log(`[${new Date().toISOString()}] [${label}] Req#${id}`);
}

// SYNC ENDPOINT: blocks event loop
app.get("/sync", (req, res) => {
  const myId = ++reqId;
  log("SYNC - start", myId);
  try {
    const data = fs.readFileSync(FILE);
    setTimeout(() => { // simulate processing
      log("SYNC - end", myId);
      res.send(`SYNC done for Req#${myId}, bytes: ${data.length}`);
    }, 2000);
  } catch (err) {
    res.status(500).send("Error: " + err.message);
  }
});

// ASYNC ENDPOINT: non-blocking
app.get("/async", async (req, res) => {
  const myId = ++reqId;
  log("ASYNC - start", myId);
  try {
    const data = await fs.promises.readFile(FILE);
    setTimeout(() => { // simulate processing
      log("ASYNC - end", myId);
      res.send(`ASYNC done for Req#${myId}, bytes: ${data.length}`);
    }, 2000);
  } catch (err) {
    res.status(500).send("Error: " + err.message);
  }
});

app.listen(PORT, () => {
  console.log(`Server started on http://localhost:${PORT}`);
  console.log(`Test with: curl http://localhost:${PORT}/sync and /async`);
});
