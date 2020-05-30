function loadDoc(e) {
    console.log("entro 1")
    const file = e.target.files[0];

    if (!file) {
        throw new Error('You need to choose an XML file first')
        alert('You need to choose an XML file first')
        return false
    }

    readDoc(file).then(parseDoc).then(showDocInTable).catch(onError)
}

function readDoc(file) {
    console.log("entro 1a")
    const reader = new FileReader()

    return new Promise((ok) => {
        reader.readAsText(file)
        reader.onload = function() {
            ok(reader.result)
        }
    })
}

function parseDoc(rawXML) {
    console.log("entro 1b")
    const parser = new DOMParser()
    const xml = parser.parseFromString(rawXML, 'application/xml')

    return xml
}

var acum = 0
var iva = 0

function showDocInTable(xml) {
    console.log("entro 1c")
    const table = document.querySelector('#bookTable > tbody')
    const datasource = xml.querySelector('Comprobante')
    const datasource2 = xml.querySelector('Comprobante Receptor')
    const etiq = document.getElementById('tf')
    etiq.remove()
    const etiq3 = document.getElementById('tf3')
    etiq3.remove()
        //table.removeChild(table.children[0])
        // Array.from(books).map((book, i) => {
    const tr = document.createElement('tr')

    const folio = tagToData(datasource.getAttribute('Folio'))
    tr.append(folio)

    const nombre = tagToData(datasource2.getAttribute('Nombre'))
    tr.append(nombre)

    const rfc = tagToData(datasource2.getAttribute('Rfc'))
    tr.append(rfc)

    const fecha = tagToData(datasource.getAttribute('Fecha'))
    tr.append(fecha)

    const subtotal = tagToData(datasource.getAttribute('SubTotal'))
    tr.append(subtotal)

    const st = datasource.getAttribute('SubTotal')
    iva = st * 0.16;
    acum = Number(acum) + Number(iva)
    const ivatnc = tagToData(iva.toFixed(2))
    tr.append(ivatnc)
    const total = tagToData(datasource.getAttribute('Total'))
    tr.append(total)
    table.appendChild(tr)
        //}
        //)
    const div1 = document.getElementById('div')
    const sti = document.createElement('label')
    sti.id = 'tf'
    sti.class = 'card-title'
    sti.style.color = 'black'
    sti.style.textAlign = 'center'
    sti.style.margin = 'auto'
    sti.style.fontFamily = 'Montserrat'
    acum = acum.toFixed(2)
    sti.textContent = acum
    div1.appendChild(sti)
    console.log(acum)
        //sti.append(tagToData(acum.toFixed(2)))
    var totalFin = 0
    var mostrarTotal = ""
    if (Number(acum) > Number(acum2)) {
        totalFin = Number(acum) - Number(acum2)
        mostrarTotal = "Devolucion por $" + totalFin.toFixed(2)
        console.log(mostrarTotal)
    } else {
        totalFin = Number(acum2) - Number(acum)
        mostrarTotal = "Pago por $" + totalFin.toFixed(2)
        console.log(mostrarTotal)
    }
    const div3 = document.getElementById('div3')
    const sti3 = document.createElement('label')
    sti3.id = 'tf3'
    sti3.class = 'card-title'
    sti3.style.color = 'black'
    sti3.style.textAlign = 'center'
    sti3.style.margin = 'auto'
    sti3.style.fontFamily = 'Montserrat'
    sti3.textContent = mostrarTotal
    div3.appendChild(sti3)
}

function tagToData(tag) {
    console.log("entro 1d")
    const td = document.createElement('td')
    td.style.border = '2px solid rgba(46, 66, 66, 0.9)'
    td.style.padding = '5px'
    td.style.fontFamily = 'Montserrat'
    td.style.height = '20px'
    td.textContent = tag
    return td
}

function onError(reason) {
    console.error(reason)
}

/*function enviar() {
    // Initialize Cloud Firestore through Firebase
    firebase.initializeApp({
        apiKey: "AIzaSyDPaYUiV6cRlvJEBIKh_0maG7kx0Rzb6Ag",
        authDomain: "facturas-d979b.firebaseapp.com",
        projectId: "facturas-d979b"
    });

    var db = firebase.firestore();

    console.log("entra");

    let docRef = db.collection('facturas').doc(datosFact.folio);

    let setFolio = docRef.set({
        numFolio: datosFact.folio,
        nombreReceptor: datosFact.nombre,
        regfedcon: datosFact.rfc,
        fechaEmision: datosFact.fecha,
        totalParcial: datosFact.subtotal,
        ivaTotal: datosFact.iva,
        totalFinal: datosFact.total
    });

    return Promise.all([setFolio]);
}*/
