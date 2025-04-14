var ss = SpreadsheetApp.getActiveSpreadsheet();
var sheet = ss.getActiveSheet();
var dataRangeAll = sheet.getDataRange();
var ultimaFila = dataRangeAll.getLastRow();

function onOpen() {  
  var ui = SpreadsheetApp.getUi();
  ui.createMenu('Geocodificar')
      .addItem('Convertir direcciones en coordenadas', 'geocodificar')
      .addToUi();
}
function geocodificar() {
  var filaInicial = 2;
  var dataRange = sheet.getRange(filaInicial, 1,ultimaFila, 3);
  var data = dataRange.getValues();


  for(var i=0; i< data.length; i++) {
    var fila = data[i];

    var direccion = fila[0];

    if(direccion != "") {

      var geocoder = Maps.newGeocoder().geocode(direccion);
      var resultado = geocoder.results[0];

      var latitud = 0;
      var longitud = 0;


      if(resultado) {
        latitud = resultado.geometry.location.lat;
        longitud = resultado.geometry.location.lng;
        sheet.getRange(filaInicial + i, 2).setValue(latitud);
        sheet.getRange(filaInicial + i, 3).setValue(longitud);
      }
    }
  }
}