function connect(){
  if(global.conn && global.conn.state !== 'disconnected')
      return global.conn;

  const mysql = require("mysql2");
  const connection = mysql.createConnection({
    host: process.env.BDHOST,
    user: process.env.BDUSER,
    password: process.env.BDPASSWORD,
    database: process.env.DATABASE
  });

  console.log("Connected to Database");
  global.conn = connection;
  return connection;
}

connect();

module.exports = {
  
}
