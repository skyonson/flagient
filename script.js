document.querySelector("#flag").onclick = copy;

let flags = {
    trans:["#5BCFFB",
        "#F5ABB9",
        "#FFFFFF",
        "#F5ABB9",
        "#5BCFFB"
    ]
}

function copy() {
    html2canvas(document.querySelector("#capture")).then(canvas => {
        canvas.toBlob(blob => navigator.clipboard.write([new ClipboardItem({ 'image/png': blob })]))
    });
}