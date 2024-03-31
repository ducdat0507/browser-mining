import * as save from "../save.js";
import ores from "../data/ores.js";
import * as scene from "../scene.js";
import format from "../format.js";

export function build(window) {
    window.style.bottom = "60px";
    window.style.right = "5px";
    window.style.width = "200px";
    window.style.height = "400px";

    window.$title.textContent = "Teleport";
    window.$content.classList.add("scrollable", "button-list", "block-padding");

    let close = document.createElement("button");
    close.classList.add("close-button");
    close.onclick = window.close;
    window.$title.append(close);

    window.$list = [];
}

export function update(window) {
    let index = 0;
    let tab = "normal"
    let list = [
        {depth: 2, req: 0, text: "Surface"},
        {depth: 500, req: 5000},
        {depth: 1000, req: 10000},
        {depth: 1500, req: 15000},
        {depth: 2000, req: 20000},
        {depth: 2500, req: 25000},
        {depth: 3000, req: 30000},
        {depth: 3500, req: 35000},
        {depth: 4000, req: 40000},
        {depth: 4500, req: 45000},
        {depth: 5000, req: 50000},
        {depth: 5500, req: 55000},
        {depth: 6000, req: 60000},
        {depth: 6500, req: 65000},
        {depth: 7000, req: 70000},
        {depth: 7500, req: 75000},
    ]
    for (let target of list) {
        if (window.$list.length <= index) {
            let item = document.createElement("button");
            item.style.display = "block";
            item.onclick = () => {
                if (item.$target.depth) {
                    scene.teleportToDepth(item.$target.depth);
                }
            }

            window.$list.push(item);
            window.$content.append(item);
        }
        let item = window.$list[index];
        let ok = save.data.stats.blockMined >= target.req;
        item.disabled = !ok;
        item.textContent = ok 
            ? (target.text ?? format(target.depth) + "m") 
            : "Requires " + format(target.req) + " blocks mined";
        item.$target = target;


        index++;
    }
    while (window.$list.length > index) {
        window.$list[index].remove();
        window.$list.splice(index, 1);
    }
}