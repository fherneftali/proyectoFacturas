function loadDoc(e) {
    const file = e.target.files[0];

    if (!file) {
        throw new Error('You need to choose an XML file first')
        alert('You need to choose an XML file first')
        return false
    }

    readDoc(file).then(parseDoc).then(showDocInTable).catch(onError)
}

function readDoc(file) {
    const reader = new FileReader()

    return new Promise((ok) => {
        reader.readAsText(file)
        reader.onload = function() {
            ok(reader.result)
        }
    })
}

function parseDoc(rawXML) {

    const parser = new DOMParser()
    const xml = parser.parseFromString(rawXML, 'application/xml')

    return xml
}

function showDocInTable(xml) {
    const table = document.querySelector('#bookTable > tbody')

    const datasource = xml.querySelector('Comprobante')
    const datasource2 = xml.querySelector('Comprobante Receptor')
    const sti = document.getElementById('tf')
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
    var iva = st * 0.16;
    const ivatnc = tagToData(iva.toFixed(2))
    tr.append(ivatnc)
    sumaIva(iva)
    const total = tagToData(datasource.getAttribute('Total'))
    tr.append(total)
    table.appendChild(tr)
    sti.append(tagToData(iva.toFixed(2)))
        //}
        //)
}

function sumaIva(iva) {
    const ivaredond = tagToData(iva.toFixed(2))
    const totalCard = document.getElementById('tf')[0].value
    console.log(totalCard)
    var sumaTotal
    sumaTotal = Number(ivaredond) + Number(totalCard)
    console.log(sumaTotal)
}

function tagToData(tag) {
    const td = document.createElement('td')
    td.style.border = '2px solid rgba(46, 66, 66, 0.9)'
    td.style.padding = '5px'
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
