const { Client } = require("pg");
const db_client = new Client({
    user: "postgres",
    password: "shresthas",
    database: "messagely",
    host: "localhost",
    port: 5432
})

module.exports = db_client; 