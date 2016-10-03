
function Prepni() {
        if (prepinac.getAttribute("src") == "img/img0.png") {
                prepinac.src = "img/img1.png"
        } else {
                prepinac.src = "img/img0.png"
        }
}

var prepinac;
function CreateImage() {
	prepinac = document.createElement("img")
    document.body.appendChild(prepinac)
	prepinac.src = "img/img0.png"
    prepinac.onclick = Prepni;

	document.body.appendChild(prepinac);
}

function GetContext () {
	var canvas = document.getElementById("my-canvas");
	var context = canvas.getContext("2d");
	context.beginPath();
	context.moveTo(20, 20);
	context.lineTo(40, 150);
	context.closePath();
	//circle
	context.arc(100, 100, 80, 0, Math.PI*2);
	context.stroke();

}

addLoadEvent(CreateImage)
addLoadEvent(GetContext)