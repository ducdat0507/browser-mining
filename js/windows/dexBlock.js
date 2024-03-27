import * as save from "../save.js";
import ores, {tiers} from "../data/ores.js";
import format from "../format.js";
import * as ui from "../ui.js";
import * as _3 from "three";
import { res } from "../resources.js";
import texmaps from "../data/texmaps.js";

let hasChangeGraphics = false;

export function build(window, ore) {
    window.style.left = "calc(50% + 60px)";
    window.style.top = "50%";
    window.style.transform = "translate(0, -50%)";
    window.style.width = "240px";
    window.style.maxWidth = "90%";
    window.style.height = "400px";

    window.$content.classList.add("base-padding");

    window.$setOre = ore => setOre(window, ore);
}

export function setOre(window, ore) {
    let oreData = ores[ore];
    let rarityData = tiers[oreData.tier] ?? { name: "Layer" };
    
    window.$title.textContent = oreData.name;

    let close = document.createElement("button");
    close.classList.add("close-button");
    close.onclick = window.close;
    window.$title.append(close);

    window.$content.innerHTML = `
        <div class="dex-info-table">
            <div>
                <small>Rarity</small><br>
                <span class="rarity-text" tier="${oreData.tier}">${rarityData.name}</span>
                ${oreData.rarity ? "<br>1 / " + format(oreData.rarity) : ""}
            </div>
            <div>
                <small>Found in</small><br>
                <b>World 1</b><br>
                ${oreData.range ? oreData.range[0] + "~" + (oreData.range[1] - 1) + "m" : ""}
            </div>
        </div>
    `
}

export function update(window) {
}