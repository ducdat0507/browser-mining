import * as save from "../save.js";
import ores from "../data/ores.js";
import format from "../format.js";

export function build(window, error) {
    window.style.top = "50%";
    window.style.left = "50%";
    window.style.transform = "translate(-50%, -50%)";
    window.style.width = "500px";
    window.style.maxHeight = "80%";

    window.$title.textContent = "Oh noes";

    window.$content.classList.add("scrollable", "base-padding");
    let escape = x => (x + "").replaceAll("&", "&amp;").replaceAll(">", "&gt;").replaceAll("<", "&lt;").replaceAll("\n", "<br>")
    window.$content.innerHTML = `
        A fatal error has occurred.<br>
        The game has stopped and can no longer continue.<br>
        Please screenshot this screen and send it to the developer.<br>
        <br>
        Error information:<br>
        <b>${escape(error.message)}</b><br>
        <i>${escape(error.fileName)} - line ${escape(error.lineNumber)} char ${escape(error.columnNumber)}</i><br>
        <br>
        ${escape(error.stack)}
    `

}

export function update(window) {
}