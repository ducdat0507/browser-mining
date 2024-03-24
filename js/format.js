
function format(number, precision = 0) {
    return (+number).toLocaleString("en-US", {
        minimumFractionDigits: precision,
        maximumFractionDigits: precision,
    })
}

format.key = function (key) {
    let rep = {
        " ": "Space"
    }
    if (rep[key]) return rep[key];
    return (key + "").toUpperCase();
}

export default format;