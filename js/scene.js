import * as _3 from "three";
import * as save from "./save.js";
import * as input from "./input.js";
import ores from "./data/ores.js";
import picks from "./data/picks.js";
import { viewCamera, currentBlock } from "./renderer.js";

export let playerPos = new _3.Vector3(0.5, -2, 0.5);
export let playerVel = new _3.Vector3(0, 0, 0);
export let isGrounded = false;
export const chunkSize = 16;
export let gravity = 9.8 * 3;
export let mine = {};
export let mineCapValue = 0;
export let mineCapMax = 1000000;

export function getBlock(pos) {
    let chunk = getChunkID(pos);
    if (!mine[chunk]) return undefined;
    let subpos = getChunkSubpos(pos);
    return mine[chunk][subpos];
}

export function setBlock(pos, data) {
    let chunk = getChunkID(pos);
    if (!mine[chunk]) mine[chunk] = {}
    let subpos = getChunkSubpos(pos);
    mineCapValue -= getCap(mine[chunk][subpos]);
    mine[chunk][subpos] = data;
    mineCapValue += getCap(mine[chunk][subpos]);
    mine[chunk].dirty = true;
}

export function getChunk(pos) {
    let chunk = getChunkID(pos);
    return mine[chunk];
}

export function getChunkID(pos) {
    return Math.floor(pos.x / chunkSize) + "x" + Math.floor(pos.y / chunkSize) + "x" + Math.floor(pos.z / chunkSize);
}
export function getChunkSubpos(pos) {
    return _3.MathUtils.euclideanModulo(pos.x, chunkSize) + 
        _3.MathUtils.euclideanModulo(pos.y, chunkSize) * chunkSize + 
        _3.MathUtils.euclideanModulo(pos.z, chunkSize) * chunkSize * chunkSize;
}


export function resetMine() {
    for (let id in mine) delete mine[id];
    for (let x = -5; x <= 5; x++)
    for (let y = -2; y <= 0; y++)
    for (let z = -5; z <= 5; z++)
        mineAt(new _3.Vector3(x, y, z), false);
}

export function mineAt(pos, drops = true) {
    let block = getBlock(pos);
    if (block?.type == "barrier") return;
    if (drops) {
        if (block) {
            save.data.inv.normal[block.type] ??= 0
            save.data.inv.normal[block.type]++;
            save.setDirty();
        }
        save.data.stats.blockMined++;
    }
    setBlock(pos, null)
    for (let face in faces) {
        let add = new _3.Vector3(faces[face][0], faces[face][1], faces[face][2])
        add.add(pos);
        if (getBlock(add) === undefined && add.y <= 0) setBlock(add, generateOre(add));
    }
}

let oreTower = Object.keys(ores).filter(x => ores[x].rarity).sort((x, y) => ores[y].rarity - ores[x].rarity);
export function generateOre(pos)
{
    if (pos.y < -8000) return {type: "barrier"}

    // Ores
    let rng = Math.random();
    let rngSum = 0;
    function isEligible(ore) {
        return (!ores[ore].range || (-pos.y >= ores[ore].range[0] && -pos.y < ores[ore].range[1]));
    }
    for (let ore of oreTower) {
        if (isEligible(ore)) {
            rngSum += 1 / ores[ore].rarity;
            if (rng < rngSum) return {type: ore}
        }
    }

    // Layer block
    //        0       1000       2000       3000      4000       5000        6000      7000
    let list = ["stone", "bedrock", "diorite", "marble", "granite", "obsidian", "mantle", "magma"];
    return {type: list[_3.MathUtils.clamp(Math.floor(Math.random() * 0.1 - pos.y / 1000 - 0.05), 0, list.length - 1)]}
}

export function getCap(thing) {
    if (thing === null) return 1;
    if (thing) return 20;
    return 0;
}

export let faces = {
    "+x" : [1, 0, 0],
    "-x" : [-1, 0, 0],
    "+y" : [0, 1, 0],
    "-y" : [0, -1, 0],
    "+z" : [0, 0, 1],
    "-z" : [0, 0, -1],
}

