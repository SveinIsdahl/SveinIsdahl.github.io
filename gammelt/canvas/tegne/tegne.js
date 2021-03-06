//Deklarering av variabler
let canvas = document.getElementById("canvas");
let ctx = canvas.getContext("2d");
let strekState = 0;
let xPrev;
let yPrev;
let farge = "#000000";
let lineWidth, drawState;
let cords = []; 
let fill = false;

function setup() {
    ctx.fillStyle = "black";
    ctx.lineWidth = 3;
}

//Eventlisteners, forteller tegnfunksjonen hvilket verktøy som er valgt
document.querySelector("#tools > div:nth-child(1)").addEventListener("click", function () { setDrawState("draw") });
document.querySelector("#tools > div:nth-child(2)").addEventListener("click", function () { setDrawState("firkant") });
document.querySelector("#tools > div:nth-child(3)").addEventListener("click", function () { setDrawState("sirkel") });
document.querySelector("#tools > div:nth-child(4)").addEventListener("click", function () { setDrawState("trekant") });
document.querySelector("#tools > div:nth-child(5)").addEventListener("click", function () { setDrawState("strek") });
document.querySelector("#tools > div:nth-child(6)").addEventListener("click", function () { setDrawState("visk") });

function setDrawState(state) {
    drawState = state;
}

//Funksjon for å lage en sirkel med fyll, ofte en dott
function dot(x, y, color, str) {
    ctx.beginPath();
    ctx.strokeStyle = farge;
    ctx.fillStyle = farge;
    ctx.arc(x, y, str, 0, 2 * Math.PI);
    ctx.fill();
    ctx.stroke();
    ctx.strokeStyle = farge;
    ctx.fillStyle = farge;
}


// mouseUp og mouseMove forteller tegnefunksjonen når man trykker ned og når man beveger musen over canvas, gitt at man har valgt "tegne-verktøyet"
function mouseUp(evt) {
    if (drawState == "draw" || drawState == "visk") {
        let x = getMousePos(evt).x;
        let y = getMousePos(evt).y;
        ctx.lineTo(x, y);
        ctx.stroke();
        strekState = 0;
        
    }

}
function mouseMove(evt) {
    if ((strekState == 1 && drawState == "draw") || (strekState == 1 && drawState == "visk")) {
        let x = getMousePos(evt).x;
        let y = getMousePos(evt).y;
        ctx.lineTo(x, y)
        ctx.stroke();
    }
}

//Tegnefunksjonen, 
//hva den gjør er avhengig av hvilket verktøy som er valgt
//hadde kanskje vært bedre å hatt individuelle funskjoner, men for mye jobb å endre.
function draw(evt) {
    ctx.lineWidth = lineWidth;
    let x = getMousePos(evt).x;
    let y = getMousePos(evt).y;
    ctx.strokeStyle = farge;
    switch (drawState) {
        case "draw":
            ctx.beginPath();
            console.log(farge);
            ctx.lineTo(x, y);
            strekState = 1;
            break;
        case "firkant":
            if (strekState == 1) {
                x = getMousePos(evt).x;
                y = getMousePos(evt).y;
                ctx.rect(xPrev, yPrev, x - xPrev, y - yPrev);
                if (fill == true) {
                    ctx.fill();
                }
                ctx.stroke();
                strekState = 0;
            }
            else {
                ctx.beginPath();
                xPrev = x;
                yPrev = y;
                strekState = 1;
            }
            break;
        case "trekant":
            if (strekState == 2) {
                cords[4] = getMousePos(evt).x;
                cords[5] = getMousePos(evt).y;
                ctx.lineTo(cords[4], cords[5]);
                ctx.moveTo(cords[4], cords[5]);
                ctx.stroke();
                ctx.lineTo(cords[0], cords[1]);
                if (fill == true) {
                    ctx.fill();
                }
                ctx.stroke();
                strekState = 0;
            }
            else if (strekState == 1) {
                cords[2] = getMousePos(evt).x;
                cords[3] = getMousePos(evt).y;
                ctx.lineTo(cords[2], cords[3]);
                ctx.stroke();
                strekState = 2;
            }
            else {
                cords[0] = getMousePos(evt).x;
                cords[1] = getMousePos(evt).y;
                ctx.beginPath();
                ctx.moveTo(cords[0], cords[1]);
                strekState = 1;
            }
            break;
        case "strek":
            if (strekState == 1) {
                x = getMousePos(evt).x;
                y = getMousePos(evt).y;
                ctx.lineTo(x, y);
                ctx.stroke();
                strekState = 0;
            }
            else {
                ctx.beginPath();
                ctx.moveTo(x, y);
                strekState = 1;
            }
            break;
        case "sirkel":
            if (strekState == 1) {
                x = getMousePos(evt).x;
                y = getMousePos(evt).y;
                let radius = Math.sqrt((xPrev - x) * (xPrev - x) + (yPrev - y) * (yPrev - y));
                ctx.arc(xPrev, yPrev, radius, 0, Math.PI * 2);
                if (fill == true) {
                    ctx.fill();
                }
                ctx.stroke();
                ctx.lineWidth = lineWidth;
                strekState = 0;
            }
            else {
                ctx.beginPath();
                xPrev = x;
                yPrev = y;
                strekState = 1;
            }
            break;
        case "visk":
            ctx.beginPath();
            ctx.strokeStyle = "white";
            ctx.lineTo(x, y);
            strekState = 1;
            break;
        default:
            alert("Ingen verktøy valgt");
            break;
    }
}

//Finner alle div i farge-velger, og setter på eventlistener
document.querySelector("#farger > div:nth-child(1)").addEventListener("click", function () { setColor("#ff0000", false) });
document.querySelector("#farger > div:nth-child(2)").addEventListener("click", function () { setColor("#008000", false) });
document.querySelector("#farger > div:nth-child(3)").addEventListener("click", function () { setColor("#0000ff", false) });
document.querySelector("#farger > div:nth-child(4)").addEventListener("click", function () { setColor("#f0f000", false) });
document.querySelector("#farger > div:nth-child(5)").addEventListener("click", function () { setColor("#000000", false) });

//Farge selector:
function setColor(color, fyll) {
    farge = color;
    ctx.strokeStyle = farge;
    ctx.fillStyle = farge;
    fill = fyll;
}

//Finner alle div i fill-velger, og setter på eventlistener
document.querySelector("#fill > div:nth-child(1)").addEventListener("click", function () { setColor("#ff0000", true) });
document.querySelector("#fill > div:nth-child(2)").addEventListener("click", function () { setColor("#008000", true) });
document.querySelector("#fill > div:nth-child(3)").addEventListener("click", function () { setColor("#0000ff", true) });
document.querySelector("#fill > div:nth-child(4)").addEventListener("click", function () { setColor("#f0f000", true) });
document.querySelector("#fill > div:nth-child(5)").addEventListener("click", function () { setColor("#000000", true) });


//Line width slider:
var slider = document.getElementById("lineWidth");
var output = document.getElementById("widthValue");
output.innerHTML = slider.value;

slider.oninput = function () {
    output.innerHTML = this.value;
    lineWidth = this.value;
}

//Musepekerposisjon:
function getMousePos(evt) {
    var rect = canvas.getBoundingClientRect();
    return {
        x: (evt.clientX - rect.left) / (rect.right - rect.left) * canvas.width,
        y: (evt.clientY - rect.top) / (rect.bottom - rect.top) * canvas.height
    };
}

setup();