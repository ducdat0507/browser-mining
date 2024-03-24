export let data = {}

export async function init() {
    let root = await navigator.storage.getDirectory();
    await load();
}

export async function save() {
    console.log("Game saving.")
    let root = await navigator.storage.getDirectory();
    let fileHandle = await root.getFileHandle("browser-mining", { create: true });
    let file = await fileHandle.createWritable();
    await file.write(JSON.stringify(data));
    await file.close();
    console.log("Game saved.")
}

export async function load() {
    try {
        let root = await navigator.storage.getDirectory();
        let fileHandle = await root.getFileHandle("browser-mining");
        let file = await fileHandle.getFile();
        let text = await file.text();
        data = text.length ? JSON.parse(text) : {};
        patchSave(data, getStartPlayer());
        console.log(data);
    } catch (e) {
        console.log(e);
        data = getStartPlayer();
    }
}

function getStartPlayer() {
    return {
        inv: {
            normal: {}
        },
        stats: {
            blockMined: 0,
        },
        opt: {
            invertMouse: [false, false],
            keybinds: {},

            antialias: true,
        }
    }
}

function patchSave(target, source) {
    for (let id in source) {
        if (target[id] === undefined) target[id] = source[id];
        else if (typeof target[id] == "object") patchSave(target[id], source[id]);
    }
}