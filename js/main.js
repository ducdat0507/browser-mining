import * as renderer from './renderer.js'
import * as resources from './resources.js'
import * as input from './input.js'
import * as scene from './scene.js';
import * as ui from './ui.js';
import * as save from './save.js';

let logicHandle, renderHandle;

document.addEventListener("DOMContentLoaded", () => {
    time = performance.now();

    resources.loadResources();
    input.init();
    save.init();

    window.addEventListener("error", (e) => {
        clearInterval(logicHandle);
        cancelAnimationFrame(renderHandle);
        ui.spawnWindow("error", {cover:true}, e.error);
    })

    logicHandle = setInterval(logicLoop, 16);
    renderLoop();
});

let time = performance.now();
export let delta = 0;

function logicLoop() {
    delta = performance.now() - time;
    time += delta;
    delta /= 1000;
    if (renderer.isReady && scene.mine) scene.doPhysics(delta);
}

function renderLoop() {
    if (renderer.isReady) {
        renderer.updateView();
        ui.update();
    }
    renderHandle = requestAnimationFrame(renderLoop);
}