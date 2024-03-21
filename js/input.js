import { moveCamera, currentBlock } from "./renderer.js";
import * as scene from "./scene.js";

export let mouseIn, mouseX, mouseY;
export let interval = null;
export let targetSpeed = [0, 0], isJumping = false;

export function init() {
    let view = document.getElementById("view-canvas")
    view.addEventListener("contextmenu", (e) => {
        e.preventDefault();
    })

    // Mouse input
    view.addEventListener("pointerdown", (e) => {
        {
            let pointerId = e.pointerId;
            view.setPointerCapture(pointerId);
            let upEvent = (e) => {
                if (e.button == 0) {
                    view.releasePointerCapture(pointerId);
                    view.removeEventListener("pointerup", upEvent);
                }
            }
            view.addEventListener("pointerup", upEvent);
        }

        if (e.button == 0) {
            if (!interval) interval = setInterval((e) => {
                if (currentBlock) scene.mineAt(currentBlock.blockPos);
            }, 50)
            let upEvent = (e) => {
                if (e.button == 0) {
                    clearInterval(interval);
                    interval = null;
                    view.removeEventListener("pointerup", upEvent);
                }
            }
            view.addEventListener("pointerup", upEvent);
        } else if (e.button == 2) {
            view.requestPointerLock();

            let cursorPos = document.createElement("div");
            cursorPos.classList.add("cursor-lock");
            cursorPos.style.left = mouseX + "px";
            cursorPos.style.top = mouseY + "px";
            document.body.append(cursorPos);

            let moveEvent = (e) => {
                moveCamera(e.movementX, e.movementY);
            }
            let upEvent = (e) => {
                if (e.button == 2) {
                    document.exitPointerLock();
                    cursorPos.remove();
                    view.removeEventListener("pointermove", moveEvent);
                    view.removeEventListener("pointerup", upEvent);
                }
            }
            view.addEventListener("pointermove", moveEvent);
            view.addEventListener("pointerup", upEvent);
        }
    })
    view.addEventListener("pointerenter", (e) => {
        mouseIn = true;
    })
    view.addEventListener("pointerleave", (e) => {
        mouseIn = false;
    })
    view.addEventListener("pointermove", (e) => {
        mouseIn = true;
        mouseX = e.clientX;
        mouseY = e.clientY;
    })
    
    // Keyboard input
    window.addEventListener("keydown", (e) => {
        if (e.repeat) return;
        if (e.key == "w") {
            targetSpeed[1]++;
            let upEvent = (e) => {
                if (e.key == "w") {
                    targetSpeed[1]--;
                    window.removeEventListener("keyup", upEvent);
                }
            }
            window.addEventListener("keyup", upEvent);
        }
        if (e.key == "s") {
            targetSpeed[1]--;
            let upEvent = (e) => {
                if (e.key == "s") {
                    targetSpeed[1]++;
                    window.removeEventListener("keyup", upEvent);
                }
            }
            window.addEventListener("keyup", upEvent);
        }
        if (e.key == "a") {
            targetSpeed[0]++;
            let upEvent = (e) => {
                if (e.key == "a") {
                    targetSpeed[0]--;
                    window.removeEventListener("keyup", upEvent);
                }
            }
            window.addEventListener("keyup", upEvent);
        }
        if (e.key == "d") {
            targetSpeed[0]--;
            let upEvent = (e) => {
                if (e.key == "d") {
                    targetSpeed[0]++;
                    window.removeEventListener("keyup", upEvent);
                }
            }
            window.addEventListener("keyup", upEvent);
        }
        if (e.key == " ") {
            isJumping = true;
            let upEvent = (e) => {
                if (e.key == " ") {
                    isJumping = false;
                    window.removeEventListener("keyup", upEvent);
                }
            }
            window.addEventListener("keyup", upEvent);
        }
    })
}