#!/usr/bin/env node

import process from 'node:process'

import { program } from 'commander'
import * as checker from 'license-checker-rseidelsohn'

import { DEFAULT_ALLOWED_LICENSES } from './constants'
import { getExcludes } from './utils/getExcludes'

program
    .option('--root  <VALUE>', 'Root path. Default: "./"')
    .option('--exclude <VALUE>', 'Semicolon-separated list of packages excluded from scanning. You can exclude all packets containing a specified prefix using a template "prefix*". Default: "@inovus*;@i-novus*"')
    .action((options) => {
        try {
            const {
                root = './',
                exclude = '',
            } = options

            const { excludePackages, excludePackagesStartingWith } = getExcludes(root, exclude)

            checker.init({
                start: root,
                excludePackages,
                excludePackagesStartingWith,
                onlyAllow: DEFAULT_ALLOWED_LICENSES.join(';'),
            }, (error, packages) => {
                if (error) {
                    throw error
                }

                // @ts-expect-error Неполная .d.ts схема
                // eslint-disable-next-line no-console
                console.log(checker.asSummary(packages))
            })
        } catch (error) {
            console.error((error as Error).message)

            process.exit(1)
        }
    })

program.parse(process.argv)
