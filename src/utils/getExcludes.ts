import { DEFAULT_EXCLUDED_PREFIXES } from "../constants";

import { getLocalPackages } from "./getLocalPackages";

export const getExcludes = (root: string, exclude: string) => {
    const localPackages = getLocalPackages(root)

    const localPackagesString = localPackages?.join(';')

    const excludePrefixes = exclude
        .split(';')
        .reduce((result, item) => {
            const prefix = item.slice(0, -1)
            const pattern = item.slice(-1)

            if (pattern === '*') {
                return [...result, prefix]
            }

            return result
        }, [] as string[])

    const excludeNames = exclude
        .split(';')
        .filter(item => item.slice(-1) !== '*')

    const excludePackages = [
        localPackagesString,
        ...excludeNames,
    ].filter(Boolean).join(';')

    const excludePackagesStartingWith = [
        ...DEFAULT_EXCLUDED_PREFIXES,
        ...excludePrefixes,
    ].join(';')

    return {
        excludePackages,
        excludePackagesStartingWith,
    }
}
