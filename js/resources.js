import * as _3 from "three";
import * as renderer from "./renderer.js";
import * as ui from "./ui.js";
import maps from "./data/texmaps.js";

export let res = {};

export function loadResources(onDone, onProgress) {
    let list = Object.keys(maps);
    res.textures = {};
    res.icons = {};
    res.audio = {};
    let loaded = 0;
    
    const loadManager = new _3.LoadingManager();
    const loader = new _3.TextureLoader(loadManager);

    let lmComp = 0, lmTotal = 1;
    loadManager.onProgress = (lastLoaded, completed, total) => {
        comp += completed - lmComp;
        lmComp = completed; lmTotal = total;
        onProgress(lastLoaded, comp, count);
    }

    loadManager.onLoad = () => {
        comp += lmTotal - lmComp;
        lmComp = lmTotal;
        onProgress("", comp, count);
        if (comp == count) onDone();
    }

    (async () => {
        for (let map of list) {
            res.textures[map] = loader.load("./res/textures/" + map + ".png");
            res.textures[map].magFilter = _3.NearestFilter;
            res.textures[map].minFilter = _3.NearestFilter;
            res.textures[map].colorSpace = _3.SRGBColorSpace;
        }
    })()

    let count = list.length, comp = 0;

    for (let icon of [
        "menu-inventory",
        "menu-forge",
        "menu-upgrades",
        "menu-gaiadex",
        "menu-statistics",
        "menu-teleport",
        "menu-options",
        "menu-about",
        "menu-more",
    ]) {
        res.icons[icon] = new Image();
        res.icons[icon].classList.add("icon");
        res.icons[icon].onerror = res.icons[icon].onload = () => {
            comp++;
            onProgress(res.icons[icon].src, comp, count);
            if (comp == count) onDone();
        }
        res.icons[icon].src = "./res/icons/" + icon + ".png";
        count++;
    }

    for (let audio of [
        "legendary",
    ]) {
        res.audio[audio] = new Audio();
        res.audio[audio].preload = "auto";
        res.audio[audio].onerror = res.audio[audio].oncanplaythrough = () => {
            comp++;
            onProgress(res.audio[audio].src, comp, count);
            if (comp == count) onDone();
        }
        res.audio[audio].src = "./res/audio/" + audio + ".mp3";
        count++;
    }

    onProgress("", 0, count);
}