import express from "express";
import loginRouter from "./login";
import UsersRouter from './users';


const app: express.Application = express();
app.use(loginRouter);
app.use(UsersRouter);

export default app;
