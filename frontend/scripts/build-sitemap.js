import fs from "fs";
import path from "path";

// ========================
// CONFIG
// ========================
const SITE_URL = "https://nameverse.vercel.app";
const API_BASE = "https://namverse-api.vercel.app/api/v1/names";

const RELIGIONS = ["islamic", "hindu", "christian"];
const LIMIT = 100;
const URLS_PER_SITEMAP = 1000;
const PUBLIC_DIR = "public";
const PROGRESS_FILE = path.join(PUBLIC_DIR, "sitemap-progress.json");
const ALL_NAMES_FILE = path.join(process.cwd(), "all-names.json");
const FRESH_REBUILD = true;

// Ensure /public exists
if (!fs.existsSync(PUBLIC_DIR)) fs.mkdirSync(PUBLIC_DIR);

// ========================
// PROGRESS FUNCTIONS
// ========================
function loadProgress() {
  if (FRESH_REBUILD) {
    return { lastReligionIndex: 0, lastPage: 1, sitemapIndex: 1 };
  }
  if (!fs.existsSync(PROGRESS_FILE)) {
    return { lastReligionIndex: 0, lastPage: 1, sitemapIndex: 1 };
  }
  return JSON.parse(fs.readFileSync(PROGRESS_FILE, "utf8"));
}

function saveProgress(p) {
  fs.writeFileSync(PROGRESS_FILE, JSON.stringify(p, null, 2));
}

function normalizeName(name) {
  return String(name)
    .toLowerCase()
    .replace(/\s+/g, " ")
    .trim();
}

function loadAllNamesSet() {
  try {
    if (!fs.existsSync(ALL_NAMES_FILE)) {
      return new Set();
    }
    const raw = fs.readFileSync(ALL_NAMES_FILE, "utf8");
    const arr = JSON.parse(raw);
    if (!Array.isArray(arr)) {
      return new Set();
    }
    return new Set(arr.map(normalizeName));
  } catch {
    return new Set();
  }
}

// ========================
// SITEMAP WRITER
// ========================
function writeSitemap(index, urls) {
  const filePath = path.join(PUBLIC_DIR, `sitemap-${index}.xml`);
  const xml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${urls
  .map(
    (url) => `<url>
  <loc>${url}</loc>
  <changefreq>weekly</changefreq>
  <priority>0.8</priority>
</url>`
  )
  .join("\n")}
</urlset>`;

  fs.writeFileSync(filePath, xml);
  console.log(`✅ Created sitemap-${index}.xml (${urls.length} URLs)`);
}

// ========================
// SITEMAP INDEX GENERATOR
// ========================
function writeSitemapIndex(totalSitemaps) {
  const indexFile = path.join(PUBLIC_DIR, "sitemap-index.xml");
  const xml = `<?xml version="1.0" encoding="UTF-8"?>
<sitemapindex xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${Array.from({ length: totalSitemaps })
  .map(
    (_, i) => `<sitemap>
  <loc>${SITE_URL}/sitemap-${i + 1}.xml</loc>
</sitemap>`
  )
  .join("\n")}
</sitemapindex>`;

  fs.writeFileSync(indexFile, xml);
  console.log(`📌 Generated sitemap-index.xml referencing ${totalSitemaps} sitemaps.`);
}

// ========================
// MAIN SCRIPT
// ========================
async function generate() {
  const allowedNames = loadAllNamesSet();
  let progress = loadProgress();
  let sitemapUrls = [];

  if (FRESH_REBUILD) {
    saveProgress(progress);
  }

  console.log("🚀 Starting Sitemap Generation...\n");

  for (let r = progress.lastReligionIndex; r < RELIGIONS.length; r++) {
    const religion = RELIGIONS[r];
    let page = progress.lastPage;

    console.log(`\n🔍 Processing religion: ${religion}, starting at page ${page}`);

    while (true) {
      const apiUrl = `${API_BASE}?religion=${religion}&page=${page}&limit=${LIMIT}`;
      console.log(`Fetching → ${apiUrl}`);

      try {
        const res = await fetch(apiUrl);
        const json = await res.json();
        const data = json?.data;
        const list = Array.isArray(data) ? data : data?.names;

        if (!list || list.length === 0) {
          console.log(`No more names for ${religion}`);
          break;
        }

        list.forEach((n) => {
          const nameKey = normalizeName(n.name || n.slug);
          if (allowedNames.has(nameKey)) {
            sitemapUrls.push(`${SITE_URL}/names/${religion}/${n.slug}`);
          }
        });

        if (sitemapUrls.length >= URLS_PER_SITEMAP) {
          writeSitemap(progress.sitemapIndex, sitemapUrls);
          sitemapUrls = [];
          progress.sitemapIndex++;
          saveProgress({ ...progress, lastReligionIndex: r, lastPage: page + 1 });
        }

        const pag = json?.pagination || {};
        const totalPages =
          typeof pag.totalPages === "number"
            ? pag.totalPages
            : (typeof pag.total === "number" && typeof pag.limit === "number"
                ? Math.ceil(pag.total / pag.limit)
                : null);

        if (totalPages && page >= totalPages) {
          break;
        } else {
          page++;
          progress.lastPage = page;
          saveProgress(progress);
        }
      } catch (err) {
        console.error(`❌ Error fetching page ${page} of ${religion}:`, err.message);
        console.log("⏳ Retrying in 5 seconds...");
        await new Promise((res) => setTimeout(res, 5000));
      }
    }

    progress.lastPage = 1;
    progress.lastReligionIndex = r + 1;
    saveProgress(progress);
  }

  if (sitemapUrls.length > 0) {
    writeSitemap(progress.sitemapIndex, sitemapUrls);
    progress.sitemapIndex++;
  }

  saveProgress(progress);
  writeSitemapIndex(progress.sitemapIndex - 1);
  console.log("\n🎉 All sitemaps generated successfully!");
}

// Run
generate().catch((err) => console.error(err));
