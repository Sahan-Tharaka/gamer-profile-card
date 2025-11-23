# GamerProfileCard – build & usage notes

## Quick start
- Ensure Node 18+ is first on your `PATH` (Homebrew install lives at `/opt/homebrew/opt/node@20/bin`). Example: `export PATH="/opt/homebrew/opt/node@20/bin:$PATH"`.
- Install deps: `npm install`
- Run dev server: `npm run dev` (Vite, Tailwind JIT)
- Build for prod: `npm run build`

## Component usage
Import the card and pass a profile object with the same shape used in `src/App.jsx`.

```jsx
import GamerProfileCard from './components/GamerProfileCard'

const profile = {
  name: 'NovaLyte',
  gamertag: '@novalyte.gg',
  title: 'IGL • Controller • Support anchor',
  region: 'NA-West',
  team: 'Eclipse Union',
  bannerUrl: 'https://...',
  avatarUrl: 'https://...',
  rank: 'Diamond II',
  tierProgress: 68,
  streak: 7,
  kd: 2.84,
  winRate: 54,
  hours: 1280,
  loadout: { primary: 'VK-47 Flatline', secondary: 'Wingman' },
  specialties: ['Macro shot-calling', 'Controller main'],
  achievements: [
    { title: 'Top 0.8% ranked', detail: 'Season 21 split' },
    { title: 'LAN finals x3', detail: 'ALGS LCQ attendee' },
  ],
}

<GamerProfileCard profile={profile} />
```

## Design rules (keep it consistent)
- Typography: use Space Grotesk / Manrope (imported in `src/index.css`). Uppercase micro-labels use letter-spacing; keep display text at `text-3xl`–`text-4xl` max inside the card.
- Color system: base `slate-900/950` surfaces with indigo → fuchsia → cyan gradients for accents. Keep borders at `slate-800` with subtle `ring-white/5`. Status / success uses emerald, warning uses amber.
- Spacing & radius: card radius `rounded-3xl`, inner surfaces `rounded-2xl` or `rounded-xl`. Vertical rhythm uses `gap-4/6/8`. Buttons use `px-4 py-2` and `rounded-xl`.
- Effects: use soft inner shadows on stat tiles (`shadow-inner shadow-slate-900/60`) and a single outer drop shadow on the card. Avoid harsh box-shadows.
- Content: achievements render as a list of `{ title, detail }`; stats grid expects four items. Progress bars use `tierProgress` clamped to 0–100.
- Responsiveness: layout stacks on mobile (flex → column, grid → 2 cols). Keep important items near the top (avatar, name, action buttons).

## Extending
- Swap the sample data in `src/App.jsx` for live data; keep the profile shape to avoid prop churn.
- To add more stats, extend the `stats` array in `GamerProfileCard.jsx`—keep label casing and use short sublabels.
- Want different imagery? Replace `bannerUrl` / `avatarUrl` strings; the overlay will keep text readable.
