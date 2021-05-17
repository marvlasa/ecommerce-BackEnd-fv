require("dotenv").config();

const express = require("express");
const app = express();
const port = 3080;
const routes = require("./routes/routes");

app.use(express.urlencoded({ extended: true }));

app.use(routes);

app.listen(port, () => console.log(`Servidor en http://localhost:${port}/`));
