import * as _3 from 'three'
import * as scene from './scene.js'
import * as input from './input.js'
import * as save from './save.js'
import { res } from './resources.js'
import ores from './data/ores.js'
import maps from './data/texmaps.js'

let viewCanvas, viewRenderer, viewScene, viewCursor;
export let viewCamera;
let viewMeshes = {}, materials = {}

export let currentBlock;

export let isReady = false;

export function initView() {  
    viewCanvas = document.getElementById("view-canvas");
    viewRenderer = new _3.WebGLRenderer({
        antialias: save.data.opt.antialias, 
        canvas: viewCanvas
    });
    viewCamera = new _3.PerspectiveCamera(
        75, 
        viewCanvas.clientWidth / viewCanvas.clientHeight, 
        0.01,
        300
    );
    viewCamera.rotation.set(Math.PI * 0.15, Math.PI * -0.25, 0, "ZYX");
    viewScene = new _3.Scene();

    const light = new _3.DirectionalLight(0xffffff, 3);
    light.position.set(-2, 8, 4);
    light.castShadow = true;
    viewScene.add(light);

    const light2 = new _3.AmbientLight(0xffffff, 1);
    viewScene.add(light2);

    for (let mat in maps) materials[mat] = maps[mat].get();

    {
        const geometry = new _3.BoxGeometry(1.0001, 1.0001, 1.0001);

        const wireframe = new _3.EdgesGeometry( geometry );

        const material = new _3.LineBasicMaterial ({
            color: 0xFFFFFF,
            linewidth: 5,
        })

        viewCursor = new _3.LineSegments( wireframe, material );
        viewCursor.material.depthTest = true;
        viewCursor.material.opacity = 1;
        viewCursor.material.transparent = true;
        viewScene.add(viewCursor);
    }

    isReady = true;
}

export function moveCamera(x, y) {
    let invert = save.data.opt.invertMouse;
    let sense = 250 / save.data.opt.mouseSensitivity;
    viewCamera.rotation.x = Math.max(Math.min(viewCamera.rotation.x + y / sense * (1 - invert[1] * 2), Math.PI * 0.45), -Math.PI * 0.4);
    viewCamera.rotation.y += x / sense * (1 - invert[0] * 2);
}

let width = 0, height = 0, realWidth = 0, realHeight = 0;

export function updateView() { 
    // Resizing the canvas
    if (width != viewCanvas.clientWidth || height != viewCanvas.clientHeight) {
        width = viewCanvas.width = (realWidth = viewCanvas.clientWidth) * window.devicePixelRatio;
        height = viewCanvas.height = (realHeight = viewCanvas.clientHeight) * window.devicePixelRatio;
        viewCamera.aspect = width / height;
        viewCamera.updateProjectionMatrix();
        viewRenderer.setSize(width, height, false);
    }
    
    // Updating the scene
    for (let id in viewMeshes) viewMeshes[id].active = false;

    let offset = [
        Math.floor(scene.playerPos.x / scene.chunkSize),
        Math.floor(scene.playerPos.y / scene.chunkSize),
        Math.floor(scene.playerPos.z / scene.chunkSize)
    ]

    for (let x = -6 + offset[0]; x <= 6 + offset[0]; x++)
    for (let y = -6 + offset[1]; y <= 6 + offset[1]; y++)
    for (let z = -6 + offset[2]; z <= 6 + offset[2]; z++) {
        let chunk;
        let pos = new _3.Vector3(x, y, z);
        let id = x + "x" + y + "x" + z;
        if (chunk = scene.mine[id]) {
            if (chunk.dirty || !viewMeshes[id]) {
                if (viewMeshes[id]) {
                    viewScene.remove(viewMeshes[id].mesh);
                } else {
                    viewMeshes[id] = {
                        geometry: new _3.BufferGeometry()
                    };
                }
                let data = getChunkGeometryData(pos, chunk);
                let positions, normals, indices, uvs;
                
                let matList = [];
                viewMeshes[id].geometry.clearGroups();
                let index = 0;
                for (let group in data.groups) {
                    let start = (indices?.length ?? 0);
                    let len = data.groups[group].indices.length;
                    if (!positions) {
                        positions = data.groups[group].positions;
                        normals = data.groups[group].normals;
                        indices = data.groups[group].indices;
                        uvs = data.groups[group].uvs;
                    } else {
                        let indexOffset = positions.length / 3;
                        indices.push(...data.groups[group].indices.map(x => x + indexOffset));
                        positions.push(...data.groups[group].positions);
                        normals.push(...data.groups[group].normals);
                        uvs.push(...data.groups[group].uvs);
                    }
                    viewMeshes[id].geometry.addGroup(start, len, index);
                    matList.push(materials[group])
                    index++;
                }
                viewMeshes[id].geometry.setAttribute('position',
                    new _3.BufferAttribute(new Float32Array(positions), 3)
                );
                viewMeshes[id].geometry.setAttribute('normal',
                    new _3.BufferAttribute(new Float32Array(normals), 3)
                );
                viewMeshes[id].geometry.setAttribute('uv',
                    new _3.BufferAttribute(new Float32Array(uvs), 2)
                );
                viewMeshes[id].geometry.setIndex(indices);
                viewMeshes[id].geometry.computeBoundingSphere();

                viewMeshes[id].mesh = new _3.Mesh(viewMeshes[id].geometry, matList);
                viewMeshes[id].frustumCulled = false;
                viewMeshes[id].mesh.position.set(x * scene.chunkSize, y * scene.chunkSize, z * scene.chunkSize);
                viewScene.add(viewMeshes[id].mesh);
                chunk.dirty = false;
            }
            if (viewMeshes[id]) viewMeshes[id].active = true;
        } 
    }
    
    for (let id in viewMeshes) if (!viewMeshes[id].active) {
        viewScene.remove(viewMeshes[id].mesh);
        viewMeshes[id].geometry.dispose();
        delete viewMeshes[id];
    }

    // Camera thingy
    viewCamera.position.copy(scene.playerPos);
    viewCamera.position.y += 1.6;

    // Get currently highlighted block
    updateHighlightedBlock();

    if (currentBlock) {
        viewCursor.position.copy(currentBlock.blockPos);
        viewCursor.position.add(new _3.Vector3(0.5, 0.5, 0.5));
    } else {
        viewCursor.position.set(NaN, NaN, NaN);
    }

    viewRenderer.render(viewScene, viewCamera);
}

