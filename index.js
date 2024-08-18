require("dotenv").config();

const dbConfig = require("./config/dbConfig");
dbConfig.connectToDb(process.env.DB_URL);

const express = require("express");
const bodyParser = require("body-parser");
const port = process.env.PORT || 3000;

const app = express();
app.use(bodyParser.urlencoded({ extended: true }));

const morgan = require('morgan');
app.use(morgan('dev'));

const expressLayouts = require("express-ejs-layouts");
app.set("view engine", "ejs");
app.set("layout", "layouts/layout");
app.set('layout extractStyles', true);
app.set('layout extractScripts', true);
app.use(expressLayouts);

const userRouter = require("./routes/userRouter");
app.use("/user", userRouter);

app.get("/", (req, res) => {
    res.render("index");
});

app.listen(port, () => {
    console.log(`Example app listening at http://localhost:${port}`);
});  