import { add, multi } from "./util.js";
import { merge } from "lodash";

console.log("merge: ", merge);
export default function () {
    import("./foo.js").then((m) => {
        console.log(m.default);
    });
    console.log(add(1 + 5));
}
