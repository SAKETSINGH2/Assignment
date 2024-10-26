import mongoose from "mongoose";

import dotenv from "dotenv";
dotenv.config();

console.log(process.env.MONGODB_URL);

const connect = () => {
    mongoose
        .connect(process.env.MONGODB_URL || "", {
            // useNewUrlParser: true,
            // useUnifiedTopology: true,
        })
        .then(() => {
            console.log("DB Connected Successfully");
        })
        .catch((error: any) => {
            console.log("DB Connection Issues");
            console.log(error);
            process.exit(1);
        });
};

export default connect;
