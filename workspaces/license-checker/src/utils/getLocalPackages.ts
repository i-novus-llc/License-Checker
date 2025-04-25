import {readdirSync, readFileSync} from "node:fs";
import path from "node:path";

export const getLocalPackages = (root: string) => {
    const rootPackageJsonBuffer = readFileSync(
        path.join(root, 'package.json'),
        {encoding: 'utf-8'},
    )

    const rootPackageJsonData = JSON.parse(rootPackageJsonBuffer)

    const {name, workspaces} = rootPackageJsonData as { name?: string; workspaces?: string[] }

    return workspaces?.reduce((result, workspace) => {
        const directory = workspace.slice(0, -2)
        const pattern = workspace.slice(-2)

        if (pattern === '/*') {
            const pathToDirectory = path.join(root, directory)

            const files = readdirSync(
                pathToDirectory,
                {encoding: 'utf-8'},
            )

            const packagesNames = files.map((filename) => {
                const pathToFile = path.join(pathToDirectory, filename)

                const nestedFiles = readdirSync(
                    pathToFile,
                    {encoding: 'utf-8'},
                )

                const isExistPackageJson = nestedFiles.includes('package.json')

                if (!isExistPackageJson) {
                    return null
                }

                const packageJsonBuffer = readFileSync(
                    path.join(pathToFile, 'package.json'),
                    {encoding: 'utf-8'},
                )

                const packageJsonData = JSON.parse(packageJsonBuffer)

                return packageJsonData.name
            }).filter(Boolean)

            return [...result, ...packagesNames]
        }

        return [
            ...result,
            workspace,
        ]
    }, name ? [name] : [])
}
