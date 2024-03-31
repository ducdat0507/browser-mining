import * as save from "../save.js";
import ores from "../data/ores.js";
import picks from "../data/picks.js";
import gears from "../data/gears.js";
import format from "../format.js";
import * as ui from "../ui.js";
import { makeToolInfo } from "./inventory.js";

let items = {pick: picks, gear: gears};

export function build(window) {
    window.style.bottom = "60px";
    window.style.transform = "translate(-320px, 0)";
    window.style.left = "50%";
    window.style.width = "440px";
    window.style.height = "400px";

    window.$title.textContent = "Forge";
    window.$content.classList.add("inv-grid");

    let close = document.createElement("button");
    close.classList.add("close-button");
    close.onclick = () => {
        window.close();
        ui.setInvActive(false);
    }
    window.$title.append(close);

    window.$rec = [];

    let tabs = document.createElement("div");
    tabs.classList.add("window-tab-list");
    window.insertBefore(tabs, window.$content);

    let list = document.createElement("div");
    list.classList.add("inv-list");
    window.$list = list;
    window.$content.append(list);

    let desc = document.createElement("div");
    desc.classList.add("inv-desc", "block-padding");
    desc.innerHTML = `
        <div class="inv-item-name">No item chosen</div>
        <div class="inv-item-desc">&larr; Choose an item from the left</div>
    `
    window.$desc = desc;
    window.$content.append(desc);

    let recipe = document.createElement("div");
    recipe.classList.add("inv-recipe");
    window.$recipe = recipe;
    window.$content.append(recipe);

    let recipeHead = document.createElement("div");
    recipeHead.classList.add("pseudo-window-title", "inv-pin-dragger");
    window.$recipe.$head = recipeHead;
    recipeHead.textContent = "Drag to pin recipe";
    recipeHead.onpointerdown = (e) => {
        if (e.button != 0) return;

        let recWindow = ui.spawnWindow("recipe", {unique: true});
        let rect = recipe.getBoundingClientRect();
        let extraHeight = recipeHead.getBoundingClientRect().height - 1;

        recWindow.$setRecipe(window.$item);
        recWindow.style.left = rect.left + "px";
        recWindow.style.top = rect.top - extraHeight + "px";
        recWindow.style.width = rect.width + "px";
        recWindow.style.height = rect.height + extraHeight + "px";
        recWindow.$title.onpointerdown(e);

        recipe.style.display = recipeHead.style.display = "none";
        window.$item = null;
        window.style.width = "440px";
    }
    window.append(recipeHead);
    
    recipe.style.display = recipeHead.style.display = "none";

    let activeTabBtn;

    for (let tab in invTabs) {
        let tabBtn = document.createElement("button");
        tabBtn.textContent = invTabs[tab].name;
        tabBtn.onclick = () => {
            list.textContent = "";
            for (let item in items[tab]) if (!save.data.having[tab].includes(item)) {
                let itemData = items[tab][item];
                let itemBtn = document.createElement("button");
                itemBtn.classList.add("tier-button");
                itemBtn.setAttribute("tier", itemData.tier);
                itemBtn.setAttribute("item", item);
                itemBtn.textContent = itemData.name;
                itemBtn.onclick = () => {
                    setItem([tab, item]);
                };
                list.append(itemBtn);
            }
            
            if (activeTabBtn) activeTabBtn.disabled = false;
            activeTabBtn = tabBtn;
            activeTabBtn.disabled = true;
        };
        tabs.append(tabBtn);
    }

    function setItem(item) {
        makeToolInfo(desc, item);

        recipe.style.display = recipeHead.style.display = "";
        window.style.width = "640px";
        window.$item = item;

        let button = document.createElement("button");
        button.classList.add("inv-item-action");
        button.onclick = () => { 
            let recipe = items[item[0]][item[1]].recipe;
            for (let ore in recipe) {
                let current = save.data.inv.normal[ore] ?? 0;
                let goal = recipe[ore];
                if (current < goal) return;
            }
            for (let ore in recipe) {
                save.data.inv.normal[ore] -= recipe[ore];
                if (!save.data.inv.normal[ore]) delete save.data.inv.normal[ore];
            }
            save.data.having[item[0]].push(item[1]);
            save.setDirty();

            window.querySelector("[item='" + item[1] + "']")?.remove();
            window.$recipe.style.display = window.$recipe.$head.style.display = "none";
            window.$item = null;
            button.disabled = true;
            button.textContent = "Forged!";
            window.style.width = "440px";
        }
        window.$desc.$button = button;
        desc.append(button);
    }

    tabs.firstChild.click();
}

let invTabs = {
    pick: {
        name: "Pickaxes",
    },
    gear: {
        name: "Gears",
    },
}

export function update(window) {
    if (window.$item) {
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
                window.$recipe.append(item);
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
        if (canForge) {
            window.$desc.$button.disabled = false;
            window.$desc.$button.textContent = "Forge";
        } else {
            window.$desc.$button.disabled = true;
            window.$desc.$button.textContent = "Can't forge";
        }
    }
}