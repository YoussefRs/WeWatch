const mysql = require("mysql");

const db = mysql.createConnection({
    user: "",
    host: "",
    password: "",
    database: "",
  });
  
  db.connect(console.log('db alive'));

  module.exports= { db }
