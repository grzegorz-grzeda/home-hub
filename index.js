require("dotenv").config();

const dbConfig = require("./config/dbConfig");
dbConfig.connectToDb(process.env.DB_URL);

const express = require("express");
const port = process.env.PORT || 3000;

const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

const path = require("path");
app.use(express.static(path.join(__dirname, "views/public")));

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

const logoutRouter = require("./routes/logoutRouter");
app.use("/logout", logoutRouter);

const userRouter = require("./routes/userRouter");
app.use("/user", userRouter);

const dashboardRouter = require("./routes/dashboardRouter");
app.use("/dashboard", dashboardRouter);

const profileRouter = require("./routes/profileRouter");
app.use("/profile", profileRouter);

const indexRouter = require("./routes/indexRouter");
app.use("/", indexRouter);

const errorHandling = require("./middleware/errorHandling");
errorHandling(app);

const server = app.listen(port, () => {
    console.log(`Example app listening at http://localhost:${port}`);
});

process.on('unhandledRejection', (err) => {
    console.error('Unhandled Rejection! Shutting down...');
    console.error(err.name, err.message);
    server.close(() => {
        process.exit(1);
    });
});

process.on('uncaughtException', (err) => {
    console.error('Uncaught Exception! Shutting down...');
    console.error(err.name, err.message);
    server.close(() => {
        process.exit(1);
    });
});