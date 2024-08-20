// Step 1: Setup
import axios from "axios";
import * as cheerio from "cheerio"; // Update import statement

// Step 2: Fetch Profile Page
async function fetchProfile(url) {
  try {
    const { data } = await axios.get(url);
    return data;
  } catch (error) {
    console.error("Error fetching profile:", error);
  }
}

// Step 3: Parse HTML
function parseProfile(html) {
  const $ = cheerio.load(html);
  const profile = {};

  profile.name = $("#gsc_prf_in").text();
  profile.affiliation = $("#gsc_prf_i .gsc_prf_il").text();
  profile.citationCount = $("#gsc_rsb_st td:nth-child(2)").eq(0).text();
  profile.hIndex = $("#gsc_rsb_st td:nth-child(2)").eq(2).text();
  profile.i10Index = $("#gsc_rsb_st td:nth-child(2)").eq(4).text();

  return profile;
}

// Step 4: Output Data
export async function Main() {
  const url = "https://scholar.google.ca/citations?hl=en&user=4zbw62wAAAAJ"; // Replace with actual profile URL
  const html = await fetchProfile(url);
  const profile = parseProfile(html);
  console.log(profile);
}
