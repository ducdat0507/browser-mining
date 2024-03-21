import format from "./format.js";
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

    let depthTally = create.tally("Depth");
    topbar.$depth = depthTally;
    topbar.append(depthTally);


    splash = document.getElementById("splash");
}

export function update() {
    topbar.$block.$value.textContent = format(data.stats.blockMined);
    topbar.$depth.$value.textContent = format(-scene.playerPos.y) + "m";
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
