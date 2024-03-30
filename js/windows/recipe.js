import * as save from "../save.js";
import ores from "../data/ores.js";
import format from "../format.js";
import picks from "../data/picks.js";
import gears from "../data/gears.js";

let items = {pick: picks, gear: gears};

export function build(window) {
    window.style.bottom = "60px";
    window.style.left = "5px";
    window.style.width = "200px";
    window.style.height = "400px";

    window.$title.textContent = "Recipe";
    window.$content.classList.add("scrollable");

    window.$setRecipe = (item) => {
        window.$item = item;
        let itemData = items[item[0]][item[1]];
        window.$title.innerHTML = "<div>" + itemData.name + " <span style='font-weight: normal'>Recipe</span></div>";

        let close = document.createElement("button");
        close.classList.add("close-button");
        close.onclick = window.close;
        window.$title.append(close);
    }

    window.$rec = [];
}

export function update(window) {
    let item = window.$item;
    let recipe = items[item[0]][item[1]].recipe;
    let index = 0;
    let canForge = true;
    for (let ore in recipe) {
        if (window.$rec.length <= index) {
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
    
            window.$rec.push(item);
            window.$content.append(item);
        }
        let item = window.$rec[index];
        let oreData = ores[ore];
        let current = save.data.inv.normal[ore] ?? 0;
        let goal = recipe[ore];
        item.$name.textContent = oreData.name;
        item.$amount.textContent = format(current) + " / " + format(goal);
        item.setAttribute("tier", oreData.tier);
        item.classList.toggle("complete", current >= goal);
    
        canForge &&= current >= goal;
        index++;
    }
    while (window.$rec.length > index) {
        window.$rec[index].remove();
        window.$rec.splice(index, 1);
    }
}