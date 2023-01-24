//PAPA Parser (https://www.papaparse.com/) used to convert TEXT to CSV
window.addEventListener('DOMContentLoaded', (event) => {
console.clear();
console.log('DOM fully loaded and parsed');

var fileInput = document.getElementById("myfile");
fileInput.addEventListener("change", readFile);
function readFile() {  
  document.getElementById('errorMessage').innerHTML = ""
  var file = document.getElementById("myfile").files[0];
  var reader = new FileReader();
  content = reader.readAsText(file);
  reader.onload = function () {
    var data = Papa.parse(reader.result, { header: true });
    console.log(data);
    if (data.errors.length) {
      document.getElementById('errorMessage').innerHTML = "* Error parsing CSV: " + JSON.stringify(data.errors)      
      console.error(data.errors)
    } else {
      generateTable(data.meta.fields, data.data)
    }
  };
}

function generateTable(columns, rows) {
  var result = `<table>
    <thead>
      <tr>
        @header
      <tr>
    </thead>
    <tbody>
      @body
    </tbody>
  </table>`;
  var header = "";
  columns.forEach((h) => (header += `<th>${h}</th>`));
  result = result.replace("@header", header);
  var body = "";
  rows.forEach((row) => {
    var keys = Object.keys(row)
    var b = "";
    keys.forEach((k) => {
      b += `<td>${row[k]}</td>`
    });
    body += "<tr>" + b + "</tr>"
  });
  result = result.replace("@body", body);
  console.log(result)
  document.getElementById("result").innerHTML = result;
}
});


