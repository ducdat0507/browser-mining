import * as renderer from './renderer.js'
import * as resources from './resources.js'
import * as input from './input.js'
import * as scene from './scene.js';
import * as ui from './ui.js';
import * as save from './save.js';

let logicHandle, renderHandle;

document.addEventListener("DOMContentLoaded", () => {
    time = performance.now();

    let loader = ui.spawnWindow("loader");

    window.addEventListener("error", (e) => {
        clearInterval(logicHandle);
        cancelAnimationFrame(renderHandle);
        ui.spawnWindow("error", {cover:true}, e.error);
    })
    
    loader.$action.textContent = "Loading save...";
    loader.$progress.textContent = "";

    save.init().then(() => {
        resources.loadResources(() =>{
            loader.close();
            renderer.initView();
            ui.init();
        }, (_, prog, total) => {
            loader.$bar.style.setProperty("--progress", prog / total * .9 + .1);
            loader.$progress.textContent = prog + " / " + total;
        });
        input.init();

        loader.$action.textContent = "Loading resources...";
        loader.$bar.style.setProperty("--progress", .1);

        logicHandle = setInterval(logicLoop, 16);
        renderLoop();
    })
    
    window.onbeforeunload = (e) => {
        if (save.isDirty) return save.save();
    }

    window.onvisibilitychange = async (e) => {
        if (document.visibilityState == "visible") {
        } else {
            save.save();
        }
    }
});

let time = performance.now();
export let delta = 0;

let saveTime = 0;

function logicLoop() {
    delta = performance.now() - time;
    time += delta;
    delta /= 1000;

    saveTime += delta;
    if (saveTime > 15) {
        save.save();
        saveTime = 0;
    }

    if (renderer.isReady && scene.mine) scene.doPhysics(delta);
}

function renderLoop() {
    if (renderer.isReady) {
        renderer.updateView();
        ui.update();
    }
    renderHandle = requestAnimationFrame(renderLoop);
}