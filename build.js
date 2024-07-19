import { rollup } from "rollup";
import commonjs from "@rollup/plugin-commonjs";
import resolve from "@rollup/plugin-node-resolve";

const inputOptions = {
    input: "src/main.js",
    plugins: [
      resolve(),
      commonjs()
    ]
};

/**
 * @type {import('rollup').OutputOptions}
 */
const outputOptionsList = [
    {
        dir: "dist/es",
        format: "es",
        chunkFileNames: "[name]-[hash:10].js",
        sourcemap: true,
        globals: {
            lodash: "_",
        },
    },
];

async function build() {
    let bundle;
    let bundleFail = false;

    try {
        bundle = await rollup(inputOptions);
        await generateBundle(bundle);
    } catch (error) {
        bundleFail = true;
        console.log("error", error);
    }
    if (bundle) {
        console.log('bundle', bundle);
        await bundle.close();
    }
    process.exit(bundleFail ? 1 : 0);
}

async function generateBundle(bundle) {
    for (let outputOptions of outputOptionsList) {
        const { output } = await bundle.generate(outputOptions);
        for (const chunkOrAsset of output) {
            if (chunkOrAsset.type === "asset") {
                console.log("asset: ", chunkOrAsset);
            } else {
                console.log("chunk: ", chunkOrAsset);
            }
        }

        await bundle.write(outputOptions);
    }
}

build();
