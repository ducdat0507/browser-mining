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

    updateDeck();

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

export let loadoutButtons = [];

export function updateDeck() {
    let menuList = ["inventory", "forge"];

    let loadout = data.loadout;
    let offset = (loadout.gear.length + (invActive ? menuList.length : 1)) / 2 + .5;
    let pxOffset = 0;

    //
    
    function addButton() {
        let menuBtn = document.createElement("button");
        menuBtn.classList.add("menu-button", "flat-button", "deck-button");
        menuBtn.onclick = () => setTool(menuBtn.$item);

        document.body.append(menuBtn);
        return menuBtn;
    }

    function isInLoadout(item) {
        if (item[0] == "pick") return loadout.pick == item[1];
        if (item[0] == "gear") return loadout.get.includes(item[1]);
        if (item[0] == "menu") return invActive ? menuList.includes(item[1]) : menuList[0] == item[1];
    }

    //

    let index = 0;

    function handleButton(item) {
        let button = loadoutButtons.find(x => x.$item == item || (x.$item[0] == item[0] && x.$item[1] == item[1]));
        if (!button) {
            button = addButton();
            button.append(res.icons[item[0] + "-" + item[1]] ?? "");
            loadoutButtons.push(button);
            button.$item = item;
        }
        button.style.left = "calc(50% + " + ((index - offset) * 55 + 2.5 + pxOffset) + "px)";
        button.style.bottom = "5px";
        index++;
    }

    for (let [btnID, btn] of Object.entries(loadoutButtons)) {
        if (!isInLoadout(btn.$item)) {
            btn.remove();
            loadoutButtons.splice(btnID, 1);
        }
    }

    if (loadout.gear.length) pxOffset -= 5;
    handleButton(["pick", loadout.pick]);
    if (loadout.gear.length) pxOffset += 5;
    for (let gear of loadout.gear) handleButton(["gear", gear]);
    pxOffset += 5;
    for (let menu of menuList) {
        handleButton(["menu", menu]);
        if (!invActive) return;
    }

}

let invActive = false, invWindow = null;

export function setInvActive(state) {
    invActive = state;
    if (!invActive) invWindow = null;
    updateDeck();
}

export function setTool(tool) {
    if (tool[0] == "menu") {
        if (invWindow) invWindow.close();
        invWindow = spawnWindow(tool[1], {unique: true});
        if (!invActive) setInvActive(true);
    }
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