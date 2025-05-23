document.querySelector("#flag").onclick = copy;

let flags = {
    trans: [
        "#5BCFFB",
        "#F5ABB9",
        "#FFFFFF",
        "#F5ABB9",
        "#5BCFFB"
    ],
    lesbian: [
        "#D62800",
        "#FF9B56",
        "#FFFFFF",
        "#D462A6",
        "#A40062"
    ],
    bisexual: [
        "#D60270",
        "#D60270",
        "#9B4F96",
        "#0038A8",
        "#0038A8"
    ],
    aromantic: [
        "#3BA740",
        "#A8D47A",
        "#FFFFFF",
        "#ABABAB",
        "#000000"
    ],
    genderfluid: [
        "#FE76A2",
        "#FFFFFF",
        "#BF12D7",
        "#000000",
        "#303CBE"
    ]
}


function copy() {
    html2canvas(document.querySelector("#capture")).then(canvas => {
        canvas.toBlob(blob => navigator.clipboard.write([new ClipboardItem({ 'image/png': blob })]))
    });
}

function buildFlag(leftFlag, rightFlag) {
    document.querySelector("#flag").innerHTML = ""
    for (let i = 0; i < lcm(leftFlag.length, rightFlag.length); i++) {
        document.querySelector("#flag").append(`<div class="stripe" style="background: inear-gradient(in oklab 90deg, ${leftFlag[i / leftFlag.length]} 20%, ${rightFlag[i / rightFlag.length]} 80%);">`)
    }
}

buildFlag(flags.trans, flags.lesbian);


function gcd(a, b) {
    for (let temp = b; b !== 0;) {
        b = a % b;
        a = temp;
        temp = b;
    }
    return a;
}

function lcm(a, b) {
    const gcdValue = gcd(a, b);
    return (a * b) / gcdValue;
}