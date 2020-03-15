// This file is required by the index.html file and will
// be executed in the renderer process for that window.
// No Node.js APIs are available in this process because
// `nodeIntegration` is turned off. Use `preload.js` to
// selectively enable features needed in the rendering
// process.

window.$ = window.jQuery = require('./js/jquery.js');

var Inkscape = require('inkscape')
var fs = require('fs');

let multiplePathsPdf = []
let multiplePathsXml = ''

$('#input-files-pdf').change(function () {
    multiplePathsPdf = $('#input-files-pdf')[0].files
    // console.log(multiplePathsPdf)

    multiplePathsPdf = Object.keys(multiplePathsPdf).map(function (key) {
        return multiplePathsPdf[key].path;
    });

    // console.log(multiplePathsPdf)

});


$("#btn-procesar-pdf").click(function () {

    for (let i = 0; i < multiplePathsPdf.length; i++) {
        generarArchivoXvg(multiplePathsPdf[i])
    }
    // multiplePathsPdf.forEach(compressFile);

    alert("Conversion exitosa");
});


async function generarArchivoXvg(file) {

    const sourceStream = fs.createReadStream(file);

    const destinationStream = fs.createWriteStream(file + '.svg');

    pdfToSvgConverter = new Inkscape(['--export-plain-svg', '--import-pdf']);

    console.log(pdfToSvgConverter)
    await sourceStream.pipe(pdfToSvgConverter).pipe(destinationStream);
}


// function compressFile(filename, callback) {
//     // var compress = zlib.createGzip(),

//     input = fs.createReadStream(filename),
//     output = fs.createWriteStream(filename + '.svg');
//     pdfToSvgConverter = new Inkscape(['--export-plain-svg', '--import-pdf']);


//     input.pipe(pdfToSvgConverter).pipe(output);

//     if (callback) {
//         output.on('end', callback);
//     }
// }

$('#input-files-xml').change(function () {
    multiplePathsXml = $('#input-files-xml')[0].files
    console.log(multiplePathsXml)
});


function getArrayXY(string) {

    array = string.split(`M `)[1].split(`"`)[0].split(' L ')

    let res = []

    for (let i = 0; i < array.length; i++) {

        const ejes = array[i].split(" ")

        res.push({
            "ejeX": ejes[0],
            "ejeY": ejes[1]
        })
    }

    res.push({
        "ejeX": 0,
        "ejeY": 0
    })

    return res

}

async function createNewExcelFile(array, path) {

    var Excel = require('exceljs');
    // A new Excel Work Book
    var workbook = new Excel.Workbook();

    // Some information about the Excel Work Book.
    workbook.creator = 'Daniel';

    // Create a sheet
    var sheet = workbook.addWorksheet('Sheet1');
    // A table header
    sheet.columns = [
        { header: 'Eje X', key: 'ejeX' },
        { header: 'Eje Y', key: 'ejeY' }
    ]

    for (let i = 0; i < array.length; i++) {

        sheet.addRow({ ejeX: Number(array[i].ejeX), ejeY: 0 - Number(array[i].ejeY) });

    }
    // Save Excel on Hard Disk
    await workbook.xlsx.writeFile(`${path.name}.xlsx`)

    // console.log(path)
    // .then(function () {
    //     // Success Message
    //     // alert("File Saved");
    // });
}

$("#btn-procesar").click(function () {

    fs = require('fs');

    for (let i = 0; i < multiplePathsXml.length; i++) {
        generarArchivo(multiplePathsXml[i])
    }

    alert("Archivos guardados");
});

function generarArchivo(file) {

    let content = fs.readFileSync(file.path, "utf8")

    // console.log(file.path)

    let datatemp = String(content).replace(/(\r\n|\n|\r|\t)/gm, "");

    let arraysAll = []
    let arraySplit = []
    arraySplit = datatemp.split(`android:name="path`)

    // console.table(arraySplit)

    // Onda 1
    arraysAll = [...arraysAll, ...getArrayXY(arraySplit[82])]

    // Onda 1 - Lineas verticales
    arraysAll = [...arraysAll, ...getArrayXY(arraySplit[83].replace(/ M /g, ' L '))]

    // Onda 2
    arraysAll = [...arraysAll, ...getArrayXY(arraySplit[84])]

    // Onda 2 - Lineas verticales
    arraysAll = [...arraysAll, ...getArrayXY(arraySplit[85].replace(/ M /g, ' L '))]

    // Onda 3
    arraysAll = [...arraysAll, ...getArrayXY(arraySplit[86])]

    // Onda 3 - Lineas verticales
    arraysAll = [...arraysAll, ...getArrayXY(arraySplit[87].replace(/ M /g, ' L '))]

    // Onda 4
    arraysAll = [...arraysAll, ...getArrayXY(arraySplit[88])]

    // Onda 4 - Lineas verticales
    arraysAll = [...arraysAll, ...getArrayXY(arraySplit[89].replace(/ M /g, ' L '))]

    // Onda 5
    arraysAll = [...arraysAll, ...getArrayXY(arraySplit[90])]

    // Onda 5 - Lineas verticales
    arraysAll = [...arraysAll, ...getArrayXY(arraySplit[91].replace(/ M /g, ' L '))]

    // Onda 6
    arraysAll = [...arraysAll, ...getArrayXY(arraySplit[92])]

    // Onda 6 - Lineas verticales
    arraysAll = [...arraysAll, ...getArrayXY(arraySplit[93].replace(/ M /g, ' L '))]

    // Onda 7
    arraysAll = [...arraysAll, ...getArrayXY(arraySplit[94])]

    // Onda 7 - Lineas verticales
    arraysAll = [...arraysAll, ...getArrayXY(arraySplit[95].replace(/ M /g, ' L '))]

    // Onda 8
    arraysAll = [...arraysAll, ...getArrayXY(arraySplit[96])]

    // Onda 8 - Lineas verticales
    arraysAll = [...arraysAll, ...getArrayXY(arraySplit[97].replace(/ M /g, ' L '))]

    // Onda 9
    arraysAll = [...arraysAll, ...getArrayXY(arraySplit[98])]

    // Onda 9 - Lineas verticales
    arraysAll = [...arraysAll, ...getArrayXY(arraySplit[99].replace(/ M /g, ' L '))]

    // Onda 10
    arraysAll = [...arraysAll, ...getArrayXY(arraySplit[100])]

    // Onda 10 - Lineas verticales
    arraysAll = [...arraysAll, ...getArrayXY(arraySplit[101].replace(/ M /g, ' L '))]

    // Onda 11
    arraysAll = [...arraysAll, ...getArrayXY(arraySplit[102])]

    // Onda 11 - Lineas verticales
    arraysAll = [...arraysAll, ...getArrayXY(arraySplit[103].replace(/ M /g, ' L '))]

    // Onda 12
    arraysAll = [...arraysAll, ...getArrayXY(arraySplit[104])]

    // Onda 12 - Lineas verticales
    arraysAll = [...arraysAll, ...getArrayXY(arraySplit[105].replace(/ M /g, ' L '))]

    // Calipers 1
    arraysAll = [...arraysAll, ...getArrayXY(arraySplit[80].replace(/ Z/g, ''))]

    // Calipers 2
    arraysAll = [...arraysAll, ...getArrayXY(arraySplit[81].replace(/ Z/g, ''))]

    createNewExcelFile(arraysAll, file)
}