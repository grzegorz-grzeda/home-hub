require("dotenv").config();

const express = require("express");
const port = process.env.PORT || 3000;

const expressLayouts = require("express-ejs-layouts");

const app = express();

app.set("view engine", "ejs");
app.set("layout", "layouts/layout");
app.set('layout extractStyles', true);
app.set('layout extractScripts', true);
app.use(expressLayouts);

app.get("/", (req, res) => {
    res.render("index");
});

app.listen(port, () => {
    console.log(`Example app listening at http://localhost:${port}`);
});  