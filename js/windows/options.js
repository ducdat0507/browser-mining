import * as save from "../save.js";
import ores from "../data/ores.js";
import format from "../format.js";
import * as ui from "../ui.js";
import * as _3 from "three";

let hasChangeGraphics = false;

export function build(window) {
    window.style.top = "50%";
    window.style.left = "50%";
    window.style.transform = "translate(-50%, -50%)";
    window.style.width = "720px";
    window.style.maxHeight = "80%";

    window.$title.textContent = "Options";

    let close = document.createElement("button");
    close.classList.add("close-button");
    close.onclick = window.close;
    window.$title.append(close);

    window.$content.classList.add("options-holder");

    let tabs = document.createElement("div");
    tabs.classList.add("options-tab-list");
    window.insertBefore(tabs, window.$content);
    window.$content.classList.add("scrollable");

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
            group.append(create.slider("Sensitivity", 0.1, 10, () => {
                return save.data.opt.mouseSensitivity;
            }, (value) => {
                save.data.opt.mouseSensitivity = value;
                save.setDirty();
            }, {precision: 2, mapIn: x => Math.log10(x), mapOut: x => 10 ** x}));
            group.append(create.toggleXY("Invert mouse", () => {
                return save.data.opt.invertMouse;
            }, (value) => {
                save.data.opt.invertMouse = value;
                save.setDirty();
            }));

            content.append(group = create.group("Keyboard"));
            group.append(create.button("Keybindings", "Open keybindings", () => {
                return ui.spawnWindow("keybinds");
            }));

        }
    },
    display: {
        name: "Display",
        build(content) {
            let group;

            content.append(group = create.group("Graphics"));
            group.innerHTML += `
                <div style='padding: 2px 2px 5px 2px'>
                    <b>Note:</b> These options require a game reload to apply correctly.
                </div>
            `;
            let applyButton;
            group.append(create.toggle("Anti-aliasing", () => {
                return save.data.opt.antialias
            }, (value) => {
                save.data.opt.antialias = value;
                applyButton.disabled = false;
                hasChangeGraphics = true;
                save.setDirty();
            }))
            group.append(applyButton = create.button("Apply changes", "Reload game", async () => {
                applyButton.disabled = true;
                await save.save();
                document.location.reload();
            }));
            applyButton.style.paddingTop = "5px";
            applyButton = applyButton.querySelector("button")
            applyButton.disabled = !hasChangeGraphics;
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
            let group;

            content.append(group = create.group("Storage actions"));
            group.append(create.button("Hard reset", "⚠ Reset game ⚠", () => {
                ui.spawnWindow("saveReset", {cover: true});
            }));
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
    
    button(label, content, click) {
        let item = document.createElement("div");
        item.classList.add("option-item");

        let labelDiv = document.createElement("label");
        labelDiv.textContent = label;
        item.append(labelDiv);

        let button = document.createElement("button");
        button.textContent = content;
        button.onclick = click;
        button.type = "button";
        item.append(button);

        return item;
    },
    
    toggle(label, get, set) {
        let item = document.createElement("div");
        item.classList.add("option-item");

        let labelDiv = document.createElement("label");
        labelDiv.textContent = label;
        item.append(labelDiv);

        let inputDiv = document.createElement("div");
        inputDiv.classList.add("option-multi-toggle");
        item.append(inputDiv);

        let input = document.createElement("input");
        labelDiv.htmlFor = input.id = Math.random();
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
    },

    slider(label, min, max, get, set, options) {
        options = {
            precision: 0,
            mapIn: x => x, 
            mapOut: x => x,
            ...options,
        }

        let item = document.createElement("div");
        item.classList.add("option-item");

        let labelDiv = document.createElement("label");
        labelDiv.textContent = label;
        item.append(labelDiv);

        let inputDiv = document.createElement("div");
        inputDiv.classList.add("option-slider");
        item.append(inputDiv);

        let slider = document.createElement("input");
        labelDiv.htmlFor = slider.id = Math.random();
        slider.type = "range";
        slider.min = options.mapIn(min);
        slider.max = options.mapIn(max);
        slider.step = options.mapIn ? 1e-300 : options.step ?? 0.1 ** options.precision;
        slider.value = options.mapIn(get());
        slider.oninput = () => {
            let value = options.mapOut(+slider.value);
            set(value); input.value = format(value, options.precision);
        }
        inputDiv.append(slider);

        let input = document.createElement("input");
        labelDiv.htmlFor = input.id = Math.random();
        input.type = "text";
        input.min = min;
        input.max = max;
        input.step = options.step ?? 0.1 ** options.precision;
        input.value = format(get(), options.precision);
        input.oninput = () => {
            let value = _3.MathUtils.clamp(+input.value, min, max);
            set(value); slider.value = options.mapIn(value);
        }
        input.onchange = () => {
            input.value = format(get(), options.precision);
        }
        inputDiv.append(input);
        return item;
    }
}

export function update(window) {
}