// When using this table component always ensure that the model has a unique (primary) key
// that can be used as a row id. The getRowId function will return the first entry in the array
// given by Object.values(params.data), so it is important to ensure your table is structured such
// that the first column is the primary key.

// If you pass in an alternative Store it should have at least these 
// same functions
let fallbackStore = {
	fullData: [],
	viewData: [],
	updateDataFunctions: [],
	updateViewFunctions: [],
	updateData: function(newData) {
		this.fullData = newData;
		for (let i = 0; i < this.updateDataFunctions.length; i++) {
			this.updateDataFunctions[i](newData);
		}
	},
	updateView: function(newData) {
		this.viewData = newData;
		for (let i = 0; i < this.updateViewFunctions.length; i++) {
			this.updateViewFunctions[i](newData);
		}
	}
}

export function generateTimeSeriesTable(model, urlRead, store = fallbackStore) {

var columnDefs = model;

const setRowData = (newData) => {
console.log("new data ", newData);
gridOptions.api.setRowData(newData);
}

const resetView = () => {
let reset = store.fullData;
store.updateView(reset);
}

document.addEventListener('keydown', function(event) {
  if (event.ctrlKey && event.key === 'z') {
    resetView();
  }
});

store.updateDataFunctions.push(setRowData);

const gridOptions = {
  rowData: store.fullData,
  columnDefs: columnDefs,
  defaultColDef: {
    flex: 1,
    editable: false,
  },
  getRowId: (params) => {
	  // returns the data in the first column, 
	  // this should always be the primary key
    return Object.values(params.data)[0];
  },
  onFilterChanged: function() {
	  console.log('onFilterChanged');
	let activeRows = [];
	gridOptions.api.forEachNodeAfterFilter((node, index) => {activeRows.push(node.data)});
	setTimeout(() => store.updateView(activeRows), 0);
  },

};

//----------------------------------------------------
// lookup the container we want the Grid to use
var eGridDiv = document.querySelector('#myGrid');

  // create the grid passing in the div to use together with the columns &amp; data we want to use
  new agGrid.Grid(eGridDiv, gridOptions);

	agGrid.simpleHttpRequest({url: urlRead}).then(function(data) {
		console.log('http data', data);
		store.updateData(data);
		store.updateView(data);
	});
};
