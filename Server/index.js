import express from 'express';
import cors from 'cors';
import TodoRoutes from './routes/todos.js'
import 'dotenv/config';
import { dbConnect } from './config/database.js'

const app = express();
const port = process.env.PORT || 3000;

app.use(express.json());  //parser

//allow CORS
app.use(cors());

app.use("/api/v1", TodoRoutes);

app.listen(port, () => console.log("Server started at ", port))

dbConnect();