import { currentBlock, updateHighlightedBlock } from "../renderer.js"
import { mineAt } from "../scene.js";
import ores from "./ores.js";
import * as save from "../save.js";

import * as _3 from "three";

export default {
    "default": {
        name: "Default Pickaxe",
        tier: -1,
        desc: "The pickaxe that you start with. Despite having no special abilities, it has been with you for the entirety of your mining journey.",
        abilities: [],
        recipe: {},
    },
    "tin": {
        name: "Tin Scythe",
        tier: 0,
        desc: "Being only slightly better than the default pickaxe, this thing is a little bit more efficient at mining and extracting ores from the ground.",
        abilities: [
            {
                name: "Double Mine",
                desc: "Mine a second block at the direction of the cursor.",
                procChance: 4,
                trigger() {
                    updateHighlightedBlock();
                    if (currentBlock) mineAt(currentBlock.blockPos);
                }
            },
            {
                name: "Double Ore",
                desc: "Duplicate a Rare or below ore (Layer blocks do not count).",
                procChance: 10,
                trigger(block) {
                    let ore = block.block.type;
                    let rarity = ores[ore].tier
                    if (rarity >= 0 && rarity <= 2) save.data.inv.normal[ore]++;
                }
            },
        ],
        recipe: {
            "wood": 1,
            "tin": 50,
            "coal": 100,
            "stone": 1500,
        },
    },
    "gun": {
        name: "Mining Gun",
        tier: 1,
        desc: "Do you know you can use guns to mine? Anyways, blocks have a chance to explode when you mine with it.",
        abilities: [
            {
                name: "Blockplosion",
                desc: "Creates a 3x3x3 explosion around the block being mined.",
                procChance: 27,
                trigger(block) {
                    let pos = block.blockPos;
                    for (x = pos.x - 1; x <= pos.x + 1; x++)
                    for (y = pos.y - 1; y <= pos.y + 1; y++)
                    for (z = pos.z - 1; z <= pos.z + 1; z++) {
                        mineAt(new _3.Vector3(x, y, z));
                    }
                }
            },
        ],
        recipe: {
            "gunpowder": 1,
            "flint": 3,
            "pack_oil": 6,
            "charcoal": 20,
            "iron": 180,
            "copper": 200,
            "coal": 500,
            "bedrock": 10000,
            "stone": 10000,
        },
    },
}
