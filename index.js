const path = require("path");
const express = require("express");
const bodyParser = require('body-parser')
const productsRouter = require("./routes/views/products");
const productsApiRouter = require('./routes/api/products')

// app
const app = express();

// middlewares
app.use(bodyParser.json())

// static files
app.use("/static", express.static(path.join(__dirname,"public")))

// view engine setup
app.set("views", path.join(__dirname, "views"));
app.set("view engine", "pug");

// routes
app.use("/products", productsRouter);
app.use("/api/products", productsApiRouter)

// redirects
/* app.get("/", function (req, rest) {
  rest.redirect("/products")
}) */

const PORT = 3000;
app.listen(PORT, function () {
  console.log(`Server listening on port ${PORT}.`);
});
