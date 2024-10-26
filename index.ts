import express, { Request, Response, NextFunction } from "express";
import cors from "cors";
import apiRouter from "./routes";
import connect from "./config/dataBaseConnection";
import dotenv from "dotenv";
dotenv.config();

const app = express();

app.use(cors());

app.use(express.json());

app.use(express.urlencoded({ extended: false }));

connect();

app.use("/api", apiRouter);

app.get("/test", (req: Request, res: Response) => {
    res.status(200).send("Server is up and running!");
});

const port = 4000;
app.listen(port, (err?: Error) => {
    if (err) {
        console.error(`Error occurred: ${err.message}`);
        return;
    }
    console.log(`App is running at port ${port}`);
});

export { app };
