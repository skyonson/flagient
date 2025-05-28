document.querySelector("#flagDisplay").onclick = copy;

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

const flags = {
    agender: {
        displayName:"Agender",
        stripes:[
            "#000000",
            "#B9B9B9",
            "#FFFFFF",
            "#B7F484",
            "#FFFFFF",
            "#B9B9B9",
            "#000000"
        ]
    },
    aromantic: {
        displayName:"Aromantic",
        stripes:[
            "#3BA740",
            "#A8D47A",
            "#FFFFFF",
            "#ABABAB",
            "#000000"
        ]
    },
    asexual: {
        displayName:"Asexual",
        stripes:[
            "#010101",
            "#a0a0a0",
            "#FFFFFF",
            "#9A0678"
        ]
    },
    bigender: {
        displayName:"Bigender",
        stripes:[
            "#C479A0",
            "#ECA6CB",
            "#D5C7E8",
            "#FFFFFF",
            "#D5C7E8",
            "#9AC7E7",
            "#6C83CF"
        ]
    },
    bisexual: {
        displayName:"Bisexual",
        stripes:[
            "#D60270",
            "#D60270",
            "#9B4F96",
            "#0038A8",
            "#0038A8"
        ]
    },
    demigender: {
        displayName:"Demigender",
        stripes:[
            "#7F7F7F",
            "#C3C3C3",
            "#FBFF74",
            "#FFFFFF",
            "#FBFF74",
            "#C3C3C3",
            "#7F7F7F"
        ]
    },
    enby: {
        displayName:"Nonbinary",
        stripes:[
            "#F5EA2A",
            "#FFFFFF",
            "#9A59CF",
            "#2D2D2D"
        ]
    },
    gay: {
        displayName:"Gay",
        stripes:[
            "#078E70",
            "#26CFAA",
            "#98E9C1",
            "#FFFFFF",
            "#7BADE2",
            "#5049CB",
            "#3D1A77"
        ]
    },
    genderfluid: {
        displayName:"Genderfluid",
        stripes:[
            "#FE75A1",
            "#F5F5F5",
            "#BF17D5",
            "#2C2C2C",
            "#323EBC"
        ]
    },
    genderqueer: {
        displayName:"Genderqueer",
        stripes:[
            "#B899DD",
            "#FFFFFF",
            "#6B8E3A"
        ]
    },
    lesbian: {
        displayName:"Lesbian",
        stripes:[
            "#D62C00",
            "#FF9956",
            "#FFFFFF",
            "#D362A4",
            "#A40162"
        ]
    },
    pansexual: {
        displayName:"Pansexual",
        stripes:[
            "#FF218C",
            "#FFD800",
            "#20B2FE"
        ]
    },
    polysexual: {
        displayName:"Polysexual",
        stripes:[
            "#F61CB9",
            "#06D569",
            "#1C92F6"
        ]
    },
    trans: {
        displayName:"Transgender",
        stripes:[
            "#5BCFF9",
            "#F5A8B8",
            "#FFFFFF",
            "#F5A8B8",
            "#5BCFF9"
        ]
    } 
}


function copy() {
    html2canvas(document.querySelector("#flag")).then(canvas => {
        canvas.toBlob(blob => navigator.clipboard.write([new ClipboardItem({ 'image/png': blob })]))
    });
}

function buildStripes(leftFlag, rightFlag) {
    document.querySelector("#flag").innerHTML = ""
    let numStripes = lcm(leftFlag.length, rightFlag.length);
    for (let i = 0; i < numStripes; i++) {
        document.querySelector("#flag").innerHTML += `<div 
        class="stripe" 
        style="background: linear-gradient(in oklab 90deg, 
            var(--leftFlagStripe${Math.floor(leftFlag.length * (i / numStripes))}) var(--leftFlagPercent),
            var(--rightFlagStripe${Math.floor(rightFlag.length * (i / numStripes))}) var(--rightFlagPercent)
            );"></div>`;
    }
    document.querySelector(":root").style.setProperty(`--stripeWidth`, `${document.getElementById("flagWidth").value}px`);
    document.querySelector(":root").style.setProperty(`--stripeHeight`, `${(document.getElementById("flagHeight").value / numStripes) + 3.1}px`);
}

function setColors(leftFlag, rightFlag) {
    let root = document.querySelector(":root");
    leftFlag.forEach((element,index) => {
        root.style.setProperty(`--leftFlagStripe${index}`, element);
    });
    rightFlag.forEach((element,index) => {
        root.style.setProperty(`--rightFlagStripe${index}`, element);
    });
}

function setupFlagLists(flags) {
    Object.keys(flags).forEach((element) => {
        document.getElementById("leftFlagPreset").innerHTML += 
        `<option value="${element}">${flags[element].displayName}</option>`;
        document.getElementById("rightFlagPreset").innerHTML += 
        `<option value="${element}">${flags[element].displayName}</option>`;
    })
}

function updateFlags() {
    let leftFlag = document.getElementById("leftFlagPreset").value; 
    let rightFlag = document.getElementById("rightFlagPreset").value;
    buildStripes(flags[leftFlag].stripes, flags[rightFlag].stripes);
    setColors(flags[leftFlag].stripes, flags[rightFlag].stripes);
    html2canvas(document.querySelector("#flag")).then(canvas => {
        let flagDisplay = document.getElementById("flagDisplay");
        flagDisplay.width = canvas.width;
        flagDisplay.height = document.getElementById("flagHeight").value;
        flagDisplay.getContext("2d").drawImage(canvas,0,0);
    });
}

setupFlagLists(flags);
updateFlags();
