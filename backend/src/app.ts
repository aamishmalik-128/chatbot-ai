import express from "express";
import {config} from 'dotenv';
import cookieParser from 'cookie-parser'
import appRouter from "./routes";


config();
const app = express();

app.use(cookieParser(process.env.COOKIE_SECRET))

//json middleware for accepting json data
app.use(express.json())


//remove it at production level



app.use("/api/v1", appRouter)
export default app;
//connection

