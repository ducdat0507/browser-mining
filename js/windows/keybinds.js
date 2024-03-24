import * as save from "../save.js";
import ores from "../data/ores.js";
import format from "../format.js";
import * as ui from "../ui.js";
import * as input from "../input.js";

export function build(window) {
    window.style.top = "50%";
    window.style.left = "50%";
    window.style.transform = "translate(-50%, -50%)";
    window.style.width = "720px";
    window.style.maxHeight = "80%";

    window.$title.textContent = "Keybindings";
    window.$content.classList.add("scrollable");

    let close = document.createElement("button");
    close.classList.add("close-button");
    close.onclick = () => {window.close(); input.setKeybind(null)};
    window.$title.append(close);
    

    let desc = document.createElement("div");
    desc.style.padding = "7px 7px 0 7px";
    desc.textContent = "Press the button associated with a keybind, then press a key on your keyboard to change the key for that keybind.";
    window.$content.append(desc);


    let content = document.createElement("form");
    content.classList.add("options-content");
    window.$content.append(content);

    for (let group in input.keybindGroups) {
        let groupDiv = create.group(group);
        content.append(groupDiv);

        for (let keybind of input.keybindGroups[group]) {
            groupDiv.append(create.keybind(keybind))
        }
    }
}

let create = { 
    group(name) {
        let group = document.createElement("fieldset");
        group.classList.add("option-group");

        let label = document.createElement("legend");
        label.innerText = name;
        group.append(label);

        return group;
    },
    keybind(keybind) {
        let keybindData = input.keybinds[keybind];

        let item = document.createElement("div");
        item.classList.add("option-item");

        let labelDiv = document.createElement("label");
        labelDiv.textContent = keybindData.name;
        item.append(labelDiv);

        let button = document.createElement("button");
        button.textContent = format.key(save.data.opt.keybinds[keybind] ?? keybindData.key);
        button.onclick = () => input.setKeybind(keybind, (newKey) => {
            button.textContent = format.key(newKey);
        });
        button.type = "button";
        item.append(button);

        return item;
    },
}

export function update(window) {
}