import express from "express";

const app = express();

app.get("/", (req, res) => {
  res.send("Frontend will be Next.js here");
});

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log("Client running");
});
