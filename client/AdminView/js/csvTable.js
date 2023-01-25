// When using this table component always ensure that the model has a unique (primary) key
// that can be used as a row id. The getRowId function will return the first entry in the array
// given by Object.values(params.data), so it is important to ensure your table is structured such
// that the first column is the primary key.


export function generateCSVTable(selector, model, fullData) {
let hooks = {
	getData: () => { return getRowData(); },
	clear: () => {setRowData([]);},
}

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
			let appendedData = [...rowData, params.data];
			//reset pinned row
			setRowData(appendedData);
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
			gridOptions.api.applyTransaction({remove: [params.data]});
			setRowData(gridOptions.api.rowModel.rowsToDisplay.map(x => x.data));
		
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

function getRowData() {
return rowData;
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
	  // returns the data in the first column, 
	  // this should always be the primary key
    return Object.values(params.data)[0];
  },

  getRowStyle: ({ node }) =>
	{ node.rowPinned ? { 'color': 'rgba(194,194,194)', 'font-style': 'italic' } : 0},

  onCellEditingStopped: (params) => {
	if (params.node.rowPinned === 'top') {
		if (isPinnedRowDataCompleted(params)) {
		} else {
		}
	} else {
		let appendedData = [...rowData, inputRow];
		setRowData(appendedData);
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
var eGridDiv = document.querySelector(selector);

  // create the grid passing in the div to use together with the columns &amp; data we want to use
  new agGrid.Grid(eGridDiv, gridOptions);
	setTimeout((fullData) => {setRowData(fullData)}, 0, fullData);

  return hooks;
};

