import express from "express";
import { config } from "dotenv";
// import { Server } from "socket.io";
// import http from "http";
import connect from "./database/conn.js";
import router from "./routes/route.js";
import cors from "cors";


config();

const app = express();
app.use(express.json());
app.use(cors());
const port = process.env.PORT || 5642;


app.get('/', (req, res) => {
  res.json({"serviceType":"quiz_runtime","endpoint" : "/api"});
});


// Use modular router for session APIs
app.use(router);

connect().then(() => {
  app.listen(port, () => {
    console.log(`Server connected to http://localhost:${port}`);
  });
}).catch(error => {
  console.log("Invalid Database Connection");
});