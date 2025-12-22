import mongoose from "mongoose";

export const createConnection = () => {
    console.log("DB_URL present:", !!process.env.DB_URL);

    return mongoose.connect(process.env.DB_URL, { maxPoolSize: 5 });
};
