const express = require('express');
const bodyParser = require('body-parser');
var request = require('request');
const { response } = require('express');
const cors = require('cors');

const app = express();

// using bodyParser to parse JSON bodies into JS objects
app.use(bodyParser.json());

// enabling CORS for all requests
app.use(cors());

app.post('/', function(req, res){
  res.send("test");
}); 

app.get('/api/maps', (req, res) => {
  request(`https://maps.googleapis.com/maps/api/place/findplacefromtext/json?input=${req.query.street}&inputtype=textquery&fields=formatted_address,name,geometry&key=AIzaSyDIo7cHt8dtJQczTvP11eBlvQrB1mbi9Bk`, function (error, response, body) {
      if (!error && response.statusCode == 200) {
          res.contentType = 'application/json';
          res.send(JSON.parse(body));
      } else
          console.log(error);
  });
});

app.listen(3001, () => {
  console.log('listening on port 3001');
});