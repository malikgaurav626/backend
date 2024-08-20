// server.js
import express from "express";
import { fetchProfile, parseProfile } from "./scraper.js";

const app = express();
const PORT = process.env.PORT || 3000;

app.get("/", (req, res) => {
  res.send("Hello, Render!");
});

app.get("/scrape", async (req, res) => {
  try {
    const url = "https://scholar.google.ca/citations?hl=en&user=4zbw62wAAAAJ";
    const html = await fetchProfile(url);

    if (!html) {
      console.error("Failed to fetch profile data.");
      return res.status(500).json({ error: "Failed to fetch profile data" });
    }

    const profile = parseProfile(html);
    res.json(profile);
  } catch (error) {
    console.error("Error in /scrape:", error);
    res.status(500).json({ error: "An error occurred during scraping" });
  }
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
