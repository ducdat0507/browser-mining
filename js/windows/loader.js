import * as save from "../save.js";
import ores from "../data/ores.js";
import format from "../format.js";

export function build(window) {
    window.style.top = "50%";
    window.style.left = "50%";
    window.style.transform = "translate(-50%, -50%)";
    window.style.width = "500px";
    window.style.height = "212px";

    window.$title.textContent = "Loading...";
    window.$content.classList.add("preloader");

    window.$content.innerHTML = `
        <div class="preloader-header">
            <h1>Welcome to Browser Mining.</h1>
        </div>
        <div class="flavor-text">
            <div>${flavorText[Math.floor(Math.random() * flavorText.length)]}</div>
        </div>
        <div class="loading-bar">
            <div class="fill"></div>
        </div>
        <div class="loading-action">
            <div class="action">Loading...</div>
            <div class="progress">0 / 100</div>
        </div>
    `;

    window.$bar = window.querySelector(".loading-bar");
    window.$action = window.querySelector(".action");
    window.$progress = window.querySelector(".progress");
}

let flavorText = [
    "This is Browser Mining. You can mine anything!",
    '"Minecraft"? Did you mean to say "mine cap"?',
    "I wish I could play this game just like you, being a loading screen all the time gets pretty boring sometimes.",
    'Also known as "My Instant Break Ability Is So Overpowered, No Block In This Voxel World Stands A Chance Against Me!"',
    "Essential mining tip: Blocks break when you mine them. They also increase your amount of that resource by 1 when you collect them.",
    "Tips, tips, how I can forget these tips...",
    "What lacks in luck makes up for it with determination.",
    "Here's a 4-leaf clover to wish you good luck finding rare ores: 🍀",
    "The Snail Mining Company called&mdash;they wanted their auto-miners back.",
    "This game is <code>alert</code> free!",
]

export function update(window) {
}