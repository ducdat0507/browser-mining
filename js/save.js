export let data = {}

export function init() {
    data = getStartPlayer();
}

function getStartPlayer() {
    return {
        stats: {
            blockMined: 0,
        }
    }
}