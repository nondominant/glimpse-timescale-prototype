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




	  //========================= partially completed drag and drop heading selector ====================

    //let result = reader.result.split(/\r\n/)
    //let headings = result[0].split(',');
    //console.log('headings', headings);
    //let body = document.querySelector('body');
    //let popup = document.createElement('div');
    //popup.setAttribute('id', 'csvPopUp');
    //popup.setAttribute('style', `
    //display: flex;
    //flex-direction: column;
    //height: auto;
    //min-height: 40vh;
    //width: 50vw;
    //position: absolute;
    //top: 50%;
    //left: 50%;
    //transform: translate(-50%,-50%);
    //background: white;
    //border: black solid 5px;
    //border-radius: 5px;
    //z-index: 99;
    //`);
    //let headingContainer = document.createElement('div');
    //headingContainer.setAttribute('style', `
    //display: flex;
    //flex-direction: row;
    //flex-wrap: wrap;
    //justify-content: start;
    //align-items: start;
    //width: 90%;
    //flex: 1;
    //border: green solid 3px;
    //padding: 10px;
    //`);
    //let slotContainer = headingContainer.cloneNode(true);
    //let headingTile = document.createElement('div');
    //headingTile.setAttribute('style', `
    //display: flex;
    //min-width: 100px;
    //width: auto;
    //height: 40px;
    //border: black solid 1px;
    //margin: 4px;
    //padding: 4px;
    //`);
    //let slotTile = headingTile.cloneNode(true);
    //let tileStyle = slotTile.getAttribute('style');
    //      console.log("tile style", tileStyle);
    //      console.log('model', model);
    //      let modelHeadings = model.map(x => {return x.field});
    //     // Object.assign()
    //headings.forEach((x) => {
    //let temp = headingTile.cloneNode(true);
    //temp.innerHTML = x;
    //headingContainer.appendChild(temp)
    //});
    //modelHeadings.forEach((x) => {
    //let temp = slotTile.cloneNode(true);
    //temp.innerHTML = x;
    //slotContainer.appendChild(temp)
    //});
    //popup.appendChild(headingContainer);
    //popup.appendChild(slotContainer);
    //body.appendChild(popup);


    var data = Papa.parse(reader.result, { header: true });
    if (data.errors.length) {
      console.error(data.errors)
    } else {
      let csvhooks = generateCSVTable('#result', model, data.data, urlInsert, urlRead, urlDelete)
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
