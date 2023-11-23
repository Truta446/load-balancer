const express = require("express");
const { createProxyMiddleware } = require("http-proxy-middleware");

const router = express.Router();

const servers = [
  {
    id: "99b07262-faa6-4591-a53c-8c271f36f247",
    host: "localhost",
    port: 3000,
    weight: 1,
  },
  {
    id: "634e5332-5fb7-433c-a73b-9991881a9d59",
    host: "localhost",
    port: 3001,
    weight: 2,
  },
];

const proxyOptions = {
  target: "",
  changeOrigin: true,
  onProxyReq: (proxyReq, req) => {
    proxyReq.setHeader("X-Special-Proxy-Header", "foobar");
  },
  logLevel: "debug",
};

let healthyServers = [];
let totals = [];
const COOKIE_NAME = "lb-affinity";

function initWeights() {
  totals = [];
  let runningTotal = 0;

  for (let i = 0; i < servers.length; i++) {
    runningTotal += servers[i].weight;
    totals.push(runningTotal);
  }
}

function getServer() {
  const random = Math.floor(Math.random() * totals[totals.length - 1]) + 1;

  for (let i = 0; i < totals.length; i++) {
    if (random <= totals[i]) {
      return servers[i];
    }
  }
}

router.all("*", (req, res) => {
  if (healthyServers.length === 0) {
    return res.status(500).send("No healthy servers!");
  }

  let selectedServer = getServer();

  if (!req?.cookies?.[COOKIE_NAME]) {
    res.cookie(COOKIE_NAME, selectedServer.id, {
      httpOnly: true,
    });
  } else {
    const affinityId = req.cookies[COOKIE_NAME];

    selectedServer = servers.find((s) => s.id === affinityId);
  }

  proxyOptions.target = `http://${selectedServer.host}:${selectedServer.port}`;

  createProxyMiddleware(proxyOptions)(req, res);
});

function updateHealthyServers() {
  healthyServers = servers;
}

initWeights();
updateHealthyServers();

setInterval(updateHealthyServers, 10000);

module.exports = router;