export let faceCorners = {
    "-x": [[ 0, 1, 0 ], [ 0, 0, 0 ], [ 0, 1, 1 ], [ 0, 0, 1 ], ],
    "+x": [[ 1, 1, 1 ], [ 1, 0, 1 ], [ 1, 1, 0 ], [ 1, 0, 0 ], ],
    "-y": [[ 1, 0, 1 ], [ 0, 0, 1 ], [ 1, 0, 0 ], [ 0, 0, 0 ], ],
    "+y": [[ 0, 1, 1 ], [ 1, 1, 1 ], [ 0, 1, 0 ], [ 1, 1, 0 ], ],
    "-z": [[ 1, 0, 0 ], [ 0, 0, 0 ], [ 1, 1, 0 ], [ 0, 1, 0 ], ],
    "+z": [[ 0, 0, 1 ], [ 1, 0, 1 ], [ 0, 1, 1 ], [ 1, 1, 1 ], ],
}

export let faceUVs = {
    "-x": [0, 1, 0, 0, 1, 1, 1, 0],
    "+x": [0, 1, 0, 0, 1, 1, 1, 0],
    "-y": [1, 0, 0, 0, 1, 1, 0, 1],
    "+y": [1, 1, 0, 1, 1, 0, 0, 0],
    "-z": [0, 0, 1, 0, 0, 1, 1, 1],
    "+z": [0, 0, 1, 0, 0, 1, 1, 1],
}

export function raycast(start, end) {
    let dx = end.x - start.x;
    let dy = end.y - start.y;
    let dz = end.z - start.z;
    const lenSq = dx * dx + dy * dy + dz * dz;
    const len = Math.sqrt( lenSq );

    dx /= len;
    dy /= len;
    dz /= len;

    let t = 0.0;
    let ix = Math.floor( start.x );
    let iy = Math.floor( start.y );
    let iz = Math.floor( start.z );

    const stepX = ( dx > 0 ) ? 1 : -1;
    const stepY = ( dy > 0 ) ? 1 : -1;
    const stepZ = ( dz > 0 ) ? 1 : -1;

    const txDelta = Math.abs( 1 / dx );
    const tyDelta = Math.abs( 1 / dy );
    const tzDelta = Math.abs( 1 / dz );

    const xDist = ( stepX > 0 ) ? ( ix + 1 - start.x ) : ( start.x - ix );
    const yDist = ( stepY > 0 ) ? ( iy + 1 - start.y ) : ( start.y - iy );
    const zDist = ( stepZ > 0 ) ? ( iz + 1 - start.z ) : ( start.z - iz );

    // location of nearest voxel boundary, in units of t
    let txMax = ( txDelta < Infinity ) ? txDelta * xDist : Infinity;
    let tyMax = ( tyDelta < Infinity ) ? tyDelta * yDist : Infinity;
    let tzMax = ( tzDelta < Infinity ) ? tzDelta * zDist : Infinity;

    let steppedIndex = -1;

    // main loop along raycast vector
    while ( t <= len ) {

        const block = getBlock(new _3.Vector3(ix, iy, iz));
        if (block) {
            return {
                hitPos: new _3.Vector3(
                    start.x + t * dx,
                    start.y + t * dy,
                    start.z + t * dz,
                ),
                normal: new _3.Vector3(
                    steppedIndex === 0 ? - stepX : 0,
                    steppedIndex === 1 ? - stepY : 0,
                    steppedIndex === 2 ? - stepZ : 0,
                ),
                blockPos: new _3.Vector3(ix, iy, iz),
                block,
            };
        }

        // advance t to next nearest voxel boundary
        if ( txMax < tyMax ) {
            if ( txMax < tzMax ) {
                ix += stepX;
                t = txMax;
                txMax += txDelta;
                steppedIndex = 0;
            } else {
                iz += stepZ;
                t = tzMax;
                tzMax += tzDelta;
                steppedIndex = 2;
            }
        } else {
            if ( tyMax < tzMax ) {
                iy += stepY;
                t = tyMax;
                tyMax += tyDelta;
                steppedIndex = 1;
            } else {
                iz += stepZ;
                t = tzMax;
                tzMax += tzDelta;
                steppedIndex = 2;
            }

        }

    }

    return null;
}

