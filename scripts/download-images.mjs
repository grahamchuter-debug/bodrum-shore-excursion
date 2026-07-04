#!/usr/bin/env node
/**
 * Download Bodrum-only imagery from verified Wikimedia Commons URLs.
 * Run: node scripts/download-images.mjs
 */
import { writeFileSync, mkdirSync, readdirSync, unlinkSync } from "fs";
import { join } from "path";

const OUT = "public/images";
mkdirSync(OUT, { recursive: true });
const UA = "bodrum-shore-excursions/1.0 (image fetch; contact webmaster)";

/** Verified Bodrum / Turkish Riviera sources on Wikimedia Commons. */
const BODRUM_IMAGES = {
  "castle.jpg":
    "https://upload.wikimedia.org/wikipedia/commons/thumb/b/bd/Bodrum_Castle_%282017%29.jpg/1920px-Bodrum_Castle_%282017%29.jpg",
  "mausoleum.jpg":
    "https://upload.wikimedia.org/wikipedia/commons/thumb/f/f4/The_ruins_of_the_Mausoleum_at_Halicarnassus.jpg/1920px-The_ruins_of_the_Mausoleum_at_Halicarnassus.jpg",
  "museum.jpg":
    "https://upload.wikimedia.org/wikipedia/commons/thumb/5/5e/Mausoleum_at_Halicarnassus_at_the_Bodrum_Museum_of_Underwater_Archaeology.jpg/1920px-Mausoleum_at_Halicarnassus_at_the_Bodrum_Museum_of_Underwater_Archaeology.jpg",
  "old-town.jpg":
    "https://upload.wikimedia.org/wikipedia/commons/thumb/3/36/Bodrum_02.jpg/1920px-Bodrum_02.jpg",
  "marina.jpg":
    "https://upload.wikimedia.org/wikipedia/commons/thumb/7/78/Bodrummarina.jpg/1920px-Bodrummarina.jpg",
  "gulet.jpg":
    "https://upload.wikimedia.org/wikipedia/commons/thumb/3/36/Bodrum_02.jpg/1920px-Bodrum_02.jpg",
  "kara-ada.jpg":
    "https://upload.wikimedia.org/wikipedia/commons/8/87/Poyraz_Koyu%2C_Karaada_-_panoramio.jpg",
  "beaches.jpg":
    "https://upload.wikimedia.org/wikipedia/commons/thumb/8/87/Poyraz_Koyu%2C_Karaada_-_panoramio.jpg/1920px-Poyraz_Koyu%2C_Karaada_-_panoramio.jpg",
  "food.jpg":
    "https://upload.wikimedia.org/wikipedia/commons/thumb/4/41/Starter_dish_in_Turkey.jpg/1920px-Starter_dish_in_Turkey.jpg",
  "hammam.jpg":
    "https://upload.wikimedia.org/wikipedia/commons/thumb/7/7b/Hamam_dsc05370_nevit.jpg/1920px-Hamam_dsc05370_nevit.jpg",
  "wine.jpg":
    "https://upload.wikimedia.org/wikipedia/commons/thumb/5/58/Vineyard_Road_in_Bozcaada.jpg/1920px-Vineyard_Road_in_Bozcaada.jpg",
  "peninsula.jpg":
    "https://upload.wikimedia.org/wikipedia/commons/thumb/b/bd/Bodrum_Castle_%282017%29.jpg/1920px-Bodrum_Castle_%282017%29.jpg",
  "highlights.jpg":
    "https://upload.wikimedia.org/wikipedia/commons/thumb/f/f5/Turkey_Bodrum_Castle_Mosque.jpg/1920px-Turkey_Bodrum_Castle_Mosque.jpg",
  "luxury.jpg":
    "https://upload.wikimedia.org/wikipedia/commons/thumb/7/78/Bodrummarina.jpg/1920px-Bodrummarina.jpg",
  "private-tour.jpg":
    "https://upload.wikimedia.org/wikipedia/commons/thumb/f/f5/Turkey_Bodrum_Castle_Mosque.jpg/1920px-Turkey_Bodrum_Castle_Mosque.jpg",
  "family.jpg":
    "https://upload.wikimedia.org/wikipedia/commons/thumb/8/87/Poyraz_Koyu%2C_Karaada_-_panoramio.jpg/1920px-Poyraz_Koyu%2C_Karaada_-_panoramio.jpg",
  "cruise-port.jpg":
    "https://upload.wikimedia.org/wikipedia/commons/thumb/3/36/Bodrum_02.jpg/1920px-Bodrum_02.jpg",
  "hero-home.jpg":
    "https://upload.wikimedia.org/wikipedia/commons/thumb/b/bd/Bodrum_Castle_%282017%29.jpg/1920px-Bodrum_Castle_%282017%29.jpg",
  "og-default.jpg":
    "https://upload.wikimedia.org/wikipedia/commons/thumb/f/f5/Turkey_Bodrum_Castle_Mosque.jpg/1920px-Turkey_Bodrum_Castle_Mosque.jpg",
};

const ALLOWED = new Set([...Object.keys(BODRUM_IMAGES), "logo-mark.svg", "favicon.ico"]);

async function download(url) {
  const res = await fetch(url, { headers: { "User-Agent": UA } });
  if (!res.ok) throw new Error(`HTTP ${res.status}`);
  const buf = Buffer.from(await res.arrayBuffer());
  if (buf.length < 10000) throw new Error("file too small");
  return buf;
}

const sleep = (ms) => new Promise((r) => setTimeout(r, ms));

async function downloadWithRetry(url, attempts = 5) {
  for (let i = 0; i < attempts; i++) {
    try {
      return await download(url);
    } catch (e) {
      if (i === attempts - 1) throw e;
      await sleep(2000 + i * 1500);
    }
  }
  throw new Error("unreachable");
}

async function main() {
  for (const name of readdirSync(OUT)) {
    if (!ALLOWED.has(name)) {
      unlinkSync(join(OUT, name));
      console.log(`removed orphan ${name}`);
    }
  }

  let failed = 0;
  for (const [file, url] of Object.entries(BODRUM_IMAGES)) {
    try {
      const buf = await downloadWithRetry(url);
      writeFileSync(join(OUT, file), buf);
      console.log(`ok ${file}`);
      await sleep(1200);
    } catch (e) {
      console.error(`FAIL ${file}: ${e.message}`);
      failed++;
    }
  }

  if (failed) process.exit(1);
  console.log(`\nAll ${Object.keys(BODRUM_IMAGES).length} Bodrum images ready.`);
}

main();
