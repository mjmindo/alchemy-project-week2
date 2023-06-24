const express = require('express');
const verifyProof = require('../utils/verifyProof');

const port = 1225;

const app = express();
app.use(express.json());

// TODO: hardcode a merkle root here representing the whole nice list
// paste the hex string in here, without the 0x prefix
const MERKLE_ROOT = '210cfc93bd37b2821da79758ab5f62cfe200b1fe1c317ad7b947d18a48e654fe';

app.post('/gift', (req, res) => {
  // grab the parameters from the front-end here
  const body = req.body;
  const isInTheList = verifyProof(body.proof,body.name,MERKLE_ROOT);
  if(isInTheList) {
    res.send("You got a toy robot!");
  }
  else {
    res.send("You are not on the list :(");
  }
});

app.listen(port, () => {
  console.log(`Listening on port ${port}!`);
});
