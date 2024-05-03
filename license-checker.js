#!/usr/bin/env node

import { program } from 'commander'
import process from 'node:process'
import checker from 'license-checker-rseidelsohn'

import { DEFAULT_ALLOWED_LICENSES } from "./constants.js";
import { getExcludes } from "./utils/getExcludes.js";

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
                console.log(checker.asSummary(packages))
            })
        } catch (error) {
            console.error(error.message)
            process.exit(1)
        }
    })

program.parse(process.argv)
