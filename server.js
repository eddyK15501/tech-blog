const express = require("express");
const path = require('path')

const exphbs = require('express-handlebars')

const sequelize = require("./config/connection");

const routes = require('./routes')

const app = express();
const PORT = process.env.PORT || 3001;

const hbs = exphbs.create();

app.engine('handlebars', hbs.engine);
app.set('view engine', 'handlebars')

app.use(express.static(path.resolve(__dirname, 'public')))

app.use(routes)

sequelize.sync({ force: false }).then(() => {
  app.listen(PORT, () => {
    console.log("Server now listening.");
  });
});
