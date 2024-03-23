import * as save from "../save.js";
import ores from "../data/ores.js";
import format from "../format.js";

export function build(window) {
    window.style.top = "50%";
    window.style.left = "50%";
    window.style.transform = "translate(-50%, -50%)";
    window.style.width = "600px";
    window.style.maxHeight = "80%";

    window.$title.textContent = "Options";

    let close = document.createElement("button");
    close.classList.add("close-button");
    close.onclick = window.close;
    window.$title.append(close);

    window.$content.classList.add("options-holder");

    let tabs = document.createElement("div");
    tabs.classList.add("options-tab-list");
    window.$content.append(tabs);

    let content = document.createElement("form");
    content.classList.add("options-content");
    window.$content.append(content);

    let activeTabBtn;

    for (let tab in optionsTabs) {
        let tabBtn = document.createElement("button");
        tabBtn.textContent = optionsTabs[tab].name;
        tabBtn.onclick = () => {
            content.textContent = "";
            optionsTabs[tab].build(content);
            if (activeTabBtn) activeTabBtn.disabled = false;
            activeTabBtn = tabBtn;
            activeTabBtn.disabled = true;
        };
        tabs.append(tabBtn);
    }

    tabs.firstChild.click();
}

let optionsTabs = {
    controls: {
        name: "Controls",
        build(content) {
            let group;
            content.append(group = create.group("Mouse"));
            group.append(create.toggleXY("Invert mouse", () => {
                return save.data.opt.invertMouse
            }, (value) => {
                save.data.opt.invertMouse = value;
            }));
        }
    },
    display: {
        name: "Display",
        build(content) {

        }
    },
    audio: {
        name: "Audio",
        build(content) {

        }
    },
    storage: {
        name: "Storage",
        build(content) {

        }
    },
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
    
    toggle(label, get, set) {
        let item = document.createElement("div");
        item.classList.add("option-item");

        let labelDiv = document.createElement("label");
        labelDiv.textContent = label;
        item.append(labelDiv);

        let inputDiv = document.createElement("div");
        item.append(inputDiv);

        let input = document.createElement("input");
        input.type = "checkbox";
        input.checked = get();
        input.oninput = () => set(input.checked);
        inputDiv.append(input);

        return item;
    },
    
    toggleXY(label, get, set) {
        let item = document.createElement("div");
        item.classList.add("option-item");

        let labelDiv = document.createElement("label");
        labelDiv.textContent = label;
        item.append(labelDiv);

        let inputDiv = document.createElement("div");
        inputDiv.classList.add("option-multi-toggle");
        item.append(inputDiv);

        let value = get();

        let inputX = document.createElement("input");
        inputX.id = Math.random();
        inputX.type = "checkbox";
        inputX.checked = value[0];
        inputX.oninput = () => set([inputX.checked, inputY.checked]);
        inputDiv.append(inputX);

        let labelX = document.createElement("label");
        labelX.htmlFor = inputX.id;
        labelX.textContent = "X";
        inputDiv.append(labelX);

        let inputY = document.createElement("input");
        inputY.id = Math.random();
        inputY.type = "checkbox";
        inputY.checked = value[1];
        inputY.oninput = () => set([inputX.checked, inputY.checked]);
        inputDiv.append(inputY);

        let labelY = document.createElement("label");
        labelY.htmlFor = inputY.id;
        labelY.textContent = "Y";
        inputDiv.append(labelY);

        return item;
    }
}

export function update(window) {
}