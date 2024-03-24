import * as _3 from "three";
import * as renderer from "./renderer.js";
import * as ui from "./ui.js";
import maps from "./data/texmaps.js";

export let res = {};

export let progress = {lastLoaded: null, completed: 0, total: 0};

export function loadResources(onDone, onProgress) {
    let list = Object.keys(maps);
    res.textures = {};
    let loaded = 0;
    
    const loadManager = new _3.LoadingManager();
    const loader = new _3.TextureLoader(loadManager);

    loadManager.onProgress = (lastLoaded, completed, total) =>{
        progress = {lastLoaded, completed, total};
    }

    loadManager.onProgress = onProgress;
    loadManager.onLoad = onDone;

    let count = 0;

    (async () => {
        for (let map of list) {
            res.textures[map] = loader.load("./res/textures/" + map + ".png");
            res.textures[map].magFilter = _3.NearestFilter;
            res.textures[map].minFilter = _3.NearestFilter;
            res.textures[map].colorSpace = _3.SRGBColorSpace;
        }
    })()

    onProgress("", 0, list.length);
}