
function format(number, precision = 0) {
    return (+number).toLocaleString("en-US", {
        minimumFractionDigits: precision,
        maximumFractionDigits: precision,
    })
}

export default format;