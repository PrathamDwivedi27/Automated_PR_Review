import express from 'express';
import bodyParser from 'body-parser';
import cors from 'cors';
import { PORT } from '../config/server-config.js';
import apiRoutes from "../routes/index.js";



const app = express();

app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true })); 

//Routes
app.use('/api',apiRoutes);


app.listen (PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});


