require("dotenv").config();
const database = require("./database/index");
const seeder = require("./database/seeder");

const express = require("express");
const app = express();
const routes = require("./routes/routes");

const cors = require("cors");
app.use(cors());
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.use(routes);

///CREATES NEW TABLES, USE WITH CAUTION
/* database.sequelize.sync({ force: true }).then(() => {
  console.log(`TABLES CREATED`);
  //ACTIVATES SEEDER, USE WITH CAUTION
  seeder();
}); */

const port = 3079;
app.listen(port, () => console.log(`Servidor en http://localhost:${port}/`));
