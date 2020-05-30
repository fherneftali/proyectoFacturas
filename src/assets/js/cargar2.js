function loadDocs(e) {
    console.log("entro 2")
    const file = e.target.files[0];

    if (!file) {
        throw new Error('You need to choose an XML file first')
        alert('You need to choose an XML file first')
        return false
    }

    readDocs(file).then(parseDocs).then(showDocInTables).catch(onError)
}

function readDocs(file) {
    console.log("entro 2a")
    const reader = new FileReader()

    return new Promise((ok) => {
        reader.readAsText(file)
        reader.onload = function() {
            ok(reader.result)
        }
    })
}

function parseDocs(rawXML) {
    console.log("entro 2b")
    const parser = new DOMParser()
    const xml = parser.parseFromString(rawXML, 'application/xml')

    return xml
}

var acum2 = 0
var iva2 = 0

function showDocInTables(xml) {
    console.log("entro 2c")
    const table = document.querySelector('#bookTables > tbody')
    const datasource = xml.querySelector('Comprobante')
    const datasource2 = xml.querySelector('Comprobante Receptor')
    const etiq2 = document.getElementById('tf2')
    etiq2.remove()
    const etiq3 = document.getElementById('tf3')
    etiq3.remove()
        //table.removeChild(table.children[0])
        // Array.from(books).map((book, i) => {
    const tr = document.createElement('tr')

    const folio = tagToDatas(datasource.getAttribute('Folio'))
    tr.append(folio)

    const nombre = tagToDatas(datasource2.getAttribute('Nombre'))
    tr.append(nombre)

    const rfc = tagToDatas(datasource2.getAttribute('Rfc'))
    tr.append(rfc)

    const fecha = tagToDatas(datasource.getAttribute('Fecha'))
    tr.append(fecha)

    const subtotal = tagToDatas(datasource.getAttribute('SubTotal'))
    tr.append(subtotal)

    const st = datasource.getAttribute('SubTotal')
    iva2 = st * 0.16;
    acum2 = Number(acum2) + Number(iva2)
    const ivatnc = tagToDatas(iva2.toFixed(2))
    tr.append(ivatnc)
    const total = tagToDatas(datasource.getAttribute('Total'))
    tr.append(total)
    table.appendChild(tr)
        //}
        //)
    const div2 = document.getElementById('div2')
    const sti2 = document.createElement('label')
    sti2.id = 'tf2'
    sti2.class = 'card-title'
    sti2.style.color = 'black'
    sti2.style.textAlign = 'center'
    sti2.style.margin = 'auto'
    sti2.style.fontFamily = 'Montserrat'
    acum2 = acum2.toFixed(2)
    sti2.textContent = acum2
    div2.appendChild(sti2)
    console.log(acum2)
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

function tagToDatas(tag) {
    console.log("entro 2d")
    const td = document.createElement('td')
    td.style.border = '2px solid rgba(46, 66, 66, 0.9)'
    td.style.padding = '5px'
    td.style.fontFamily = 'Montserrat'
    td.style.height = '20px'
    td.textContent = tag
    return td
}