export function updateHighlightedBlock() {
    if (input.mouseIn) {
        let start = new _3.Vector3(), end = new _3.Vector3();
        start.setFromMatrixPosition(viewCamera.matrixWorld);
        end.set(input.mouseX / realWidth * 2 - 1, input.mouseY / realHeight * -2 + 1, 1).unproject(viewCamera);
        currentBlock = scene.raycast(start, end);
        if (currentBlock) {
            
        }
    } else {
        currentBlock = null;
    }
}

function getChunkGeometryData(chunkPos, chunk) {
    let data = {groups: {}};
    let counter = 0;

    for (let x = 0; x < scene.chunkSize; x++)
    for (let y = 0; y < scene.chunkSize; y++)
    for (let z = 0; z < scene.chunkSize; z++) {
        let pos = x + y * scene.chunkSize + z * scene.chunkSize * scene.chunkSize;
        let max = scene.chunkSize * scene.chunkSize * scene.chunkSize;
        let map;
        if (chunk[pos] && (map = ores[chunk[pos].type].map)) {
            if (!data.groups[map[0]]) {
                data.groups[map[0]] = { positions: [], normals: [], indices: [], uvs: [] }
            }
            let { positions, normals, indices, uvs } = data.groups[map[0]];
            for (let faceID in scene.faces) {
                let face = scene.faces[faceID];
                let facePos = 
                    x + face[0] +  
                    (y + face[1]) * scene.chunkSize +
                    (z + face[2]) * scene.chunkSize * scene.chunkSize;
                if (facePos < 0 || facePos >= max || !chunk[facePos] || !ores[chunk[facePos].type].map) {
                    const ndx = positions.length / 3;
                    for (let corner of scene.faceCorners[faceID]) {
                        positions.push(corner[0] + x, corner[1] + y, corner[2] + z);
                        normals.push(...face);
                    }
                    indices.push(
                        ndx, ndx + 1, ndx + 2,
                        ndx + 2, ndx + 1, ndx + 3,
                    );
                    for (let a = 0; a < 8; a += 2) {
                        uvs.push(
                            (map[2] + scene.faceUVs[faceID][a]) / maps[map[0]].rows,
                            1 - (map[1] + scene.faceUVs[faceID][a + 1]) / maps[map[0]].cols
                        );
                    }
                    counter++;
                }
            }
        }
    }
    return data;
}
