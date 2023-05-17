const express = require("express");
const fileUpload = require("express-fileupload");
const helmet = require("helmet");
const Route = require("./routes/ProductRoutes");


const app = express();

app.use(helmet());

const port = 3000;

app.use(express.json());
app.use(fileUpload());
app.use(Route);
app.use(express.static("public"));

app.listen(port, () => {
  console.log("Server running");
});
