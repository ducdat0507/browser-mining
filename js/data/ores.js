
let ores;
export default ores = {
    "stone": {
        name: "Stone",
        map: ["basic", 0, 0],
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
    console.log(ore, ores[ore].rarity, ores[ore].tier)
}