export function doPhysics(delta) {
    const playerWidth = 0.3;
    const playerHeight = 1.8;

    // Get y velocity
    playerVel.y -= gravity * delta;
    if (isGrounded && input.isJumping) {
        playerVel.y = 10;
    }

    // Move y
    let drop = playerVel.y * delta;
    let maxY = Math.min(Infinity * Math.sign(drop), -0.6);
    let startOfs = drop > 0 ? playerHeight : 0;
    for (let a = 0; a < 4; a++) {
        let start = new _3.Vector3(), end = new _3.Vector3();
        start.copy(playerPos).add(new _3.Vector3(
            (faceUVs["+x"][a * 2] * 2 - 1) * playerWidth * .98,
            startOfs,
            (faceUVs["+x"][a * 2 + 1] * 2 - 1) * playerWidth * .98
        ));
        end.copy(start).add(new _3.Vector3(0, drop, 0));
        let intersect = raycast(start, end);
        if (intersect) {
            intersect.hitPos.y -= startOfs;
            if ((intersect.hitPos.y - maxY) * Math.sign(drop) < 0) {
                maxY = intersect.hitPos.y;
            }
        }
    }
    if ((playerPos.y + drop - maxY) * Math.sign(drop) > 0) {
        isGrounded = Math.sign(drop) < 0;
        drop = maxY - playerPos.y ;
        playerVel.y = 0;
    } else {
        isGrounded = false;
    }
    playerPos.y += drop;
    
    // Get x-z velocity
    let moveVel = new _3.Vector3(input.targetSpeed[0], 0, input.targetSpeed[1]);
    moveVel.applyEuler(new _3.Euler(0, viewCamera.rotation.y, 0)).normalize().multiplyScalar(-8);
    let friction = delta * 50;
    let moveDelta = new _3.Vector3(
        moveVel.x - playerVel.x,
        0,
        moveVel.z - playerVel.z
    )
    let length = moveDelta.length();
    if (length > friction) moveDelta.normalize().multiplyScalar(friction);
    playerVel.add(moveDelta);
    
    let uvs = [0, .99, 0.5, .99, 1, .99, 0, -.99, 0.5, -.99, 1, -.99];
    
    // Move x
    if (playerVel.x) {
        let move = playerVel.x * delta;
        let maxX = Infinity * Math.sign(move);
        let startOfs = move > 0 ? playerWidth : -playerWidth;
        for (let a = 0; a < uvs.length; a += 2) {
            let start = new _3.Vector3(), end = new _3.Vector3();
            start.copy(playerPos).add(new _3.Vector3(
                startOfs,
                uvs[a] * playerHeight,
                uvs[a + 1] * playerWidth,
            ));
            end.copy(start).add(new _3.Vector3(move, 0, 0));
            let intersect = raycast(start, end);
            if (intersect) {
                intersect.hitPos.x -= startOfs;
                if ((intersect.hitPos.x - maxX) * Math.sign(move) < 0) {
                    maxX = intersect.hitPos.x;
                }
            }
        }
        if ((playerPos.x + move - maxX) * Math.sign(move) > 0) {
            move = maxX - playerPos.x;
            playerVel.x = 0;
        }
        playerPos.x += move;
    }
    // Move z
    if (playerVel.z) {
        let move = playerVel.z * delta;
        let maxZ = Infinity * Math.sign(move);
        let startOfs = move > 0 ? playerWidth : -playerWidth;
        for (let a = 0; a < uvs.length; a += 2) {
            let start = new _3.Vector3(), end = new _3.Vector3();
            start.copy(playerPos).add(new _3.Vector3(
                uvs[a + 1] * playerWidth,
                uvs[a] * playerHeight,
                startOfs
            ));
            end.copy(start).add(new _3.Vector3(0, 0, move));
            let intersect = raycast(start, end);
            if (intersect) {
                intersect.hitPos.z -= startOfs;
                if ((intersect.hitPos.z - maxZ) * Math.sign(move) < 0) {
                    maxZ = intersect.hitPos.z;
                }
            }
        }
        if ((playerPos.z + move - maxZ) * Math.sign(move) > 0) {
            move = maxZ - playerPos.z;
            playerVel.z = 0;
        }
        playerPos.z += move;
    }
}

export function usePickaxe() {
    if (currentBlock) {
        mineAt(currentBlock.blockPos);
        rollAbilities(picks[save.data.loadout.pick], currentBlock);
    }
}

export function rollAbilities(item, block) {
    for (let ability of item.abilities) {
        if (ability.procChance && Math.random() < 1 / ability.procChance) {
            ability.trigger(block);
        }
    }
}

export function teleportToDepth(depth) {
    for (let x = -1; x <= 1; x++)
    for (let y = 0; y <= 2; y++)
    for (let z = -1; z <= 1; z++)
        mineAt(new _3.Vector3(x, y - depth, z), false);
    playerPos = new _3.Vector3(0.5, -depth, 0.5);
    console.log("teleporting to pos", depth);
}

resetMine();