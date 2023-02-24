const mysql = require("mysql");

const db = mysql.createConnection({
    user: "root",
    host: "localhost",
    password: "kkmaplee203233780",
    database: "wewatchf",
  });
  
  db.connect(console.log('db alive'));

  module.exports= { db }