import express from "express";
import db from "./config/db.js";
import router from "./routes/index.js";

const app = express();
const port = 3000;

app.use(express.json());
app.use(router);
db.authenticate()
  .then(() => {
    console.log("Database connected...");
    return db.sync();
  })
  .then(() => {
    console.log("Models synced");
  })
  .catch((err) => {
    console.log("Error: " + err);
  });

app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`);
});
