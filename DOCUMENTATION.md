# GynoGuideAI — Technical Documentation

**Version:** 1.0.0  
**Last Updated:** June 2026  
**Stack:** React 18 + Vite 5 + Anthropic Claude API

---

## 1. Architecture Overview

GynoGuideAI is a **Single-Page Application (SPA)** built with React and Vite. It uses client-side routing (React Router v6), and calls the Anthropic API directly from the browser for the AI chat feature. All gynecological condition, medicine, and video data is stored as static JSON-like JavaScript modules — no backend server or database is required.

```
Browser
  └── React SPA (Vite)
        ├── React Router (client-side routing)
        ├── Static data modules (diseases, medicines, videos)
        └── Anthropic API (fetch from browser)
              └── Claude claude-sonnet-4-20250514
```

---

## 2. Pages & Routes

| Route | Component | Description |
|---|---|---|
| `/` | `HomePage` | Landing page with feature overview |
| `/chat` | `ChatPage` | AI assistant chat interface |
| `/diseases` | `DiseasesPage` | Searchable conditions library |
| `/diseases/:id` | `DiseaseDetailPage` | Individual condition detail |
| `/medicines` | `MedicinesPage` | Expandable medicine reference |
| `/learn` | `LearnPage` | Knowledge hub with accordion modules |
| `/videos` | `VideosPage` | Video gallery with modal player |

All pages are wrapped in the `Layout` component (navbar + footer).

---

## 3. AI Chat Architecture (`ChatPage`)

### API Call Flow

```
User types message
  → handleSend()
  → Build conversation history array [{role, content}, ...]
  → sendMessage(history) → fetch POST /v1/messages
  → Claude responds with gynecology-scoped answer
  → Append to messages state
  → Re-render chat
```

### System Prompt Design

The `GYNECOLOGY_SYSTEM_PROMPT` in `utils/anthropicApi.js` constrains Claude to:
1. **Scope** — only gynecology/reproductive health topics
2. **Tone** — empathetic, compassionate, non-judgmental
3. **Safety** — always recommend consulting a gynecologist; never diagnose
4. **Format** — markdown-enabled for rich responses
5. **Urgency** — flags emergency symptoms (ectopic pregnancy, heavy hemorrhage)
6. **Evidence base** — references ACOG/WHO/RCOG guidelines

### Conversation State

Messages are stored in local React state as:
```js
[{
  id: number,       // unique timestamp-based ID
  role: 'user' | 'assistant',
  content: string   // markdown-formatted text
}]
```

A welcome message is pre-loaded with role `assistant` but filtered from API history to avoid confusing the model.

---

## 4. Data Architecture

### Diseases Data (`data/diseases.js`)

Each disease object contains:

```js
{
  id: string,               // URL slug (e.g. 'endometriosis')
  name: string,             // Display name
  category: string,         // Used for filter chips
  severity: string,         // Visual severity indicator
  prevalence: string,       // Epidemiological note
  icon: string,             // Emoji icon
  summary: string,          // One-line description
  description: string,      // Full paragraph overview
  symptoms: string[],       // Bulleted list
  causes: string[],         // Bulleted list
  diagnosis: string[],      // Diagnostic steps
  treatment: string[],      // Treatment options
  stagingSystem: string,    // Optional staging info
  relatedMedicines: string[], // IDs matching medicines.js
  tags: string[],           // Filter/display tags
}
```

### Medicines Data (`data/medicines.js`)

```js
{
  id: string,
  name: string,
  genericName: string,
  brandNames: string[],
  category: string,
  usedFor: string[],
  mechanism: string,
  dosage: string,
  sideEffects: string[],
  contraindications: string[],
  pregnancy: string,
  icon: string,
  tags: string[],
}
```

### Videos Data (`data/videos.js`)

```js
{
  id: string,
  title: string,
  channel: string,
  youtubeId: string,       // Used for thumbnail + embed URLs
  thumbnail: string,       // https://img.youtube.com/vi/{id}/hqdefault.jpg
  duration: string,
  category: string,
  tags: string[],
  description: string,
}
```

---

## 5. Design System

The design system is defined entirely in `src/styles/globals.css` using CSS Custom Properties.

### Color Palette

| Token | Hex | Usage |
|---|---|---|
| `--rose-500` | `#f72d72` | Primary brand color, CTAs |
| `--plum-700` | `#7c1148` | Secondary, gradients |
| `--plum-800` | `#5a0d34` | Headings |
| `--cream` | `#fdf6f9` | Page background |
| `--warm-white` | `#fffbfd` | Card background |
| `--teal-accent` | `#0f7b6c` | Info/teal tags |
| `--amber-warm` | `#d97706` | Warning states |

