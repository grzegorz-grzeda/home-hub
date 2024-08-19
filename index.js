require("dotenv").config();
const HTTP_PORT = process.env.HTTP_PORT || 3000;

function setUpExpressApp() {
    const express = require("express");
    const app = express();

    app.use(express.json());
    app.use(express.urlencoded({ extended: true }));

    const path = require("path");
    app.use(express.static(path.join(__dirname, "views/public")));

    const bodyParser = require("body-parser");
    app.use(bodyParser.urlencoded({ extended: true }));

    const morgan = require('morgan');
    app.use(morgan('dev'));

    return app;
}

function setUpRoutes(app) {
    const apiRouter = require("./routes/apiRouter");
    app.use("/api", apiRouter);

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
}

function establishErrorHandling(app, server) {
    const errorHandling = require("./middleware/errorHandling");
    errorHandling(app);

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
}

async function serverStart() {
    const dbConfig = require("./config/dbConfig");
    await dbConfig.connectToDb(process.env.DB_URL);

    const app = setUpExpressApp();

    const sessionConfig = require("./config/sessionConfig");
    await sessionConfig(app);

    const flashMessagesConfig = require("./config/flashMessagesConfig");
    flashMessagesConfig(app);

    const passportConfig = require("./config/passportConfig");
    passportConfig(app);

    const layoutsConfig = require("./config/layoutsConfig");
    layoutsConfig(app);

    setUpRoutes(app);

    const server = app.listen(HTTP_PORT, () => {
        console.log(`Home Hub listening at http://localhost:${HTTP_PORT}`);
    });

    establishErrorHandling(app, server);
}

serverStart();
