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
        rows: 2,
        cols: 2,
    }
}