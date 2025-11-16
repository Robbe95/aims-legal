import { defineConfig } from 'tsdown'

export default defineConfig({
  entry: [
    'src/worker.ts',
  ],
  format: [
    'esm',
  ],

  noExternal: [
    /^(?!sharp|next|react|graphql).*/,

  ],
  outDir: './.next/standalone/apps/payload/worker',
})
