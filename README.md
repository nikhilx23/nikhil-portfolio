# Abhai Sai Nikhil Pothuraju | Portfolio

My personal portfolio site. I'm an AI Data Engineer at AT&T, and I mostly work on
data pipelines, lakehouse tables and RAG retrieval systems on Azure.

The site covers my experience at AT&T and IBM, a few projects I've built, and
the tools I use day to day.

**Live site:** https://abhai-pothuraju.vercel.app

## What's on the site

- **Experience** with the actual problems I worked on and what changed after
- **Project lab**, a small 3D room where each workstation opens a project
- **Projects**
  - [DataOps Investigator](https://github.com/nikhilx23/dataops-investigator): traces pipeline failures from the first alert to the dashboard it broke
  - [People Analytics AI Copilot](https://github.com/nikhilx23/People-analytics-ai-copilot): governed tools and explainable workforce metrics
  - [RetailPulse](https://github.com/nikhilx23/retailpulse): data cleanup, SQL models and retail analytics
- **Skills, education and contact**

## Built with

React, TypeScript, Vite, Three.js (React Three Fiber and Drei), Framer Motion and Tailwind CSS.
It's a static site with no backend, deployed on Vercel.

## Running it locally

You'll need Node 22 or newer.

```bash
npm install
npm run dev
```

Then open the local address Vite prints. To make a production build:

```bash
npm run build
npm run preview
```

## Editing content

Almost all of the text, links and project details live in `src/data/portfolio.ts`,
so most updates only touch that one file. The photo and resume are in `public/`.

The 3D scenes are in `src/scenes/`. They pause when they're off screen, and they
respect the reduced motion setting on your device.

## Contact

- Email: Abhaipothuraju@gmail.com
- LinkedIn: [abhai-sai-nikhil-pothuraju](https://www.linkedin.com/in/abhai-sai-nikhil-pothuraju-8144583a6/)
