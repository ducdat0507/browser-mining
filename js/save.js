export let data = {}

export function init() {
    data = getStartPlayer();
    window.player = data;
}

function getStartPlayer() {
    return {
        inv: {
            normal: {}
        },
        stats: {
            blockMined: 0,
        },
    }
}
