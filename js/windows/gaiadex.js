import * as save from "../save.js";
import ores from "../data/ores.js";
import format from "../format.js";
import * as ui from "../ui.js";
import * as _3 from "three";
import { res } from "../resources.js";
import texmaps from "../data/texmaps.js";

let hasChangeGraphics = false;

export function build(window) {
    window.style.top = "50%";
    window.style.left = "50%";
    window.style.transform = "translate(-50%, -50%)";
    window.style.width = "600px";
    window.style.maxWidth = "90%";
    window.style.height = "400px";

    window.$title.textContent = "Gaiadex";

    let close = document.createElement("button");
    close.classList.add("close-button");
    close.onclick = window.close;
    window.$title.append(close);

    let tabs = document.createElement("div");
    tabs.classList.add("window-tab-list");
    window.insertBefore(tabs, window.$content);
    window.$content.classList.add("scrollable");

    let content = document.createElement("div");
    content.classList.add("block-padding");
    window.$content.append(content);

    let activeTabBtn;

    for (let tab in gaiadexTabs) {
        let tabBtn = document.createElement("button");
        tabBtn.textContent = gaiadexTabs[tab].name;
        tabBtn.onclick = () => {
            content.textContent = "";
            gaiadexTabs[tab].build(content);
            if (activeTabBtn) activeTabBtn.disabled = false;
            activeTabBtn = tabBtn;
            activeTabBtn.disabled = true;
        };
        tabs.append(tabBtn);
    }

    tabs.firstChild.click();
}

let gaiadexTabs = {
    ores: {
        name: "Ores",
        build(content) {

            let list = document.createElement("div");
            list.classList.add("grid-list");
            content.append(list);

            for (let ore in ores) {
                let oreData = ores[ore];
                if (oreData.unobtainable) continue;
                
                let button = document.createElement("button");
                button.classList.add("gaiadex-block", "tier-button");
                button.setAttribute("tier", oreData.tier);
                list.append(button);

                let faces = document.createElement("div");
                faces.classList.add("block-faces");
                button.append(faces);

                if (oreData.map) {
                    let texMap = texmaps[oreData.map[0]];
                    let img = res.textures[oreData.map[0]].source.data;
                    let faceWidth, faceHeight;
                    button.style.setProperty("--face-width", faceWidth = img.width / texMap.rows);
                    button.style.setProperty("--face-height", faceHeight = img.height / texMap.cols);
                    button.style.setProperty("--face-top", faceWidth * oreData.map[1]);
                    button.style.setProperty("--face-left", faceHeight * oreData.map[2]);
    
                    for (let a = 0; a < 3; a++) {
                        let face = img.cloneNode();
                        faces.append(face);
                    }
                }


                let name = document.createElement("div");
                name.classList.add("block-name");
                button.append(name);
                name.append(oreData.name);

            }
        }
    },
}
export function update(window) {
}