const boom = require('boom')
const path = require("path");
const express = require("express");
const bodyParser = require('body-parser')
const productsRouter = require("./routes/views/products");
const productsApiRouter = require('./routes/api/products')
const authApiRouter = require('./routes/api/auth')
const isRequestAjaxOrApi = require('./utils/isRequestAjaxOrApi')
const {
  logErrors,
  wrapErrors,
  clientErrorHandler,
  errorHandler} = require('./utils/middlewares/errorsHandlers')


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
productsApiRouter(app)
app.use("/api/auth", authApiRouter)

app.use(function (req, res) {
  if (isRequestAjaxOrApi(req)) {
    const {
      output: {statusCode, payload}
    } = boom.notFound()
    res.status(statusCode).json(payload)
  }
  res.status(404).render("404")
})

// error handlers
app.use(logErrors)
app.use(wrapErrors)
app.use(clientErrorHandler)
app.use(errorHandler)

const PORT = 3000;
app.listen(PORT, function () {
  console.log(`Server listening on port ${PORT}.`);
});
