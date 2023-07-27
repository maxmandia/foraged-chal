import express from "express";
import calculateStreak from "./helpers/calculate-streak";
import cors from "cors";
const app = express();
app.use(cors());

app.get("/check-string", (req, res) => {
  const { string } = req.query;

  if (typeof string !== "string") {
    res.status(400).send("String must be of type string");
    return;
  }

  // if (string.length === 0) {
  //   res.json({
  //     streakLength: 0,
  //     streakStart: 0,
  //     streakEnd: 0,
  //   });
  //   return;
  // }

  let result = calculateStreak(string);
  res.json(result);
});

app.listen(3001, () => console.log("Server running on port 3001"));
