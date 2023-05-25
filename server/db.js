const Pool = require("pg").Pool


const pool = new Pool({
    user: "postgres",
    password: "postgresnawsheen",
    host: "localhost",
    port: 5432,
    database: "dbmsproject"
});

module.exports = pool;