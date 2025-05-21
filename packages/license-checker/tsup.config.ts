import { defineConfig } from 'tsup'

// eslint-disable-next-line no-restricted-exports,import/no-default-export
export default defineConfig({
    entry: {
        'license-checker': 'src/license-checker.ts',
    },
    outDir: 'dist',
    tsconfig: 'tsconfig.json',
    format: 'esm',
})
