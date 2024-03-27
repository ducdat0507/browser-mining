import ores from "./data/ores.js";
import format from "./format.js";
import { targetSpeed } from "./input.js";
import { currentBlock } from "./renderer.js";
import { data } from "./save.js";
import { res } from "./resources.js";
import * as scene from "./scene.js";
import windowTypes from "./windows/index.js";

export let topbar, splash, blockInd;

export let windows = [];

export function init() {
    //

    topbar = document.createElement("div");
    topbar.id = "topbar";
    document.body.append(topbar);

    let blockTally = create.tally("Blocks mined");
    blockTally.style.width = "200px";
    topbar.$block = blockTally;
    topbar.append(blockTally);

    let depthTally = create.tally("Depth");
    topbar.$depth = depthTally;
    topbar.append(depthTally);

    let mineTally = create.tally("Mine capacity");
    topbar.$mine = mineTally;
    topbar.append(mineTally);

    //

    blockInd = document.createElement("div");
    blockInd.id = "block-identifier";
    document.body.append(blockInd);

    //

    function createMenu(menu, title) {
        let menuBtn = document.createElement("button");
        menuBtn.classList.add("menu-button", "flat-button");
        menuBtn.onclick = () => spawnWindow(menu, {unique: true});
        menuBtn.append(res.icons["menu-" + menu]);
        document.body.append(menuBtn);
        return menuBtn;
    }
    
    let dexBtn = createMenu("gaiadex", "Gaiadex");
    dexBtn.style.left = "5px";
    dexBtn.style.bottom = "5px";

    let optBtn = createMenu("options", "Options");
    optBtn.style.right = "5px";
    optBtn.style.bottom = "5px";

    //

    spawnWindow("resources");
    spawnWindow("intro");

    //

    splash = document.getElementById("splash");
}

export function update() {
    topbar.$block.$value.textContent = format(data.stats.blockMined);
    topbar.$depth.$value.textContent = format(-scene.playerPos.y) + "m";
    topbar.$mine.$value.textContent = format(Math.floor(scene.mineCapValue / scene.mineCapMax * 100)) + "%";

    if (currentBlock) {
        let oreData = ores[currentBlock.block.type];
        blockInd.classList.remove("hidden");
        blockInd.setAttribute("tier", oreData.tier);
        blockInd.textContent = oreData.name;
    } else {
        blockInd.classList.add("hidden");
    }

    for (let window of windows) windowTypes[window.$type].update(window);
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
    },
}

export function spawnWindow(type, options, ...args) {
    let window;

    if (options?.unique && (window = windows.find(x => x.$type == type))) {
        return window;
    }

    window = document.createElement("div");
    window.classList.add("window");
    window.close = () => closeWindow(window);
    
    let titleDiv = document.createElement("div");
    titleDiv.classList.add("window-title");
    window.$title = titleDiv;
    window.append(titleDiv);
    
    let contentDiv = document.createElement("div");
    contentDiv.classList.add("window-content");
    window.$content = contentDiv;
    window.append(contentDiv);

    window.$type = type;
    windowTypes[type].build(window, ...args);

    if (options?.cover) {
        let cover = document.createElement("div");
        cover.classList.add("window-cover");
        window.$cover = cover;
        document.body.append(cover);
    }

    windows.push(window);
    document.body.append(window);
    return window;
}

export function closeWindow(window) {
    let index = windows.indexOf(window);
    windows.splice(index, 1);
    if (window.$cover) window.$cover.remove();
    window.remove();
}