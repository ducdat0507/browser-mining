import * as save from "../save.js";
import * as ui from "../ui.js";

export function build(window) {
    window.style.top = "50%";
    window.style.left = "50%";
    window.style.transform = "translate(-50%, -50%)";
    window.style.width = "fit-content";
    window.style.maxWidth = "min(90%, 500px)";
    window.style.maxHeight = "80%";

    window.$title.textContent = "Save Manipulation";

    let close = document.createElement("button");
    close.classList.add("close-button");
    close.onclick = window.close;
    window.$title.append(close);

    window.$content.style.padding = "7px";
    window.$content.innerHTML = `
        The text box below contains your save string. Copy it (or download it as a file) and keep it somewhere safe.
        <br>
        Alternatively, enter/paste your save string to the text box below (or load a save from a save file) for the "Import save" option to appear.
        <br>
        <input id="save-box">
    `;

    let saveBox = window.querySelector('#save-box');
    saveBox.value = save.getExportString();
    saveBox.oninput = () => {
        exportClipboard.style.display = exportFile.style.display = "none";
        importSave.style.display = "";
    };

    let actions = document.createElement("div");
    actions.classList.add("window-actions");
    window.$content.append(actions);

    let importFile = document.createElement("button");
    importFile.textContent = "Import from File";
    importFile.onclick = () => {
        let input = document.createElement("input");
        input.type = "file";
        input.onchange = () => {
            let file;
            if (file = input.files?.[0]) {
                file.text().then(text => {
                    saveBox.value = text;
                    saveBox.oninput();
                })
            }
        }
        input.click();
    }
    actions.append(importFile);

    let space = document.createElement("div");
    space.style.flex = "1 1 auto";
    actions.append(space);

    let exportClipboard = document.createElement("button");
    exportClipboard.textContent = "Export to Clipboard";
    exportClipboard.onclick = () => {
        navigator.clipboard.writeText(save.getExportString());
        ui.spawnWindow("dialog", {cover:true}, "Game exported", "Save string copied to clipboard!")
    }
    actions.append(exportClipboard);
    let exportFile = document.createElement("button");
    exportFile.textContent = "Export to File";
    exportFile.onclick = () => {
        let link = document.createElement("a");
        link.href = "data:application/browsermining," + save.getExportString();
        let url = link.download = Date.now() + ".browsermining";
        link.click();
        ui.spawnWindow("dialog", {cover:true}, "Game exported", "File downloaded as \"" + url + "\"!")
    }
    actions.append(exportFile);

    let importSave = document.createElement("button");
    importSave.textContent = "Import Save";
    importSave.style.display = "none";
    importSave.onclick = () => {
        ui.spawnWindow("saveImport", {cover:true}, saveBox.value)
    }
    actions.append(importSave);
}

export function update(window) {
}