// scraper.js
import axios from "axios";
import * as cheerio from "cheerio";

export async function fetchProfile(url) {
  try {
    const { data } = await axios.get(url, {
      headers: {
        "User-Agent":
          "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.124 Safari/537.36",
      },
    });
    if (typeof data !== "string") {
      throw new Error("Expected a string as HTML response");
    }
    return data;
  } catch (error) {
    console.error("Error fetching profile:", error.message);
    return null;
  }
}

export function parseProfile(html) {
  const $ = cheerio.load(html);
  const profile = {};

  // Scrape name
  profile.name = $("#gsc_prf_in").text();

  // Scrape affiliation (gsc_prf_il)
  profile.affiliation = $("#gsc_prf_i .gsc_prf_il").text();

  // Scrape total citations, h-index, and i10-index
  profile.totalCitations = $("#gsc_rsb_st td:nth-child(2)").eq(0).text();
  profile.hIndex = $("#gsc_rsb_st td:nth-child(2)").eq(2).text();
  profile.i10Index = $("#gsc_rsb_st td:nth-child(2)").eq(4).text();

  // Scrape articles with title, collaborators, description, and link
  profile.articles = [];
  $("#gsc_a_b .gsc_a_tr").each((index, element) => {
    const title = $(element).find(".gsc_a_t a").text();
    const link =
      "https://scholar.google.com" + $(element).find(".gsc_a_t a").attr("href");
    const collaborators = $(element).find(".gsc_a_t .gs_gray").eq(0).text();
    const description = $(element).find(".gsc_a_t .gs_gray").eq(1).text();

    profile.articles.push({
      title,
      link,
      collaborators,
      description,
    });
  });

  return profile;
}
