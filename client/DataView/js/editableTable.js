// When using this table component always ensure that the model has a unique (primary) key
// that can be used as a row id. The getRowId function will return the first entry in the array
// given by Object.values(params.data), so it is important to ensure your table is structured such
// that the first column is the primary key.


export function generateTable(model, urlInsert, urlRead, urlDelete) {

class removeRowButtonRenderer {
	// gets called once before the renderer is used
	init(params) {
		if (params.node.rowPinned === 'top') {
		// create the cell
		this.eGui = document.createElement('div');
		this.eGui.innerHTML = `
		<span>
		<button class="btn-tick"> ⚡ </button>
		</span>
		`;

		// get references to the elements we want
		this.eButton = this.eGui.querySelector('.btn-tick');

		// add event listener to button
		this.eventListener = () => {
			console.log('params.data', params.data);
			let appendedData = [...rowData, params.data];
			console.log('appendedData', appendedData);
			//reset pinned row
			fetch(urlInsert, {
				method: 'POST', // or 'PUT'
				headers: {
				'Content-Type': 'application/json',
				},
				body: JSON.stringify(params.data),
			})
			.then((response) => response.json())
			.then((data) => {
				setRowData(appendedData);
			})
			.catch((error) => {
				console.log(error);
			});
			setInputRow({});
		// else statment handles all other rows

		};
		this.eButton.addEventListener('click', this.eventListener);

		} else {
		// create the cell
		this.eGui = document.createElement('div');
		this.eGui.innerHTML = `
		<span>
		<button class="btn-simple"> ✖ </button>
		</span>
		`;

		// get references to the elements we want
		this.eButton = this.eGui.querySelector('.btn-simple');

		// add event listener to button
		this.eventListener = () => {
			let nodeID = Object.values(params.data)[0];
			let node = gridOptions.api.getRowNode(Object.values(params.data)[0]);
			console.log('node ',node);
			console.log('node ',nodeID);
			params.api.updateRowData({remove: [params.data]});

			let selectedData = params.data; 
			fetch(urlDelete, {
				method: 'POST', // or 'PUT'
				headers: {
				'Content-Type': 'application/json',
				},
				body: JSON.stringify(selectedData),
			}).then((data) => {
			});
		};
		this.eButton.addEventListener('click', this.eventListener);

		}
	}

	getGui() {
	return this.eGui;
	}

	// gets called whenever the cell refreshes
	refresh(params) {
	// return true to tell the grid we refreshed successfully
	return true;
	}

	// gets called when the cell is removed from the grid
	destroy() {
	// do cleanup, remove event listener from button
		if (this.eButton) {
			// check that the button element exists as destroy() can be called before getGui()
			this.eButton.removeEventListener('click', this.eventListener);
		}
	}
}

var columnDefs = [...model, { field:'delete', minWidth:175, cellRenderer:removeRowButtonRenderer }];
let rowData = [];
let inputRow = {};

function setRowData(newData) {
rowData = newData;
gridOptions.api.setRowData(rowData);
}

function setInputRow(newData) {
inputRow = newData;
gridOptions.api.setPinnedTopRowData([inputRow]);
}


const gridOptions = {
  rowData: null,
  columnDefs: columnDefs,
  pinnedTopRowData: [inputRow],
  defaultColDef: {
    flex: 1,
    editable: true,
    valueFormatter: (params) =>
      isEmptyPinnedCell(params)
        ? createPinnedCellPlaceholder(params)
        : undefined,
  },
  getRowId: (params) => {
	  console.log('this', this)
	  console.log('params.data', params.data)
	  console.log('Object.values(params.data)', Object.values(params.data))
	  console.log('Object.values(params.data)[0]', Object.values(params.data)[0])

	  // returns the data in the first column, 
	  // this should always be the primary key
    return Object.values(params.data)[0];
  },

  getRowStyle: ({ node }) =>
    node.rowPinned ? { 'color': 'rgba(194,194,194)', 'font-style': 'italic' } : 0,

  onCellEditingStopped: (params) => {
	console.log('params.node', params.node);
	console.log('params.node.rowPinned', params.node.rowPinned);
	if (params.node.rowPinned === 'top') {
		if (isPinnedRowDataCompleted(params)) {
			console.log('cell editing finished');
		} else {
			console.log('cell editing stopped on top row, but data not complete');
		}
	} else {
		let appendedData = [...rowData, inputRow];
		fetch(urlInsert, {
			method: 'POST', // or 'PUT'
			headers: {
			'Content-Type': 'application/json',
			},
			body: JSON.stringify(params.data),
		})
		.then((response) => response.json())
		.then((data) => {
			setRowData(appendedData);
		})
		.catch((error) => {
			console.log(error);
		});
	}

	// handle edit to pinned row 
  },
};

function isEmptyPinnedCell({ node, value }) {
  return (
    (node.rowPinned === 'top' && value == null) ||
    (node.rowPinned === 'top' && value == '')
  );
}

function createPinnedCellPlaceholder({ colDef }) {
  return colDef.field + ' ...';
  return colDef.field[0].toUpperCase() + colDef.field.slice(1) + '...';
}

function isPinnedRowDataCompleted(params) {
  if (params.rowPinned !== 'top') return;
  return columnDefs.every((def) => inputRow[def.field]);
}

//----------------------------------------------------
// lookup the container we want the Grid to use
var eGridDiv = document.querySelector('#myGrid');

  // create the grid passing in the div to use together with the columns &amp; data we want to use
  new agGrid.Grid(eGridDiv, gridOptions);

  agGrid.simpleHttpRequest({url: urlRead}).then(function(data) {
      setRowData(data);
  });
};

