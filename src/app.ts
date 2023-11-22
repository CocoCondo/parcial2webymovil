import express from 'express';
import bodyParser from "body-parser";
import authMiddleWare from "./api/auth";
import jugadoresApi from './api/jugadoresApi';
import loginRouter from './routes/login'

const app = express();

app.use(express.json());
app.use(bodyParser.json());

const cors = require('cors');
app.use(cors({
    origin: ['http://localhost:4200', 'http://127.0.0.1:4200']
}));

app.use(jugadoresApi);
app.use(loginRouter);

console.log("JWT_SECRET_KEY: ", process.env.JWT_SECRET_KEY);

var server = app.listen(8080, function () {
    console.log("Backend Application listening at http://localhost:8080")
});