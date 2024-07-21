import path from "path";

export default function bundleHtml() {
    return {
        name: "bundle-html",
        generateBundle(options, bundle, isWrite) {
            const jsFiles = [];
            const cssFiles = [];

            // Collect all JS and CSS files from the bundle
            for (const fileName in bundle) {
                const chunk = bundle[fileName];
                if (
                    chunk.type === "asset" &&
                    path.extname(fileName) === ".css"
                ) {
                    cssFiles.push(chunk.source);
                } else if (
                    chunk.type === "chunk" &&
                    path.extname(fileName) === ".js"
                ) {
                    jsFiles.push(chunk.code);
                }
            }

            // Generate the HTML content
            const htmlContent = `
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Bundled HTML</title>
  <style>
    ${cssFiles.join("\n")}
  </style>
</head>
<body>
  <h1>Hello, Rollup!</h1>
  <script>
    ${jsFiles.join("\n")}
  </script>
</body>
</html>
`;

            // Add the HTML file to the bundle
            this.emitFile({
                type: "asset",
                fileName: "index.html",
                source: htmlContent,
            });
        },
    };
}
