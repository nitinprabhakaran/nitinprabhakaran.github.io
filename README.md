# Nitin Prabhakaran | Senior Lead DevOps Engineer

Modern portfolio website built with React + Vite + Tailwind CSS, with `resume.yaml` as single source of truth and automated deployment to GitHub Pages.

## Tech Stack

- **Frontend:** React 18, Vite, Tailwind CSS v4
- **Data:** `resume.yaml` → JSON (build-time conversion)
- **PDF Generation:** html2pdf.js (client-side, in-browser)
- **Containerization:** Docker (node:20-alpine)
- **Deployment:** GitHub Actions → GitHub Pages

## Local Development

### Without Docker

```bash
npm install
npm run yaml-to-json
npm run dev
```

Open http://localhost:5173

### With Docker

```bash
docker build -t portfolio-builder .
docker create --name extract portfolio-builder
docker cp extract:/dist ./dist
docker rm extract
npx serve dist
```

## Updating Content

Edit `resume.yaml` and run `npm run yaml-to-json` to regenerate `src/data/resume.json`.

## Deployment

Push to `main`. GitHub Actions builds via Docker and deploys to GitHub Pages.

## Live Site

https://nitinprabhakaran.github.io
