
var tabulka
var vychoziVelikostX = 5
var vychoziVelikostY = 3
var aktivniBunka;

function vytvorBunku() {
    var td = document.createElement("td")

    var tdInput = document.createElement("input")

    tdInput.type = "text"
    tdInput.onfocus = function () {
            aktivniBunka = this
    }
    td.appendChild(tdInput)

    return td;
}

function vytvorVychoziTabulku() {
    tabulka = document.createElement("table")
    document.body.appendChild(tabulka)
    for (var y = 0; y < vychoziVelikostY; y++) {
            var tr = document.createElement("tr")
            tabulka.appendChild(tr)

            for (var x = 0; x < vychoziVelikostX; x++) {
                    tr.appendChild(vytvorBunku())
            }
    }
}

function vytvorTlacitkoAVlozHo(popisek, rodic) {
    var btn = document.createElement("button")
    btn.textContent = popisek
    rodic.appendChild(btn)
    return btn
}

function vytvorOvladaciTlacitka() {
    vytvorTlacitkoAVlozHo("Přidat řádek dolů", document.body).onclick = PridejRadekDolu;
    vytvorTlacitkoAVlozHo("Přidat řádek nahoru", document.body).onclick = PridejRadekNahoru;
    vytvorTlacitkoAVlozHo("Přidat sloupec vlevo", document.body).onclick = PridejSloupecDoleva;
    vytvorTlacitkoAVlozHo("Přidat sloupec vpravo", document.body).onclick = PridejSloupecDoprava
    vytvorTlacitkoAVlozHo("Odstranit řádek", document.body).onclick = SmazRadek;
    vytvorTlacitkoAVlozHo("Odstranit sloupec", document.body).onclick = SmazSloupec;
}

function vytvorRadek() {
        var novyRadek = document.createElement("tr")

        for (var i = 0; i < tabulka.firstElementChild.childNodes.length; i++) {
                novyRadek.appendChild(vytvorBunku())
        }
        return novyRadek;
}

function indexRadkuAktivniBunky() {
        var cilHledani = tabulka.childNodes;
        var hledanyPrvek = aktivniBunka.parentElement.parentElement;
        return Array.prototype.indexOf.call(cilHledani, hledanyPrvek);
}

function indexSloupceAktivniBunky() {
        var bunkyVRadku = aktivniBunka.parentElement.parentElement.childNodes;
        var td = aktivniBunka.parentElement
        return Array.prototype.indexOf.call(bunkyVRadku, td)
}

function PridejRadekNahoru() {
        var radek = vytvorRadek();
        var indexVybraneho = indexRadkuAktivniBunky();
        tabulka.insertBefore(radek, tabulka.childNodes[indexVybraneho])
}

function PridejRadekDolu() {
        var radek = vytvorRadek();
        var indexVybraneho = indexRadkuAktivniBunky();
        if (tabulka.lastChild == tabulka.childNodes[indexVybraneho]) {
                tabulka.appendChild(radek)
        } else {
                tabulka.insertBefore(radek, tabulka.childNodes[indexVybraneho + 1])
        }
}

function PridejSloupecDoleva() {
        var indexVybraneho = indexSloupceAktivniBunky();
        for (var i = 0; i < tabulka.childNodes.length; i++) {
                tabulka.childNodes[i].insertBefore(vytvorBunku(), tabulka.childNodes[i].childNodes[indexVybraneho]);
        }
}

function PridejSloupecDoprava() {
        var indexVybraneho = indexSloupceAktivniBunky();
        for (var i = 0; i < tabulka.childNodes.length; i++) {
                if (tabulka.childNodes[i].childNodes[indexVybraneho] == tabulka.childNodes[i].lastElementChild) {
                        tabulka.childNodes[i].appendChild(vytvorBunku())
                } else {
                        tabulka.childNodes[i].insertBefore(vytvorBunku(), tabulka.childNodes[i].childNodes[indexVybraneho + 1]);
                }
        }
}

function SmazRadek() {
        var indexVybraneho = indexRadkuAktivniBunky();
        tabulka.removeChild(tabulka.childNodes[indexVybraneho]);
}

function SmazSloupec() {
	var indexVybraneho = indexSloupceAktivniBunky();
	for (var i = 0; i < tabulka.childNodes.length; i++) {
		tabulka.childNodes[i].removeChild(tabulka.childNodes[i].childNodes[indexVybraneho]);
	}
}

// for ability to add mutliple windows.onload function
function addLoadEvent(func) {
  var oldonload = window.onload;
  if (typeof window.onload != 'function') {
    window.onload = func;
  } else {
    window.onload = function() {
      if (oldonload) {
        oldonload();
      }
      func();
    }
  }
}

addLoadEvent(vytvorOvladaciTlacitka)
addLoadEvent(vytvorVychoziTabulku)