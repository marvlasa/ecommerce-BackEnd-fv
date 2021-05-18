require("dotenv").config();

const express = require("express");
const app = express();
const port = 3080;
const routes = require("./routes/routes");
var cors = require("cors");

app.use(cors());

app.use(express.urlencoded({ extended: true }));

app.use(routes);

app.listen(port, () => console.log(`Servidor en http://localhost:${port}/`));
