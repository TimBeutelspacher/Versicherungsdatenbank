const knex = require("knex");
var pg = require('pg');
var connectionString = "postgres://onhirkepnjqlcw:2b8b310ee25ae03f6f2703a9f40687929930823c1eff5b53a090e2e698c527af@ec2-54-77-182-219.eu-west-1.compute.amazonaws.com:5432/d2i40f3gjsoa7u";
var pgClient = new pg.Client(connectionString);

//Aufruf der knex-Funktion mit Übergabe eines Konfigurationsobjekts --> Funktion gibt eine connected Instanz von knex
const connectedKnex = knex({
    client: "pg",
    connection: {
      host : 'ec2-54-77-182-219.eu-west-1.compute.amazonaws.com',
      port : 5432,
      user : 'credentials.user',
      password : 'credentials.password',
      database : 'credentials.database',
      ssl: { rejectUnauthorized: false }
    }
});


module.exports = connectedKnex;
