import * as renderer from './renderer.js'
import * as resources from './resources.js'
import * as input from './input.js'
import * as scene from './scene.js';
import * as ui from './ui.js';
import * as save from './save.js';

document.addEventListener("DOMContentLoaded", () => {
    time = performance.now();
    resources.loadResources();
    input.init();
    save.init();
    setInterval(logicLoop, 16);
    renderLoop();
});

let time = performance.now();
export let delta = 0;

function logicLoop() {
    delta = performance.now() - time;
    time += delta;
    delta /= 1000;
    if (scene.mine) scene.doPhysics(delta);
}

function renderLoop() {
    if (renderer.isReady) {
        renderer.updateView();
        ui.update();
    }
    requestAnimationFrame(renderLoop);
}