import 'dotenv/config';
import express from "express";
import connDB from "./db/conn.js"
import grades from "./routes/grades.js";

const PORT = 3000;
const app = express();

app.use(express.json());

app.get("/", (req, res) => {
  res.send("Welcome to the API.");
});

app.use("/grades", grades);

// Global error handling
app.use((err, _req, res, next) => {
  res.status(500).send("Seems like we messed up somewhere...");
});

// Start the Express server
app.listen(PORT, () => {
  console.log(`Server is running on port: ${PORT}`);
  connDB();
});
