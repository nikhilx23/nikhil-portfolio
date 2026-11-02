import { defineConfig, loadEnv } from 'vite';
import react from '@vitejs/plugin-react';
import tailwindcss from '@tailwindcss/vite';
import sharp from 'sharp';
import { writeFile } from 'node:fs/promises';
import { fileURLToPath } from 'node:url';
import { seoMarkup, socialImageSvg } from './src/lib/seo';

export default defineConfig(async ({ mode }) => {
  const env = loadEnv(mode, process.cwd(), 'VITE_');
  const base = env.VITE_BASE_PATH || '/';
  if (!base.startsWith('/') || !base.endsWith('/')) {
    throw new Error('VITE_BASE_PATH must start and end with /');
  }
  await sharp(Buffer.from(socialImageSvg())).png().toFile(fileURLToPath(new URL('./public/og-image.png', import.meta.url)));
  await writeFile(fileURLToPath(new URL('./public/og-image.svg', import.meta.url)), socialImageSvg(), 'utf8');
  return {
    base,
    plugins: [react(), tailwindcss(), {
      name: 'portfolio-seo',
      transformIndexHtml(html: string) { return html.replace(/<title>[\s\S]*?<\/title>/, () => seoMarkup(base)); },
    }],
    build: { target: 'es2022', sourcemap: false },
    server: { host: '127.0.0.1' },
    preview: { host: '127.0.0.1' },
  };
});
