import * as save from "../save.js";
import ores from "../data/ores.js";
import format from "../format.js";

export function build(window) {
    window.style.bottom = "5px";
    window.style.left = "5px";
    window.style.width = "200px";
    window.style.height = "400px";

    window.$title.textContent = "Inventory";

    let listDiv = document.createElement("div");
    listDiv.classList.add("inventory-list");
    window.$content.$list = listDiv;
    window.$content.append(listDiv);

    window.$list = [];
}

export function update(window) {
    let index = 0;
    let tab = "normal"
    for (let ore in save.data.inv[tab]) {
        if (window.$list.length <= index) {
            let item = document.createElement("div");
            item.classList.add("inventory-item");

            let name = document.createElement("div");
            name.classList.add("item-name");
            item.$name = name;
            item.append(name);

            let amount = document.createElement("div");
            amount.classList.add("item-amount");
            item.$amount = amount;
            item.append(amount);

            window.$list.push(item);
            window.$content.$list.append(item);
        }
        let item = window.$list[index];
        let oreData = ores[ore];
        item.$name.textContent = oreData.name;
        item.$amount.textContent = format(save.data.inv[tab][ore]);

        index++;
    }
}