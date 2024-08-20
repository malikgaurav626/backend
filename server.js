// server.js
import express from "express";
import { fetchProfile, parseProfile } from "./scraper.js";

const app = express();
const PORT = process.env.PORT || 3000;

app.get("/", (req, res) => {
  res.send("Hello, We are connected!");
});

// Endpoint to scrape the profile
app.get("/scrape", async (req, res) => {
  const url = "https://scholar.google.ca/citations?hl=en&user=4zbw62wAAAAJ"; // Replace with the desired profile URL
  const html = await fetchProfile(url);
  const profile = parseProfile(html);
  res.json(profile);
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
