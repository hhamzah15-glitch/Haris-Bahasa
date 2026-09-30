# Haris Bahasa – Malay Ninja Academy 🥷

A game-style study app for **Cambridge IGCSE Malay as a Foreign Language (0546)**, built for Year 6 upwards.
Vocabulary and grammar for all five syllabus topic areas, with ranks, XP, streaks, badges, a ryo shop, boss battles and parent-set real-life rewards.

- 6 villages (Academy + Areas A–E), 19 core missions, 326 words, 5 boss battles
- 25 special missions (Misi Khas), 5 per village, unlocked by beating the boss – 400 extra words beyond the syllabus
- 12 grammar scrolls, each with 5 quiz rounds (25 questions) plus a random mix
- Wardrobe shop: 16 costume sets, single items, auras, and 6 ability upgrades with real perks
- Spaced-repetition review (Ulang Kaji)
- Text-to-speech for Malay (uses the device's Malay or Indonesian voice)
- No build step, no dependencies. Progress is saved in the browser (localStorage); use Settings → Export/Import to move between devices.

## Run locally
Open `index.html` in a browser.

## Publish with GitHub Pages
1. Create a new GitHub repository (e.g. `haris-bahasa`) and push these files to `main`.
2. Repo → Settings → Pages → Build and deployment → Source: **Deploy from a branch** → Branch: `main`, folder `/ (root)`.
3. After a minute the app is live at `https://<your-username>.github.io/haris-bahasa/`.

## Editing content
Malay content: `js/data.js` (core units + scrolls), `js/special-*.js` (special missions), `js/grammar-more-*.js` (extra grammar questions). Shop items: `js/shop.js`. Parent PIN defaults to `0000` (change in the Parent report).

Syllabus reference: Cambridge International, IGCSE Malay – Foreign Language (0546).
