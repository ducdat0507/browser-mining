import * as save from "../save.js";
import ores from "../data/ores.js";
import picks from "../data/picks.js";
import gears from "../data/gears.js";
import format from "../format.js";
import * as ui from "../ui.js";

let items = {pick: picks, gear: gears};

export function build(window) {
    window.style.bottom = "60px";
    window.style.transform = "translate(-50%, 0)";
    window.style.left = "50%";
    window.style.width = "440px";
    window.style.height = "400px";

    window.$title.textContent = "Inventory";
    window.$content.classList.add("inv-grid");

    let close = document.createElement("button");
    close.classList.add("close-button");
    close.onclick = () => {
        window.close();
        ui.setInvActive(false);
    }
    window.$title.append(close);

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

    let activeTabBtn;

    for (let tab in invTabs) {
        let tabBtn = document.createElement("button");
        tabBtn.textContent = invTabs[tab].name;
        tabBtn.onclick = () => {
            list.textContent = "";
            for (let item in items[tab]) if (save.data.having[tab].includes(item)) {
                let itemData = items[tab][item];
                let itemBtn = document.createElement("button");
                itemBtn.classList.add("tier-button");
                itemBtn.setAttribute("tier", itemData.tier);
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
        let button = document.createElement("button");
        button.classList.add("inv-item-action");
        if (item[0] == "pick") {
            if (save.data.loadout.pick == item[1]) {
                button.disabled = true;
                button.textContent = "Equipped";
            } else {
                button.textContent = "Equip";
                button.onclick = () => {
                    save.data.loadout.pick = item[1];
                    save.setDirty();
                    ui.updateDeck();
                    button.disabled = true;
                    button.textContent = "Equipped";
                }
            }
        }
        desc.append(button);
    }

    tabs.firstChild.click();
}

export function makeToolInfo(desc, item) {
    let itemData = items[item[0]][item[1]];
    desc.innerHTML = `
        <div class="inv-item-name">${itemData.name}</div>
        <div class="rarity-text" style="width:fit-content" tier="${itemData.tier}">Tier ${itemData.tier + 1}</div>
        <div class="inv-item-desc">${itemData.desc}</div>
    `

    for (let ability of itemData.abilities) {
        let abilityBox = document.createElement("div");
        abilityBox.classList.add("inv-item-ability");
        abilityBox.innerHTML = `
            <div class="inv-item-name">${ability.name}</div>
            <div class="inv-item-desc">${ability.desc}</div>
        `
        desc.append(abilityBox);
    }
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
}