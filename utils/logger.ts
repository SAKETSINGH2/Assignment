const winston = require("winston");

const logger = winston.createLogger({
    level: "info , error",
    format: winston.format.json(),
    defaultMeta: { service: "user-service" },
    transports: [
        //
        // - Write all logs with importance level of `error` or less to `error.log`
        // - Write all logs with importance level of `info` or less to `combined.log`
        //
        new winston.transports.File({ filename: "error.log", level: "error" }),
        new winston.transports.File({ filename: "combined.log" }),
    ],
});

//
// If we're not in production then log to the `console` with the format:
// `${info.level}: ${info.message} JSON.stringify({ ...rest }) `
//
if (process.env.NODE_ENV !== "production") {
    logger.add(
        new winston.transports.Console({
            format: winston.format.simple(),
        })
    );
}

export default logger;

// import * as winston from "winston";
// import "winston-daily-rotate-file";

// const levels = {
//     error: 0,
//     warn: 1,
//     info: 2,
//     http: 3,
//     debug: 4,
// };

// const level = () => {
//     const env = process.env.NODE_ENV || "development";
//     const isDevelopment = env === "development";
//     return isDevelopment ? "debug" : "warn";
// };

// const colors = {
//     error: "red",
//     warn: "yellow",
//     info: "green",
//     http: "magenta",
//     debug: "white",
// };

// winston.addColors(colors);

// const format = winston.format.combine(
//     winston.format.timestamp({ format: "YYYY-MM-DD HH:mm:ss:ms" }),
//     winston.format.colorize({ all: true }),
//     winston.format.printf(
//         (info) => `${info.timestamp} ${info.level}: ${info.message}`
//     )
// );

// const fileRotateTransport = new winston.transports.DailyRotateFile({
//     filename: "logs/error-%DATE%.log",
//     datePattern: "YYYY-MM-DD",
//     maxFiles: "7d",
//     level: "warn",
// });

// const transports = [
//     new winston.transports.Console(),
//     new winston.transports.File({ filename: "logs/all.log" }),
//     fileRotateTransport,
// ];

// const Logger = winston.createLogger({
//     level: level(),
//     levels,
//     format,
//     transports,
// });

// export default Logger;
