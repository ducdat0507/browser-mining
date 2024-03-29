
let ores;
export default ores = {
    // -------------------------------------------------- Barrier
    "barrier": {
        name: "Barrier",
        map: ["basic", 3, 2],
        unobtainable: true,
    },
    // -------------------------------------------------- Layer ores
    "stone": {
        name: "Stone",
        map: ["basic", 0, 0],
        range: [0, 1050],
    },
    "bedrock": {
        name: "Bedrock",
        map: ["basic", 0, 2],
        range: [951, 2050],
    },
    "diorite": {
        name: "Diorite",
        map: ["basic", 1, 2],
        range: [1951, 3050],
    },
    "marble": {
        name: "Marble",
        map: ["basic", 2, 2],
        range: [2951, 4050],
    },
    "granite": {
        name: "Granite",
        map: ["basic", 2, 1],
        range: [3951, 5050],
    },
    "obsidian": {
        name: "Obsidian",
        map: ["basic", 2, 0],
        range: [4951, 6050],
    },
    "mantle": {
        name: "Mantle",
        map: ["basic", 3, 0],
        range: [5951, 7050],
    },
    "magma": {
        name: "Magma",
        map: ["basic", 3, 1],
        range: [6951, 8000],
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
    "glass": {
        name: "Glass",
        rarity: 160,
        range: [6000, 8000],
        map: ["wip", 0, 0],
    },
    "steel": {
        name: "Steel",
        rarity: 200,
        range: [2000, 6000],
        map: ["wip", 0, 0],
    },
    "inox": {
        name: "Inox",
        rarity: 300,
        range: [3000, 6000],
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
    "lithium": {
        name: "Lithium",
        rarity: 800,
        range: [1000, 4000],
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
    "ruby": {
        name: "Ruby",
        rarity: 2_200,
        range: [6000, 8000],
        map: ["wip", 0, 0],
    },
    "wood": {
        name: "Wood",
        rarity: 2_600,
        range: [0, 1000],
        map: ["wip", 0, 0],
    },
    "amethyst": {
        name: "Amethyst",
        rarity: 3_500,
        range: [4000, 5000],
        map: ["wip", 0, 0],
    },
    "pearl": {
        name: "Pearl",
        rarity: 5_000,
        range: [2000, 4000],
        map: ["wip", 0, 0],
    },
    "opal": {
        name: "Opal",
        rarity: 6_000,
        range: [3000, 4000],
        map: ["wip", 0, 0],
    },
    "pack_oil": {
        name: "Packed Oil",
        rarity: 7_777,
        range: [1000, 2000],
        map: ["wip", 0, 0],
    },
    "garnet": {
        name: "Garnet",
        rarity: 10_000,
        range: [6000, 8000],
        map: ["wip", 0, 0],
    },
    "bone_meal": {
        name: "Bone Meal",
        rarity: 12_000,
        range: [0, 2000],
        map: ["wip", 0, 0],
    },
    // -------------------------------------------------- Rare
    "flint": {
        name: "Flint",
        rarity: 18_000,
        range: [1000, 2000],
        map: ["wip", 0, 0],
    },
    "black_dia": {
        name: "Black Diamond",
        rarity: 24_000,
        range: [5000, 6000],
        map: ["wip", 0, 0],
    },
    "fossil": {
        name: "Fossil",
        rarity: 25_000,
        range: [4000, 5000],
        map: ["wip", 0, 0],
    },
    "pet_wood": {
        name: "Petrified Wood",
        rarity: 26_000,
        range: [1000, 2000],
        map: ["wip", 0, 0],
    },
    "plastic": {
        name: "Plastic",
        rarity: 30_000,
        range: [0, 1000],
        map: ["wip", 0, 0],
    },
    "plasma": {
        name: "Plasma",
        rarity: 30_000,
        range: [7000, 8000],
        map: ["wip", 0, 0],
    },
    "abacile": {
        name: "Abacile",
        rarity: 32_000,
        range: [3000, 4000],
        map: ["wip", 0, 0],
    },
    "solarite": {
        name: "Solarite",
        rarity: 33_330,
        range: [6000, 7000],
        map: ["wip", 0, 0],
    },
    "lunarite": {
        name: "Lunarite",
        rarity: 33_330,
        range: [5000, 6000],
        map: ["wip", 0, 0],
    },
    "crystalline": {
        name: "Crystalline",
        rarity: 36_000,
        range: [5000, 6000],
        map: ["wip", 0, 0],
    },
    "silicon": {
        name: "Silicon",
        rarity: 37_500,
        range: [2000, 3000],
        map: ["wip", 0, 0],
    },
    // -------------------------------------------------- Scarce
    "gunpowder": {
        name: "Gunpowder",
        rarity: 42_000,
        range: [0, 4000],
        map: ["wip", 0, 0],
    },
    "charge": {
        name: "Earth Charge",
        rarity: 55_555,
        range: [2000, 6000],
        map: ["wip", 0, 0],
    },
    "mythril": {
        name: "Mythril",
        rarity: 60_000,
        range: [1000, 2000],
        map: ["wip", 0, 0],
    },
    "radium": {
        name: "Radium",
        rarity: 88_000,
        range: [2000, 5000],
        map: ["wip", 0, 0],
    },
    "uranium": {
        name: "Uranium",
        rarity: 92_000,
        range: [4000, 6000],
        map: ["wip", 0, 0],
    },
    "melodil": {
        name: "Melodil",
        rarity: 100_000,
        map: ["wip", 0, 0],
    },
    "nobelium": {
        name: "Nobelium",
        rarity: 102_000,
        range: [3000, 4000],
        map: ["wip", 0, 0],
    },
    "scorvil": {
        name: "Scorvil",
        rarity: 106_660,
        range: [6000, 8000],
        map: ["wip", 0, 0],
    },
    "cucumberite": {
        name: "Cucumberite",
        rarity: 118_000,
        range: [0, 1000],
        map: ["wip", 0, 0],
    },
    // -------------------------------------------------- Exotic
    "viridium": {
        name: "Viridium",
        rarity: 140_000,
        range: [3000, 4000],
        map: ["wip", 0, 0],
    },
    "monil": {
        name: "Monil",
        rarity: 177_777,
        range: [0, 2000],
        map: ["wip", 0, 0],
    },
    "kryptonite": {
        name: "Kryptonite",
        rarity: 192_000,
        range: [4000, 6000],
        map: ["wip", 0, 0],
    },
    "prismatine": {
        name: "Prismatine",
        rarity: 250_000,
        range: [3000, 4000],
        map: ["wip", 0, 0],
    },
    "reactivil": {
        name: "Reactivil",
        rarity: 300_000,
        range: [5000, 7000],
        map: ["wip", 0, 0],
    },
    "hydra_crys": {
        name: "Hydra Crystal",
        rarity: 320_000,
        range: [0, 2000],
        map: ["wip", 0, 0],
    },
    "pyro_crys": {
        name: "Pyro Crystal",
        rarity: 330_000,
        range: [6000, 8000],
        map: ["wip", 0, 0],
    },
    "gaia_crys": {
        name: "Gaia Crystal",
        rarity: 340_000,
        range: [4000, 6000],
        map: ["wip", 0, 0],
    },
    "anemoi_crys": {
        name: "Anemoi Crystal",
        rarity: 340_000,
        range: [2000, 4000],
        map: ["wip", 0, 0],
    },
    "berrylite": {
        name: "Berrylite",
        rarity: 490_122,
        range: [3000, 5000],
        map: ["wip", 0, 0],
    },
    // -------------------------------------------------- Marvellous
    "alpha_stone": {
        name: "Alpha Stone",
        rarity: 500_000,
        range: [4000, 5000],
        map: ["wip", 0, 0],
    },
    "devillium": {
        name: "Devilium",
        rarity: 666_666,
        range: [7000, 8000],
        map: ["wip", 0, 0],
    },
    "Greenvil": {
        name: "Greenvil",
        rarity: 777_777,
        range: [0, 2000],
        map: ["wip", 0, 0],
    },
    "fiereyl": {
        name: "Fiereyl",
        rarity: 850_000,
        range: [6000, 7000],
        map: ["wip", 0, 0],
    },
    "angellite": {
        name: "Angelite",
        rarity: 888_888,
        range: [3000, 4000],
        map: ["wip", 0, 0],
    },
    "positivium": {
        name: "Positivium",
        rarity: 910_938,
        range: [2000, 4000],
        map: ["wip", 0, 0],
    },
    "negativium": {
        name: "Negativium",
        rarity: 910_938,
        range: [4000, 6000],
        map: ["wip", 0, 0],
    },
    // -------------------------------------------------- Legendary
    "chromatite": {
        name: "Chromatite",
        rarity: 1_508_000,
        range: [2000, 4000],
        map: ["wip", 0, 0],
    },
    "neutronite": {
        name: "Neutronite",
        rarity: 1_674_927,
        range: [2000, 6000],
        map: ["wip", 0, 0],
    },
    "beta_stone": {
        name: "Beta Stone",
        rarity: 2_000_000,
        range: [4000, 5000],
        map: ["wip", 0, 0],
    },
    "earth_core": {
        name: "Earth's Core",
        rarity: 2_160_000,
        range: [7000, 8000],
        map: ["wip", 0, 0],
    },
    "jinkyl": {
        name: "Jinkyl",
        rarity: 3_777_777,
        range: [0, 2000],
        map: ["wip", 0, 0],
    },
    "antimatter": {
        name: "Antimatter",
        rarity: 5_000_000,
        range: [5000, 7000],
        map: ["wip", 0, 0],
    },
    "beard_treas": {
        name: "Beardy's Treasure",
        rarity: 6_280_000,
        range: [0, 1000],
        map: ["wip", 0, 0],
    },
    // -------------------------------------------------- Mythical
    "ragnarock": {
        name: "Ragnarock",
        rarity: 9_250_360,
        range: [6000, 8000],
        map: ["wip", 0, 0],
    },
    "gamma_stone": {
        name: "Gamma Stone",
        rarity: 10_000_000,
        range: [4000, 5000],
        map: ["wip", 0, 0],
    },
    "mananite": {
        name: "Mananite",
        rarity: 11_235_811,
        range: [1000, 2000],
        map: ["wip", 0, 0],
    },
    "etheril": {
        name: "Etheril",
        rarity: 12_000_000,
        range: [2000, 4000],
        map: ["wip", 0, 0],
    },
    "voidium": {
        name: "Voidium",
        rarity: 16_666_666,
        range: [4000, 6000],
        map: ["wip", 0, 0],
    },
    "naturite": {
        name: "Naturite",
        rarity: 18_360_720,
        range: [0, 2000],
        map: ["wip", 0, 0],
    },
    // -------------------------------------------------- Enigmatic
    "mysticite": {
        name: "Mysticite",
        rarity: 28_135_370,
        map: ["wip", 0, 0],
    },
    "illumina": {
        name: "Illumina",
        rarity: 32_768_000,
        range: [2000, 5000],
        map: ["wip", 0, 0],
    },
    "apocalyne": {
        name: "Apocalyne",
        rarity: 36_666_666,
        range: [5000, 8000],
        map: ["wip", 0, 0],
    },
    "missingno": {
        name: "Missing Ore",
        rarity: 40_404_040,
        map: ["wip", 0, 0],
    },
    "luck_rock": {
        name: "Lucky Rock",
        rarity: 77_777_777,
        map: ["wip", 0, 0],
    },
    // -------------------------------------------------- Celestial
    "millenium": {
        name: "Millenium",
        rarity: 100_000_000,
        map: ["wip", 0, 0],
    },
    "universium": {
        name: "Universium",
        rarity: 180_000_000,
        map: ["wip", 0, 0],
    },
    "intelligite": {
        name: "Intelligite",
        rarity: 213_243_546,
        map: ["wip", 0, 0],
    },
    // -------------------------------------------------- Otherworldly
    "chorostone": {
        name: "Choro Rock",
        rarity: 480_000_000,
        map: ["wip", 0, 0],
    },
    "chronostone": {
        name: "Chronostone",
        rarity: 520_000_000,
        map: ["wip", 0, 0],
    },
    "uni_remains": {
        name: "Last Universe's Remains",
        rarity: 640_000_000,
        map: ["wip", 0, 0],
    },
    // -------------------------------------------------- Unfathomable
    "serendipium": {
        name: "Serendipium",
        rarity: 777_777_777,
        map: ["wip", 0, 0],
    },
    "billium": {
        name: "Billium",
        rarity: 1_000_000_000,
        map: ["wip", 0, 0],
    },
    "neuronium": {
        name: "Neuronium",
        rarity: 1_234_567_890,
        map: ["wip", 0, 0],
    },
}

export let tiers = [
    { // 0
        from: 1,
        name: "Common"
    },
    { // 1
        from: 1_000,
        name: "Uncommon"
    },
    { // 2
        from: 15_000,
        name: "Rare"
    },
    { // 3
        from: 40_000,
        name: "Scarce"
    },
    { // 4
        from: 120_000,
        name: "Exotic"
    },
    { // 5
        from: 500_000,
        name: "Marvellous"
    },
    { // 6
        from: 1_000_000,
        name: "Legendary"
    },
    { // 7
        from: 7_500_000,
        name: "Mythical"
    },
    { // 8
        from: 20_000_000,
        name: "Enigmatic"
    },
    { // 9
        from: 80_000_000,
        name: "Celestial"
    },
    { // 10
        from: 250_000_000,
        name: "Otherworldly"
    },
    { // 11
        from: 750_000_000,
        name: "Unfathomable"
    },
]

for (let ore in ores) {
    if (ores[ore].rarity) ores[ore].tier = tiers.findLastIndex(x => (x.from <= ores[ore].rarity));
    else ores[ore].tier = -1;
}

let table = "";
let ltier = 0;
for (let ore in ores) {
    if (ltier != ores[ore].tier) {
        ltier = ores[ore].tier;
        table += ltier + "\n";
    }
    table += [250, 750, 1250, 1750, 2250, 2750, 3250, 3750, 4250, 4750, 5250, 5750, 6250, 6750, 7250, 7750]
        .map(x => (!ores[ore].range || (x >= ores[ore].range[0] && x <= ores[ore].range[1])) ? "#" : ".").join("") + 
        " " + ores[ore].name + "\n";
}
console.log(table);