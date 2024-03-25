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

    let lmComp = 0;
    loadManager.onProgress = (lastLoaded, completed, total) => {
        comp += completed - lmComp;
        lmComp = completed;
        onProgress(lastLoaded, comp, count);
    }

    loadManager.onLoad = onDone;

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
        "menu-blockdex",
        "menu-options",
    ]) {
        res.icons[icon] = new Image();
        res.icons[icon].classList.add("icon");
        res.icons[icon].onload = () => {
            comp++;
            onProgress(res.icons[icon].src, comp, count);
        }
        res.icons[icon].src = "./res/icons/" + icon + ".png";
        count++;
    }

    for (let audio of [
        "legendary",
    ]) {
        res.audio[audio] = new Audio();
        res.audio[audio].preload = "auto";
        res.audio[audio].onload = () => {
            comp++;
            onProgress(res.icons[icon].src, comp, count);
        }
        res.audio[audio].src = "./res/audio/" + audio + ".mp3";
        count++;
    }

    onProgress("", 0, count);
}