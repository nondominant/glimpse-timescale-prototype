import {generateCSVTable } from './csvTable.js';
//csv table
export function f (inputID, buttonID, model, hooks, urlInsert, urlRead, urlDelete) {
//==========================================================================
var fileInput = document.querySelector(inputID);
fileInput.addEventListener("change", readFile);
//==========================================================================

//==========================================================================
function readFile() {  
  var file = document.querySelector(inputID).files[0];
  var reader = new FileReader();
  var content = reader.readAsText(file);
  reader.onload = () => {
    var data = Papa.parse(reader.result, { header: true });
    if (data.errors.length) {
      console.error(data.errors)
    } else {
      let csvhooks = generateCSVTable('#result', model, data.data, urlInsert, urlRead, urlDelete)
      console.log(csvhooks);
      console.log(csvhooks.getData());
      activateButton(csvhooks, buttonID)
    }
  };
}
//==========================================================================

//==========================================================================
function activateButton(csvhooks, buttonID) {
	let button = document.querySelector(buttonID)
	button.addEventListener("click", () => {
		let fileData = csvhooks.getData();
		console.log('sending', fileData);
		try {
		let fileAsJSON = {
			data: fileData,
		}
		let stringFile = JSON.stringify(fileAsJSON);
		fetch('http://localhost:8000/insert/chunk/employeeTable', {
			method: 'POST',
			headers: {
				'Content-Type':'application/json',
			},
			body: stringFile,
		})
		.then((response) => { 
			return response.json();
		})
		.then((data) => {
			csvhooks.clear();
			hooks.clear();
			hooks.refresh();
		})
		.catch((error) => {
			console.log(error);
		});
		} catch {
			alert('please select a file');
		}
	});
}
//==========================================================================
};
