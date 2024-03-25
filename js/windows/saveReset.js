import * as save from "../save.js";
import ores from "../data/ores.js";
import format from "../format.js";

export function build(window) {
    window.style.top = "50%";
    window.style.left = "50%";
    window.style.transform = "translate(-50%, -50%)";
    window.style.width = "fit-content";
    window.style.maxWidth = "min(90%, 400px)";
    window.style.maxHeight = "80%";

    window.$title.textContent = "Hard reset?";

    window.$content.style.padding = "7px";
    window.$content.innerHTML = `
        Are you sure you want to perform a hard reset? 
        <b>This will completely wipe your progress without giving any boosts, secrets, nor anything special whatsoever.</b>
        <br>
        The game will copy your save into the clipboard in case you want to undo this change.
        <br>
        <div class="option-multi-toggle" style="padding-top:7px">
            <input type="checkbox" checked id="reset-options">
            <label for="reset-options">Keep options</label>
        </div>
    `;

    let actions = document.createElement("div");
    actions.classList.add("window-actions");
    window.$content.append(actions);

    let actionYes = document.createElement("button");
    actionYes.textContent = "Confirm";
    actionYes.onclick = () => {
        save.hardReset(window.querySelector("#reset-options").checked);
        window.$content.innerHTML = "Resetting your save...";
    }
    actions.append(actionYes);

    let actionNo = document.createElement("button");
    actionNo.textContent = "Cancel";
    actionNo.onclick = window.close;
    actions.append(actionNo);
}

export function update(window) {
}