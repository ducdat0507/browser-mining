
let ores;
export default ores = {
    // -------------------------------------------------- Barrier
    "barrier": {
        name: "Barrier",
        map: ["basic", 3, 2],
    },
    // -------------------------------------------------- Layer ores
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
    // -------------------------------------------------- Common
    "clay": {
        name: "Clay",
        rarity: 25,
        range: [0, 1000],
        map: ["basic", 1, 1],
    },
    "coal": {
        name: "Coal",
        rarity: 30,
        range: [0, 3000],
        map: ["basic", 1, 0],
    },
    "tin": {
        name: "Tin",
        rarity: 70,
        range: [0, 2000],
        map: ["basic", 0, 1],
    },
    "copper": {
        name: "Copper",
        rarity: 100,
        range: [0, 4000],
        map: ["wip", 0, 0],
    },
    "iron": {
        name: "Iron",
        rarity: 120,
        range: [1000, 5000],
        map: ["wip", 0, 0],
    },
    "steel": {
        name: "Steel",
        rarity: 200,
        range: [2000, 5000],
        map: ["wip", 0, 0],
    },
    "inox": {
        name: "Inox",
        rarity: 300,
        range: [3000, 5000],
        map: ["wip", 0, 0],
    },
    "gold": {
        name: "Gold",
        rarity: 500,
        range: [4000, 8000],
        map: ["wip", 0, 0],
    },
    "charcoal": {
        name: "Charcoal",
        rarity: 600,
        range: [1000, 3000],
        map: ["wip", 0, 0],
    },
    // -------------------------------------------------- Uncommon
    "diamond": {
        name: "Diamond",
        rarity: 1_200,
        range: [4000, 6000],
        map: ["wip", 0, 0],
    },
    "emerald": {
        name: "Emerald",
        rarity: 1_600,
        range: [5000, 6000],
        map: ["wip", 0, 0],
    },
    "pyrite": {
        name: "Pyrite",
        rarity: 2_121,
        range: [4000, 8000],
        map: ["wip", 0, 0],
    },
    "pet_wood": {
        name: "Petrified Wood",
        rarity: 2_600,
        range: [0, 2000],
        map: ["wip", 0, 0],
    },
    "solarite": {
        name: "Solarite",
        rarity: 3_330,
        range: [6000, 8000],
        map: ["wip", 0, 0],
    },
    "lunarite": {
        name: "Lunarite",
        rarity: 3_330,
        range: [4000, 6000],
        map: ["wip", 0, 0],
    },
    // -------------------------------------------------- Rare
    "black_dia": {
        name: "Black Diamond",
        rarity: 24_000,
        range: [5000, 6000],
        map: ["wip", 0, 0],
    },
    // -------------------------------------------------- Scarce
    "uranium": {
        name: "Uranium",
        rarity: 92_000,
        range: [6000, 8000],
        map: ["wip", 0, 0],
    },
    // -------------------------------------------------- Exotic
    "berrylite": {
        name: "Berrylite",
        rarity: 490_122,
        range: [4000, 6000],
        map: ["wip", 0, 0],
    },
    // -------------------------------------------------- Mythical
    "ragnarock": {
        name: "Ragnarock",
        rarity: 9_250_360,
        range: [6000, 8000],
        map: ["wip", 0, 0],
    },
}

export let tiers = [
    {
        from: 1,
        name: "Common"
    },
    {
        from: 1_000,
        name: "Uncommon"
    },
    {
        from: 15_000,
        name: "Rare"
    },
    {
        from: 40_000,
        name: "Scarce"
    },
    {
        from: 120_000,
        name: "Exotic"
    },
    {
        from: 500_000,
        name: "Marvellous"
    },
    {
        from: 1_000_000,
        name: "Legendary"
    },
    {
        from: 7_500_000,
        name: "Mythical"
    },
    {
        from: 20_000_000,
        name: "Enigmatic"
    },
    {
        from: 80_000_000,
        name: "Celestial"
    },
    {
        from: 250_000_000,
        name: "Otherworldly"
    },
    {
        from: 750_000_000,
        name: "Unfathomable"
    },
]

for (let ore in ores) {
    if (ores[ore].rarity) ores[ore].tier = tiers.findLastIndex(x => (x.from <= ores[ore].rarity));
    else ores[ore].tier = -1;
    console.log(ore, ores[ore].rarity, ores[ore].tier)
}