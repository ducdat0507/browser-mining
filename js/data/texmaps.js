import { res } from "../resources.js";
import * as _3 from "three";

export default {
    "basic": {
        get() {
            return new _3.MeshLambertMaterial({ 
                map: res.textures.basic,
                side: _3.DoubleSide,
                transparent: true,
                flatShading: true,
            });
        },
        rows: 4,
        cols: 4,
    },
    "wip": {
        get() {
            return new _3.MeshBasicMaterial({ 
                map: res.textures.wip,
                side: _3.DoubleSide,
                transparent: true,
                flatShading: true,
            });
        },
        rows: 1,
        cols: 1,
    },
}