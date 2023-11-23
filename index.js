const fs = require("fs");
const https = require("https");
const express = require("express");
const cookieParser = require("cookie-parser");

const proxyRouter = require("./routes/proxy");

const app = express();

app.use("/app", proxyRouter);
app.use(cookieParser());

const options = {
  key: fs.readFileSync("./ssl/key.pem"),
  cert: fs.readFileSync("./ssl/cert.pem"),
};

https.createServer(options, app).listen(443, () => {
  console.log("Load balancer started on port 443");
});
