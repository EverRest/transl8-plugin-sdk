// Bundles the contracts-only entry point (src/index.ts) into dist/index.js
// (ESM). No runtime behaviour lives in this package — this build step exists
// only so `main`/`module` in package.json resolve to a real file, matching
// packages/api-client's build shape. Type declarations are emitted
// separately via `tsc -p tsconfig.build.json` (see package.json "build"
// script) since esbuild does not type-check or generate .d.ts files.
import { rm } from 'node:fs/promises';
import { fileURLToPath } from 'node:url';
import path from 'node:path';
import * as esbuild from 'esbuild';

const packageRoot = path.dirname(path.dirname(fileURLToPath(import.meta.url)));
const distDir = path.join(packageRoot, 'dist');
const entryPoint = path.join(packageRoot, 'src', 'index.ts');

async function main() {
  await rm(distDir, { recursive: true, force: true });

  await esbuild.build({
    entryPoints: [entryPoint],
    bundle: true,
    sourcemap: true,
    target: 'es2020',
    format: 'esm',
    platform: 'neutral',
    outfile: path.join(distDir, 'index.js'),
    logLevel: 'info',
  });
}

main().catch((error) => {
  console.error(error);
  process.exit(1);
});
