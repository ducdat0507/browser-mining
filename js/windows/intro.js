import * as save from "../save.js";
import ores from "../data/ores.js";
import format from "../format.js";

export function build(window) {
    window.style.top = "50%";
    window.style.left = "50%";
    window.style.transform = "translate(-50%, -50%)";
    window.style.width = "500px";
    window.style.height = "300px";

    window.$title.textContent = "Welcome to Browser Mining!";

    let close = document.createElement("button");
    close.classList.add("close-button");
    close.onclick = window.close;
    window.$title.append(close);

    window.$content.innerHTML = `
        <div style="text-align:center;padding-block:30px">
            Some rough instructions:
        </div>
        <div class="intro-instructions">
            <div><big>W/A/S/D<br>keys</big><div><br>to move</div></div>
            <div><big>Space<br>key</big><div><br>to jump</div></div>
            <div><big>Left<br>click+hold</big><div><br>to mine blocks</div></div>
            <div><big>Right<br>click+drag</big><div><br>to rotate camera</div></div>
        </div>
        <div style="text-align:center;padding-top:20px">
            This game is still a WIP, stay tuned for updates!
            <br>Have fun!
            <br>Click the X button on the top right corner to close this popup window.
        </div>
    `;

}

export function update(window) {
}