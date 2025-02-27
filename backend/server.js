import express from 'express';
import mongoose from 'mongoose';
import cors from "cors"
import bodyParser from 'body-parser';
import resourcesRouter from "./api/resourcesEndpoints.js"


const app = express();
app.use(cors());
app.use(bodyParser.json());

app.use(resourcesRouter)

mongoose.connect('mongodb://127.0.0.1:27017/resources', 
).then(() => {
  console.log('Connected to MongoDB');
}).catch(err => {
  console.error('MongoDB connection error:', err);
});

const port = 5000;

app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
  });