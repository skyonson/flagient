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
    enby: {
        displayName:"Nonbinary",
        stripes:[
            "#FCF434",
            "#FFFFFF",
            "#9C59D1",
            "#2C2C2C"
        ]
    },
    genderfluid: {
        displayName:"Genderfluid",
        stripes:[
            "#FE76A2",
            "#FFFFFF",
            "#BF12D7",
            "#000000",
            "#303CBE"
        ]
    },
    lesbian: {
        displayName:"Lesbian",
        stripes:[
            "#D62800",
            "#FF9B56",
            "#FFFFFF",
            "#D462A6",
            "#A40062"
        ]
    },
    trans: {
        displayName:"Transgender",
        stripes:[
            "#5BCFFB",
            "#F5ABB9",
            "#FFFFFF",
            "#F5ABB9",
            "#5BCFFB"
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
    document.querySelector(":root").style.setProperty(`--stripeHeight`, `${(document.getElementById("flagHeight").value / numStripes) + 1}px`);
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
    setColors(flags[leftFlag].stripes, flags[rightFlag].stripes)
    html2canvas(document.querySelector("#flag")).then(canvas => {
        let flagDisplay = document.getElementById("flagDisplay");
        flagDisplay.width = canvas.width
        flagDisplay.height = canvas.height
        flagDisplay.getContext("2d").drawImage(canvas,0,0);
    });
}

setupFlagLists(flags)
updateFlags()