### Typography

| Role | Font | Usage |
|---|---|---|
| Display | DM Serif Display | H1, H2, H3, brand name |
| Body | Inter | All body text, UI |
| Mono | JetBrains Mono | Code snippets |

### Component Classes

| Class | Description |
|---|---|
| `.btn .btn-primary` | Rose→Plum gradient button |
| `.btn .btn-outline` | Bordered rose button |
| `.btn .btn-ghost` | Transparent hover button |
| `.card` | White card with hover shadow |
| `.tag .tag-rose` | Rose-toned pill tag |
| `.tag .tag-teal` | Teal-toned pill tag |
| `.section-label` | All-caps pink eyebrow text |
| `.container` | 1200px max-width centered |
| `.fade-in` | Entry animation |

---

## 6. Adding New Content

### Adding a New Disease

Open `src/data/diseases.js` and add a new object to the `diseases` array:

```js
{
  id: 'vulvodynia',          // Must be unique, URL-safe
  name: 'Vulvodynia',
  category: 'Pain Disorders', // Will auto-appear in filter
  severity: 'Moderate',
  prevalence: '8% of women',
  icon: '🔶',
  summary: 'Chronic vulvar pain without identifiable cause.',
  description: '...',
  symptoms: [...],
  causes: [...],
  diagnosis: [...],
  treatment: [...],
  relatedMedicines: ['lidocaine'],
  tags: ['Chronic Pain', 'Vulvar'],
}
```

### Adding a New Medicine

Open `src/data/medicines.js` and append to the `medicines` array following the same schema.

### Adding a New Video

Open `src/data/videos.js` and add to the `videos` array. Get the YouTube video ID from the URL: `youtube.com/watch?v=VIDEO_ID_HERE`.

### Adding a New Learn Module

Open `src/pages/LearnPage.jsx` and add to the `modules` array:

```js
{
  id: 'oncology',
  icon: '🔬',
  title: 'Gynecological Oncology',
  level: 'Advanced',
  color: 'plum',
  description: '...',
  topics: [
    {
      title: 'Ovarian Cancer Subtypes',
      content: '...',
    }
  ]
}
```

---

## 7. Customizing the AI Behavior

The AI persona and behavior are controlled by `GYNECOLOGY_SYSTEM_PROMPT` in `src/utils/anthropicApi.js`.

To change the AI's specialization or tone, edit that string. For example, to make it more formal, change the opening to:

```js
"You are GynoGuideAI, a formal clinical decision support assistant..."
```

To change the model, update the `model` field in the fetch body:
```js
model: 'claude-opus-4-20250514', // More capable but slower
```

---

## 8. Security Considerations

- **API Key Exposure:** The `VITE_ANTHROPIC_API_KEY` is used client-side via the Vite environment variable system. In production, this key IS visible in the browser's network tab. For a production deployment, consider:
  - Setting API key usage limits on your Anthropic console
  - Restricting the key to specific origins
  - Moving to a backend proxy (Express/Next.js API route) so the key never leaves the server

- **Content Safety:** Claude's built-in safety guidelines already restrict harmful medical advice. The system prompt adds additional gynecology-specific restrictions.

---

## 9. Performance Notes

- **Images:** YouTube thumbnails are loaded lazily (`loading="lazy"`)
- **Fonts:** Google Fonts are preconnected in `index.html`
- **Bundle:** Tree-shaking via Vite removes unused code
- **Video embeds:** Videos are only embedded when user clicks (not auto-loaded)
- **No database:** All data is static JS — zero API latency for browsing pages

---

## 10. Browser Compatibility

Tested and supported:
- Chrome 90+
- Firefox 90+
- Safari 14+
- Edge 90+
- Mobile Chrome / Safari

Minimum CSS features required: CSS Custom Properties, CSS Grid, CSS Flexbox, `backdrop-filter`.

---

## 11. Known Limitations & Future Roadmap

| Limitation | Planned Fix |
|---|---|
| Chat history lost on refresh | Add localStorage persistence |
| ~8 conditions in library | Expand to 50+ |
| No user accounts | Add Supabase auth + saved history |
| Static medicine data | Connect to drugs.com or RxNorm API |
| No symptom checker | Add guided symptom triage flow |
| English only | Add i18n support (Tamil, Hindi, etc.) |
| No dark mode | Add CSS custom property theming toggle |

---

*Documentation maintained by the GynoGuideAI development team.*
