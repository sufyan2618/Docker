import express from "express";
const app = express();

app.get("/", (req, res) => {
  res.json({message: "Running dockerized node app right now"})
});


const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});