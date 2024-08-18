require("dotenv").config();

const dbConfig = require("./config/dbConfig");
dbConfig.connectToDb(process.env.DB_URL);

const express = require("express");
const port = process.env.PORT || 3000;

const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

const bodyParser = require("body-parser");
app.use(bodyParser.urlencoded({ extended: true }));

const morgan = require('morgan');
app.use(morgan('dev'));

const session = require('express-session');
app.use(session({
    secret: process.env.SESSION_SECRET || 'secret',
    resave: false,
    saveUninitialized: false
}));

const flash = require('connect-flash');
app.use(flash());
app.use((req, res, next) => {
    res.locals.success_msg = req.flash('success_msg');
    res.locals.error = req.flash('error');
    next();
});

const passportConfig = require("./config/passportConfig");
passportConfig(app);

const expressLayouts = require("express-ejs-layouts");
app.set("view engine", "ejs");
app.set("layout", "layouts/layout");
app.set('layout extractStyles', true);
app.set('layout extractScripts', true);
app.use(expressLayouts);

const loginRouter = require("./routes/loginRouter");
app.use("/login", loginRouter);

const userRouter = require("./routes/userRouter");
app.use("/user", userRouter);

const dashboardRouter = require("./routes/dashboardRouter");
app.use("/dashboard", dashboardRouter);

const indexRouter = require("./routes/indexRouter");
app.use("/", indexRouter);

app.listen(port, () => {
    console.log(`Example app listening at http://localhost:${port}`);
});  