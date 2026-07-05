# Oh Geo 🌍

A kid-friendly geography guessing game for solo play, classrooms, and family game nights. Guess countries from their **flags** or their **shapes**. Fully offline Progressive Web App — all 153 flags and 136 country outlines are embedded in the file, zero external requests, installable on phones, tablets, and desktops.

## Game modes

- **Beat the Clock** — multiple choice with a countdown; answering fast earns bonus points
- **Take Your Time** — relaxed multiple choice with no timer, great for learning
- **Shout-Out Party** — 2 to 8 players share one screen, yell answers out loud, and the facilitator taps who won each round
- **Pass-the-Phone Face-Off** — players take turns answering their own set of questions; the leaderboard ranks points and shows each player's accuracy and average speed, tagging the fastest
- **Explorer** — browse all flags and country shapes by continent
- **My Collection** — stars earned, badges unlocked, and every country you've discovered

## What you can guess

- 🚩 Flags, 🗺️ Country shapes, or 🔀 a mix of both

## Difficulty levels

1. 🟢 **Full** — see the whole flag or shape
2. ◨ **Half** — only the right half is visible
3. ▮ **Thin strip** — a narrow middle slice
4. 🎲 **Random patch** — a small window at a random spot
5. 📈 **Progressive** — starts at Full and automatically ramps up through all four levels

Timers from ⚡ 5 seconds to a leisurely 30. Round counts up to 100.

## Stars & collection

- Finish solo games to earn ⭐ stars: 3 for 90%+, 2 for 60%+, 1 for 30%+
- Badges: 🚩 Geo Beginner, 🧭 Geo Explorer (60%+ in a game), 🏆 Geo Master (90%+)
- Every country you answer correctly in any multiple-choice mode is added to your collection — collect all 153!
- Progress is saved on the device (localStorage); the Collection screen has a reset button

## What's in this package

```
index.html            The entire game (flags + outlines embedded)
manifest.webmanifest  PWA manifest
sw.js                 Service worker (offline caching) — bump CACHE_VERSION when updating
icons/                Retro dot-globe app icons
vercel.json           Optional Vercel config (headers for the service worker)
```

All paths are relative, so the app works at a domain root or in a subfolder.

## Deploy to GitHub Pages

1. Push these files to the root of the `main` branch of a repository.
2. **Settings → Pages** → Source: **Deploy from a branch** → `main` / `/ (root)` → Save.
3. Live at `https://YOUR-USERNAME.github.io/YOUR-REPO/` in a minute or two.

## Deploy to Vercel

1. Push to a GitHub repository, then in Vercel: **Add New → Project**, import the repo.
2. Framework preset: **Other**. No build command, no output directory. Deploy.

Or with the CLI: `vercel --prod` from this folder.

## Updating the game

When you change `index.html`, bump `CACHE_VERSION` in `sw.js` (e.g. `ohgeo-v3`) so installed devices pick up the new version on their next visit.

## Credits

Flag images are public domain, from the [country-flags](https://github.com/hampusborgos/country-flags) collection. Country shapes derived from [world.geo.json](https://github.com/johan/world.geo.json) (Natural Earth data, public domain). Fourteen microstates and small island nations are too small for the shape dataset, so they appear in flag questions only.
