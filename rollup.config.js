import commonjs from "@rollup/plugin-commonjs";
import resolve from "@rollup/plugin-node-resolve";
import { terser } from "rollup-plugin-terser";

/**
 * @type { import('rollup').RollupOptions }
 */
const buildOptions = {
    // input: ["src/main.js", "src/util.js"],  多入口打包
    input: "src/main.js",
    output: [
        // 多产物配置
        {
            dir: "dist/es",
            format: "esm",
            chunkFileNames: "[name]-[hash:10].js",
            sourcemap: true,
            plugins: [terser()],
        },
        {
            dir: "dist/cjs",
            format: "cjs",
        },
    ],
    plugins: [resolve(), commonjs()],
    manualChunks(id) {
        if (id.includes("foo.js")) {
            return "foo";
        }
    },
};
export default buildOptions;
