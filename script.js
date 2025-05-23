document.querySelector("#flag").onclick = copy;

let flagDimensions = [1360, 480]

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
    enby: [
        "#FCF434",
        "#FFFFFF",
        "#9C59D1",
        "#2C2C2C"
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
    html2canvas(document.querySelector("#flag")).then(canvas => {
        canvas.toBlob(blob => navigator.clipboard.write([new ClipboardItem({ 'image/png': blob })]))
    });
}

function buildFlag(leftFlag, rightFlag) {
    document.querySelector("#flag").innerHTML = ""
    let numStripes = lcm(leftFlag.length, rightFlag.length);
    for (let i = 0; i < numStripes; i++) {
        document.querySelector("#flag").innerHTML += `<div 
        class="stripe" 
        style="width:${flagDimensions[0]}px;
        height:${flagDimensions[1] / numStripes}px;
        background: linear-gradient(in oklab 90deg, 
            ${leftFlag[Math.floor(leftFlag.length * (i / numStripes))]} 20%,
            ${rightFlag[Math.floor(rightFlag.length * (i / numStripes))]} 80%
            );"></div>`;
    }
}

buildFlag(flags.trans, flags.enby);


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