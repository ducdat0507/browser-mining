import { targetSpeed } from "./input.js";
import { data } from "./save.js";
import * as scene from "./scene.js";

export let topbar, splash;

export function init() {
    topbar = document.createElement("div");
    topbar.id = "topbar";
    document.body.append(topbar);

    let blockTally = create.tally("Blocks mined");
    topbar.$block = blockTally;
    topbar.append(blockTally);

    splash = document.getElementById("splash");
}

export function update() {
    topbar.$block.$value.textContent = (+data.stats.blockMined).toLocaleString("en-US");
}

export let create = {
    tally(title) {
        let div = document.createElement("div");
        div.classList.add("tally");
        
        let titleDiv = document.createElement("div");
        titleDiv.classList.add("tally-title");
        titleDiv.textContent = title;
        div.$title = titleDiv;
        div.append(titleDiv);
        
        let valueDiv = document.createElement("div");
        valueDiv.classList.add("tally-value");
        div.$value = valueDiv;
        div.append(valueDiv);

        return div;
    }
}
