# Pokemon Explorer

A responsive Pokemon web app built with **Next.js**, **Tailwind CSS** and the free **PokeAPI**.

## Features
- Homepage with 1025 Pokemon, shown 40 at a time ("Show more" button)
- Search bar that filters Pokemon by name
- Detail page for each Pokemon: image, types, height, weight, abilities, stats and moves
- Dynamic route: `pages/pokemon/[id].js`
- Static generation (SSG) with background refresh once a day
- Works on mobile, tablet and desktop

## Tech stack
Next.js 14 (Pages Router) · React 18 · Tailwind CSS 3 · JavaScript · PokeAPI

## How to run
1. Install Node.js 18 or newer
2. Clone the repo and open the folder:
   ```bash
   git clone <your-repo-url>
   cd pokemon-explorer
   ```
3. Install packages:
   ```bash
   npm install
   ```
4. Start the dev server:
   ```bash
   npm run dev
   ```
5. Open http://localhost:3000

### Production build
```bash
npm run build
npm start
```
(The build needs internet, because it fetches the Pokemon list from PokeAPI.)

## Folder structure
```
pages/
  _app.js            loads global styles
  index.js           homepage (list + search)
  404.js             "not found" page
  pokemon/[id].js    detail page
components/          small reusable pieces (card, search bar, badge, stat bar)
lib/pokeapi.js       all API calls and helper functions
styles/globals.css   Tailwind imports
```
