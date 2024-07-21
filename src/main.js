import { add, multi } from "./util.js";
import { merge } from "lodash";
import Button from "@/components/Button.js";

console.log("merge: ", merge);
console.log("Button: ", Button);

export default function () {
    import("./foo.js").then((m) => {
        console.log(m.default);
    });
    console.log(add(1 + 5));
}
