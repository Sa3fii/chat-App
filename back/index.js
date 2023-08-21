import express, { json } from 'express';
import cors from "cors";
import {config} from "dotenv"
import './utils/db.utils.js'

config();

import routes from "./routes/index.js";

const app = express();

app.use(cors());
app.use(json());
app.use('/', routes)


const PORT = process.env.PORT || 5000;

app.listen(PORT, (error) => {
  if (error) console.log("Unable to start the server");
  else console.log(`Server listening on port ${PORT}`);
});