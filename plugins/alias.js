import path from "path";

export default function alias(options) {
    const aliasEntries = Object.entries(options);

    return {
        name: "rollup-plugin-alias",
        resolveId(importee, importer) {
            // Check if the importee matches any of the alias entries
            for (const [alias, target] of aliasEntries) {
                if (importee.startsWith(alias)) {
                    const updatedPath = importee.replace(alias, target);
                    // Ensure the target path is resolved correctly
                    const resolvedPath = path.resolve(
                        path.dirname(importer),
                        updatedPath
                    );
                    return resolvedPath;
                }
            }
            return null;
        },
    };
}
