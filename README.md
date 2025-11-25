

```markdown
# 🎬 Short-Flix Frontend
**Next.js + TypeScript + Tailwind CSS + React**

This is the frontend for **Short-Flix**, a Netflix-style shorts streaming platform.  
It consumes the backend API deployed on Vercel at `/api/shorts` and provides an interactive UI similar to YouTube Shorts or TikTok.

---

## 🚀 Tech Stack

- **Next.js 13** (App Router, React 18)  
- **TypeScript**  
- **Tailwind CSS** for styling  
- **Redux Toolkit** for state management  
- **React Query / RTK Query** for data fetching  
- **Lucide Icons** for UI icons  
- **Vercel** for deployment  

---

## 📁 Project Structure

```

app/
├── components/
│    ├── header.tsx
│    ├── search-bar.tsx
│    ├── tag-filter.tsx
│    ├── shorts-grid.tsx
│    ├── short-card.tsx
│    ├── video-player-modal.tsx
│    └── add-short-form.tsx
├── store/
│    ├── slices/
│    │      └── shortsSlice.ts
│    └── api/
│            └── shortsApi.ts
├── types/
│    └── shorts.ts
└── page.tsx

```

---

## 📌 Features

- Browse and play short videos  
- Infinite scroll (load more as you scroll down)  
- Play/pause controls and auto-pause when video leaves viewport  
- Search and filter by tags  
- Add new short videos via form  
- Responsive layout for mobile and desktop  
- Light/dark mode support  

---

## 🔧 Improvements With More Time

- Implement user authentication (login/register)  
- Add likes, comments, and sharing features  
- Optimize video streaming and lazy-loading  
- Add advanced analytics (views, watch time)  
- Implement PWA support for offline viewing  

---

## 🤖 Tools Used During Development

- **ChatGPT** for generating component structure, hooks, and logic  
- **GitHub Copilot** for repetitive code scaffolding  
- **Vercel** for live deployment  
- **Figma** for UI/UX design inspiration  
```
