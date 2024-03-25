import * as save from "../save.js";

export function build(window, title, content, actions = ["Ok"], onAct = () => {}) {
    window.style.top = "50%";
    window.style.left = "50%";
    window.style.transform = "translate(-50%, -50%)";
    window.style.width = "fit-content";
    window.style.maxWidth = "min(90%, 400px)";
    window.style.maxHeight = "80%";

    window.$title.textContent = title;

    window.$content.style.padding = "7px";
    window.$content.append(content);

    let actionsDiv = document.createElement("div");
    actionsDiv.classList.add("window-actions");
    window.$content.append(actionsDiv);

    for (let id in actions) {
        let actionBtn = document.createElement("button");
        actionBtn.textContent = actions[id];
        actionBtn.onclick = () => {
            onAct(id);
            window.close();
        }
        actionsDiv.append(actionBtn);
    }
}

export function update(window) {
}