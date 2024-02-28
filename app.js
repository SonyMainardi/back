const express = require("express");
const bodyParser = require('body-parser')
const cors = require("cors")

require('dotenv').config()

const routes = require("./routes");

const app = express();

app.use(cors({
  origin: '*',
  methods: 'GET,HEAD,PUT,PATCH,POST,DELETE'
}));

global.connection = require("./src/database");

app.use(bodyParser.json());

app.use(routes);

app.listen(8000, function(err) {
  if(err) { 
    console.log(err);
  }
  else {
    console.log("Server Started At Port 8000")
  }
});