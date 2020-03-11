const express = require("express");
const mongoose = require("mongoose");
const config = require("./config/config");
const sassMiddleware = require("node-sass-middleware");
const lassesLakritsRouter = require("./router/router");
const admin = require("./router/admin/admin");
const path = require("path");
const app = express();

app.use(express.urlencoded({ extended: true }))

app.use(sassMiddleware({
    src: path.join(__dirname, "scss"),
    dest: path.join(__dirname, "public")
}));
app.use(express.static(path.join(__dirname, "public")));

app.set("view engine", "ejs");

app.set('views', [path.join(__dirname, 'views'), path.join(__dirname, 'views/public')]);

app.use(lassesLakritsRouter);

app.use(admin);

app.get("*", (req, res) => res.send("404"));

const options = {
<<<<<<< HEAD
    useUnifiedTopology: true, 
  useNewUrlParser: true,
  useCreateIndex: true
=======
    useUnifiedTopology: true,
    useNewUrlParser: true,
    useCreateIndex: true
>>>>>>> e09471cb2b65bb414a632c668f86dc3a7b268044
}

const port = process.env.PORT || 8000;
mongoose.connect(config.databaseUrl, options)
    .then(() => app.listen(port, () => console.log(`Connection success on port: ${port}`)));