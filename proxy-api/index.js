// proxy-api/index.js
const express = require('express');
const httpProxy = require('http-proxy');

const app = express();
const proxy = httpProxy.createProxyServer();

const nodeUrls = {
  1: 'http://casper-nctl:11101', // Update with the correct NCTL node ports
  2: 'http://casper-nctl:11102',
  3: 'http://casper-nctl:11103',
};

app.use(express.json());

app.use('/1/rpc', (req, res) => {
  proxy.web(req, res, { target: nodeUrls[1] });
});

app.use('/2/rpc', (req, res) => {
  proxy.web(req, res, { target: nodeUrls[2] });
});

app.use('/3/rpc', (req, res) => {
  proxy.web(req, res, { target: nodeUrls[3] });
});

app.listen(3000, () => {
  console.log('Proxy API listening at http://localhost:3000');
});
