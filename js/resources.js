import * as _3 from "three";
import * as renderer from "./renderer.js";
import * as ui from "./ui.js";
import ores from "./data/ores.js";

export let res = {};

export let progress = {lastLoaded: null, completed: 0, total: 0};

export function loadResources() {
    let list = Object.keys(ores);
    res.ores = {};
    let loaded = 0;
    
    const loadManager = new _3.LoadingManager();
    const loader = new _3.TextureLoader(loadManager);

    loadManager.onProgress = (lastLoaded, completed, total) =>{
        progress = {lastLoaded, completed, total};
    }

    loadManager.onLoad = () =>{
        renderer.initView();
        ui.init();
    }

    (async () => {
        for (let ore of list) {
            res.ores[ore] = loader.load("./res/textures/" + ore + ".png")
        }
    })()
}