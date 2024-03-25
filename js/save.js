import lzString from "./lib/lz-string.js";

export let data = {}
export let isDirty = false;

export async function init() {
    let root = await navigator.storage.getDirectory();
    await load();
}

export async function save() {
    isDirty = true;
    console.log("Game saving.")
    let root = await navigator.storage.getDirectory();
    let fileHandle = await root.getFileHandle("browser-mining", { create: true });
    let file = await fileHandle.createWritable();
    await file.write(lzString.compressToUint8Array(JSON.stringify(data)));
    await file.close();
    console.log("Game saved.");
    isDirty = false;
}

export async function hardReset(keepOptions = true) {
    save = () => {};
    let root = await navigator.storage.getDirectory();
    if (keepOptions) {
        let fileHandle = await root.getFileHandle("browser-mining", { create: true });
        let file = await fileHandle.createWritable();
        await file.write(lzString.compressToUint8Array(JSON.stringify({opt: data.opt})));
        await file.close();
    } else {
        await root.removeEntry("browser-mining");
    }
    window.location.href = window.location.href;
}
export async function applySave(saveData) {
    save = () => {};
    let root = await navigator.storage.getDirectory();
    let fileHandle = await root.getFileHandle("browser-mining", { create: true });
    let file = await fileHandle.createWritable();
    await file.write(lzString.compressToUint8Array(JSON.stringify(saveData)));
    await file.close();
    window.location.href = window.location.href;
}

export async function load() {
    try {
        let root = await navigator.storage.getDirectory();
        let fileHandle = await root.getFileHandle("browser-mining");
        let file = await fileHandle.getFile();
        let text = await file.arrayBuffer();
        data = text.byteLength ? JSON.parse(lzString.decompressFromUint8Array(new Uint8Array(text))) : {};
        patchSave(data, getStartPlayer());
        console.log(data);
    } catch (e) {
        console.log(e);
        data = getStartPlayer();
    }
}

export function getExportString() {
    return lzString.compressToBase64(JSON.stringify(data));
}

export function tryImportString(text) {
    try {
        let tempSave = JSON.parse(lzString.decompressFromBase64(text));
        patchSave(tempSave, getStartPlayer());
        return tempSave;
    } catch {
        return null;
    }
}

export function setDirty() {
    isDirty = true;
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
            mouseSensitivity: 1,
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
