import format from "../format.js";
import * as save from "../save.js";

export function build(window, str) {
    window.style.top = "50%";
    window.style.left = "50%";
    window.style.transform = "translate(-50%, -50%)";
    window.style.width = "fit-content";
    window.style.maxWidth = "min(90%, 400px)";
    window.style.maxHeight = "80%";

    let tempSave = save.tryImportString(str);

    if (tempSave) {
        window.$title.textContent = "Import Save?";
    
        window.$content.style.padding = "7px";
        window.$content.innerHTML = `
            Are you sure you want to import this save?
            <b>The current save will be overriden!</b>
            <br>
            To prevent you from importing the wrong save, here's a brief summary about the save you are about to import:
            <ul id="save-summary">
                <li>Blocks mined: <b>${format(tempSave.stats.blockMined)}</b></li>
            </ul>
            <div class="option-multi-toggle" style="padding-top:7px">
                <input type="checkbox" id="keep-options">
                <label for="keep-options">Also import options</label>
            </div>
        `;
    
        let actions = document.createElement("div");
        actions.classList.add("window-actions");
        window.$content.append(actions);
    
        let actionYes = document.createElement("button");
        actionYes.textContent = "Confirm";
        actionYes.onclick = () => {
            if (!window.querySelector("#keep-options").checked) tempSave.opt = save.data.opt;
            save.applySave(tempSave);
            window.$content.innerHTML = "Importing your save...";
        }
        actions.append(actionYes);
    
        let actionNo = document.createElement("button");
        actionNo.textContent = "Cancel";
        actionNo.onclick = window.close;
        actions.append(actionNo);
    } else {
        window.$title.textContent = "Invalid Save";
    
        window.$content.style.padding = "7px";
        window.$content.innerHTML = `
            Your save failed to load. You save string might be corrupted or truncated.
        `;
    
        let actions = document.createElement("div");
        actions.classList.add("window-actions");
        window.$content.append(actions);
    
        let actionNo = document.createElement("button");
        actionNo.textContent = "Close";
        actionNo.onclick = window.close;
        actions.append(actionNo);
    }

}

export function update(window) {
}