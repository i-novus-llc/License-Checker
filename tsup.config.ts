import { defineConfig } from 'tsup'

export default defineConfig({
    entry: {
        'license-checker': 'src/license-checker.ts',
    },
    outDir: 'dist',
    tsconfig: 'tsconfig.json',
    format: 'esm',
})
