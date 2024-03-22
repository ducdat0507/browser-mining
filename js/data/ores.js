
let ores;
export default ores = {
    "stone": {
        name: "Stone",
        map: ["basic", 0, 0],
    },
    "bedrock": {
        name: "Bedrock",
        map: ["basic", 0, 2],
    },
    "diorite": {
        name: "Diorite",
        map: ["basic", 1, 2],
    },
    "marble": {
        name: "Marble",
        map: ["basic", 2, 2],
    },
    "granite": {
        name: "Granite",
        map: ["basic", 2, 1],
    },
    "obsidian": {
        name: "Obsidian",
        map: ["basic", 2, 0],
    },
    "mantle": {
        name: "Mantle",
        map: ["basic", 3, 0],
    },
    "magma": {
        name: "Magma",
        map: ["basic", 3, 1],
    },
    "barrier": {
        name: "Barrier",
        map: ["basic", 3, 2],
    },
    "coal": {
        name: "Coal",
        rarity: 30,
        map: ["basic", 1, 0],
    },
    "clay": {
        name: "Clay",
        rarity: 40,
        map: ["basic", 1, 1],
    },
    "tin": {
        name: "Tin",
        rarity: 80,
        map: ["basic", 0, 1],
    }
}

export let tiers = [
    {
        from: 1,
        name: "Common"
    },
    {
        from: 1000,
        name: "Uncommon"
    },
]

for (let ore in ores) {
    if (ores[ore].rarity) ores[ore].tier = tiers.findLastIndex(x => (x.from <= ores[ore].rarity));
    else ores[ore].tier = -1;
    // console.log(ore, ores[ore].rarity, ores[ore].tier)
}