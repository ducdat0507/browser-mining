import { moveCamera, currentBlock } from "./renderer.js";
import { data } from "./save.js";
import * as scene from "./scene.js";

export let mouseIn, mouseX, mouseY;
export let interval = null;
export let targetSpeed = [0, 0], isJumping = false;

let targetKeybind = null, onKeybind = null;

export function init() {
    let view = document.getElementById("view-canvas");
    window.addEventListener("contextmenu", (e) => {
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
        e.preventDefault();
        if (e.repeat) return;
        if (targetKeybind) {
            data.opt.keybinds[targetKeybind] = e.key;
            onKeybind(e.key);
            targetKeybind = onKeybind = null;
        }
        for (let keybind in keybinds) {
            let keybindData = keybinds[keybind];
            let key = data.opt.keybinds[keybind] ?? keybindData.key;
            if (e.key == key) {
                keybindData.down();
                let upEvent = (e) => {
                    if (e.key == key) {
                        keybindData.up?.();
                        window.removeEventListener("keyup", upEvent);
                    }
                }
                window.addEventListener("keyup", upEvent);
                return;
            }
        }
    })
}

export const keybinds = {
    move_forw: {
        name: "Move forward",
        key: "w",
        down() {
            targetSpeed[1]++;
        },
        up() {
            targetSpeed[1]--;
        },
    },
    move_back: {
        name: "Move backward",
        key: "s",
        down() {
            targetSpeed[1]--;
        },
        up() {
            targetSpeed[1]++;
        },
    },
    move_left: {
        name: "Move left",
        key: "a",
        down() {
            targetSpeed[0]++;
        },
        up() {
            targetSpeed[0]--;
        },
    },
    move_right: {
        name: "Move right",
        key: "d",
        down() {
            targetSpeed[0]--;
        },
        up() {
            targetSpeed[0]++;
        },
    },
    jump: {
        name: "Jump",
        key: " ",
        down() {
            isJumping = true;
        },
        up() {
            isJumping = false;
        },
    },
}

export const keybindGroups = {
    "Movement": ["move_forw", "move_back", "move_left", "move_right", "jump"],
}

export function setKeybind(keybind, after) {
    if (targetKeybind == keybind || !keybind) {
        targetKeybind = onKeybind = null;
    } else {
        targetKeybind = keybind;
        onKeybind = after;
    }
}