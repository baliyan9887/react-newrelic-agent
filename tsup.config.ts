import { defineConfig } from 'tsup'

/**
 * @file tsup.config.ts
 * @description
 * This file serves as the configuration for the Tsup bundler. Tsup is a TypeScript-friendly bundler
 * that simplifies the bundling process. This configuration specifies the entry point, output formats,
 * TypeScript declaration generation, and other options for bundling your TypeScript project.
 */

export default defineConfig({
  format: ['cjs', 'esm'],
  entry: ['./src/index.ts'],
  dts: true,
  shims: true,
  skipNodeModulesBundle: true,
  clean: true
})
