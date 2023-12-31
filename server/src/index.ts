import express from "express";
import calculateStreak from "./helpers/calculate-streak";
import cors from "cors";

const app = express();
app.use(cors());

app.get("/check-string", (req, res) => {
  const { string } = req.query;

  if (typeof string !== "string") {
    res.status(400).send("Query param must be of type string");
    return;
  }

  let result = calculateStreak(string);
  res.json(result);
});

app.listen(3001, () => console.log("Server running on port 3001"));
