import { watch } from "rollup";
import commonjs from "@rollup/plugin-commonjs";
import resolve from "@rollup/plugin-node-resolve";

const watcher = watch({
    input: "src/main.js",
    output: [
        {
            dir: "dist/es",
            format: "esm",
        },
        {
            dir: "dist/cjs",
            format: "cjs",
        },
    ],
    plugins: [
      resolve(),
      commonjs()
    ],
    watch: {
        exclude: ["node_modules/**"],
        include: ["src/**"],
    },
});

// 监听 watch 各种事件
watcher.on("restart", () => {
    console.log("重新构建...");
});

watcher.on("change", (id) => {
    console.log("发生变动的模块id: ", id);
});

watcher.on("event", (e) => {
    if (e.code === "BUNDLE_END") {
        console.log("打包信息:", e);
    }
});
