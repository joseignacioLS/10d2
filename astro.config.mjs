// @ts-check
import { defineConfig, fontProviders } from 'astro/config';

import react from '@astrojs/react';

import netlify from "@astrojs/netlify";



// https://astro.build/config
export default defineConfig({
  integrations: [react()],

  fonts: [{
    provider: fontProviders.fontsource(),
    name: "Open Sans",
    cssVariable: "--font-open-sans",
  }],
  output: "server",
  adapter: netlify(),
});