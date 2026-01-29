const mysql = require("mysql2/promise");

const pool = mysql.createPool({
  host: centerbeam.proxy.rlwy.net,
  user: root,
  password: yjhuOsQmeoFHIEYAyAyjfSMrrEFBcMDD,
  database: railway,
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0,
  port: 24704
});

module.exports = pool;
