// local state required
//

let assetId = new Array(100).fill("");
let productId = new Array(100).fill("");
assetId[11] = "Ironer 1";
assetId[21] = "CBW 1";
productId[44] = "sheets";

let mac_to_machine_mapping = {
	"02:42:45:07:cb:1b" : "Ironer 1",
	"03:42:45:07:cb:1b" : "Ironer 2",
	"04:42:45:07:cb:1b" : "Ironer 3",
	"05:46:45:07:cb:1b" : "Ironer 4",
	"06:51:47:08:cb:1b" : "CBW 1",
	"07:44:45:10:cb:1b" : "CBW 2",
	"08:43:45:08:cb:1b" : "CBW 3",
	"09:42:45:07:cb:1b" : "Flat piece folder",
	"02:46:45:07:cb:1b" : "Industrial Fax Folder",
	"02:47:45:07:cb:1b" : "Healthcare Fax Folder",
};

//middleware required for incoming events:
// 	location heartbeat
// 	{id, coordinates[x,y,z]} ----> { timestamp, machine, employee}
//
// 	machine status heartbeat 
// 	synthetic --pull from cache---> {machine1: {timestamp, broken, product}, machine2: {timestamp, Running, product}, ...} 
//
// 	sensor event
// 	{mac: 12:34:96:2c:cb:1b} ----> {timestamp, mac: 12:34:96:2c:cb:1b}
//
// 	water event
// 	{mac: 12:34:96:2c:cb:1b} ----> {timestamp, mac: 12:34:96:2c:cb:1b}
//
// 	gas event
// 	{mac: 12:34:96:2c:cb:1b} ----> {timestamp, mac: 12:34:96:2c:cb:1b}
 	

// incoming event types:
// 	location heartbeat ---> check machine ----> push onto location queue
// 	{ timestamp, machine, employee}
//
// 	machine status heartbeat ----> iterate over Object.keys ----> push onto status queue
// 	{machine1: {timestamp, broken, product}, machine2: {timestamp, Running, product}, ...} 
//
// 	sensor event ----> check mac ----> push onto sensor queue
// 	{timestamp, mac: 12:34:96:2c:cb:1b}
//
// 	water event ----> check mac ----> push onto water queue
// 	{timestamp, mac: 12:34:96:2c:cb:1b}
//
// 	gas event ----> check mac ----> push onto gas queue
// 	{timestamp, mac: 12:34:96:2c:cb:1b}


let array_of_location_heartbeat_queues = {
}

let array_of_status_heartbeat_queues = {
	"Ironer 1": [
		{ "time": new Date().getTime(), "status": "Running", "assetId": "11", "productId": "44" },
		{ "time": new Date().getTime(), "status": "Running", "assetId": "11", "productId": "44" },
		{ "time": new Date().getTime(), "status": "Running", "assetId": "11", "productId": "44" },
	],
	"Ironer 2": [],
	"Ironer 3": [],
	"Ironer 4": [],
	"CBW 1": [
		{ "time": new Date().getTime(), "status": "Running", "assetId": "21", "productId": "44" },
		{ "time": new Date().getTime(), "status": "Running", "assetId": "21", "productId": "44" },
		{ "time": new Date().getTime(), "status": "Running", "assetId": "21", "productId": "44" },
	],
	"CBW 2": [],
	"CBW 3": [],
	"Flat piece folder": [],
	"Industrial Fax Folder": [],
	"Healthcare Fax Folder": [],
};

let time = new Date().getTime();

let array_of_sensor_queues = {
	"Ironer 1": [
		time - 7100,
		time - 2300,
		time - 4800,
		time - 1300,
	],
	"Ironer 2": [],
	"Ironer 3": [],
	"Ironer 4": [],
	"CBW 1": [
		time - 241000,
		time - 121000,
	],
	"CBW 2": [],
	"CBW 3": [],
	"Flat piece folder": [],
	"Industrial Fax Folder": [],
	"Healthcare Fax Folder": [],
};
let array_of_gas_queues = {
	"Ironer 1": [],
	"Ironer 2": [],
	"Ironer 3": [],
	"Ironer 4": [],
	"CBW 1": [],
	"CBW 2": [],
	"CBW 3": [],
	"Flat piece folder": [],
	"Industrial Fax Folder": [],
	"Healthcare Fax Folder": [],
};
let array_of_water_queues = {
	"Ironer 1": [],
	"Ironer 2": [],
	"Ironer 3": [],
	"Ironer 4": [],
	"CBW 1": [],
	"CBW 2": [],
	"CBW 3": [],
	"Flat piece folder": [],
	"Industrial Fax Folder": [],
	"Healthcare Fax Folder": [],
};
let product_weight = {
	"sheets" : 0.9,
	"pillow cases" : 0.46,
}
let product_load_weight = {
	"sheets" : 70,
	"pillow cases" : 65,
}

let multiplier_mapping = {
	"Ironer 1": 1,
	"Ironer 2": 1,
	"Ironer 3": 1,
	"Ironer 4": 1,
	"Flat piece folder": 1,
	"Industrial Fax Folder": 1,
	"Healthcare Fax Folder": 1,
};
const loadFactor = (machine, product) => {
	return  product_load_weight[product] / product_weight[product];
}
const defaultFactor = (machine, product) => {
	return multiplier_mapping[machine]
}

let factor_function = {
	"Ironer 1": defaultFactor,
	"Ironer 2": defaultFactor,
	"Ironer 3": defaultFactor,
	"Ironer 4": defaultFactor,
	"CBW 1": loadFactor,
	"CBW 2": loadFactor,
	"CBW 3": loadFactor,
	"Flat piece folder": defaultFactor,
	"Industrial Fax Folder": defaultFactor,
	"Healthcare Fax Folder": defaultFactor,
};

//console.log(Object.keys(array_of_sensor_queues));

let machines = Object.keys(array_of_sensor_queues);


let average_pieces = machines.map((x) => {
	try { 
		// note the '+' coerces strings into ints, in case the product id is a string
		let product = productId[+array_of_status_heartbeat_queues[x][0]["productId"]];
		let sum = array_of_sensor_queues[x].length * factor_function[x](x, product);
		let timePeriod = new Date().getTime() - array_of_sensor_queues[x][0];
		let avg = sum / timePeriod;
		return avg;
	} catch (e) {
		return 0;
	}
});

console.log(average_pieces[0], " per millisecond");
console.log(average_pieces[0] * 1000, " per second");
console.log(average_pieces[0] * 1000 * 60, " per minute");
console.log(average_pieces[0] * 1000 * 60 * 60, " per hour");


console.log("cbw ", average_pieces[4], " per millisecond");
console.log("cbw ", average_pieces[4] * 1000, " per second");
console.log("cbw ", average_pieces[4] * 1000 * 60, " per minute");
console.log("cbw ", average_pieces[4] * 1000 * 60 * 60, " per hour");

// output regular intervals RECORD
// timestamp | machine 1 | machine 2 | machine 3 | machine 4 | machine 5
// 12483592    AE0024260   AE0024257   AE0024238   AE0024238   AE0024239

// EVENT
// eventId   | avg pieces per minute | avg pieces per hour | status | product | Option<employee> | Option<avg gas usage per minute> | Option<avg water use per minut> | boolean<partial>
//

// simultaneously generate array of values for each column. 
// await completion of all rows, or timeout, which triggers construction of an event i using all arrays
// values at index i
// set a flag if an event is partially completed, it will be added but should be able to be filtered out, this should also be logged as an alert condition

// as EVENTS are written to database, a RECORD is constructed and timestamp is taken, then written to the database
// RECORDS should be written every 10 seconds

//--------------------------------------------------------------------------------------------------- 

// processing events off queues:
//
// EVENT
// eventId   | avg pieces per minute | avg pieces per hour | status | product | Option<employee> | Option<avg gas usage per minute> | Option<avg water use per minut> | boolean<partial>
//
//QUEUE TYPE 1 (location, status)
// if queue > max {
// 	pop 3/4 off, use the most recently popped, discard others
// }
//
//
//
 
const construct_average_pieces = (queue) => {
//QUEUE TYPE 1 (location, status)
// if queue > max {
// 	pop 3/4 off, use the most recently popped, discard others
// }
}
const construct_average_water = (queue) => {
//QUEUE TYPE 1 (location, status)
// if queue > max {
// 	pop 3/4 off, use the most recently popped, discard others
// }
}
const construct_average_gas = (queue) => {
//QUEUE TYPE 1 (location, status)
// if queue > max {
// 	pop 3/4 off, use the most recently popped, discard others
// }
}

const read_location = (queue) => {
// QUEUE TYPE 2
// clone queue
// set original queue to empty []
// take clone.length / oldest timestamp in clone = avg
// pop most recent event from clone, if original queue remains empty, insert most recent event
// drop clone
	return [employee, machine]
}
const read_status = (queue) => {
// QUEUE TYPE 2
// clone queue
// set original queue to empty []
// take clone.length / oldest timestamp in clone = avg
// pop most recent event from clone, if original queue remains empty, insert most recent event
// drop clone
// > product, machine_status	

//QUEUE TYPE 1 (location, status)
// if queue > max {
// 	pop 3/4 off, use the most recently popped, discard others
// }
	// > avg_up_time
	return [product, machine_status, avg_up_time];
}

const queues = [  
  array_of_sensor_queues,
  array_of_water_queues,
  array_of_gas_queues,
  array_of_location_heartbeat_queues,
  array_of_status_heartbeat_queues,
];

const processors = [  
   construct_average_pieces,
   construct_average_water,
   construct_average_gas,
   read_location,
   read_status
];

const outer_promises = queues.map((one_of_five, index) => { // 5 types of queue
  return new Promise((resolve, reject) => {
	  let proc = processors[index]
	  const inner_promises = one_of_five.map((one_of_thirty, inner_index) => { // 23 machines each with a single_queue 
		  return new Promise((resolve, reject) => { // single promise returns calculated result for one of the queues on ONE machine
			  let result = proc(one_of_thirty);
			  resolve(result);
		  });
	  });
	  const results_array = Promise.all(inner_promises); // results_array contains calculated results for one of the queues on ALL machines
	  resolve(results_array);
  });
})

const record = Promise.all(outer_promises); 
// record contains five arrays, each containing 23 values. a single slice of all array values at [0] 
// is representative of an event row, which is timestamped and saved under a row Id.
// A timestamp, along with the row Id's for all 23 slices, is a single RECORD row

const rows = [...Array(assetId.length).keys)];
const db_insertion_promises = rows.map((x) => {
		return new Promise((resolve, reject) => {
			let avg_pieces = record[0][x]
			let avg_water = record[1][x]
			let avg_gas = record[2][x]
			let employee = record[3][x][0]
			let machine_name = record[3][x][1]
			let product = record[4][x][0]
			let machine_status = record[4][x][1]
			let avg_up_time = record[4][x][2]
			// DataBase.table("events").execute({
			// 	"Insert",
			// 	id: generate,
			// 	timestamp: new Date().getTime(),
			// 	pieces: avg_pieces,
			// 	water: avg_water,
			// 	gas: avg_gas,
			// 	operator: employee,
			// 	machine_station: machine_name,
			// 	product: product,
			// 	machine_status: machine_status,
			// 	up_time: avg_up_time,
			// })
	});
});
const successful_insert = Promise.all(db_insertion_promises);
const row_ids = successful_insert.then(x => return x.map(row => row.id))

//Database.table("records").execute({
//	"Insert",
//	timestamp: new Data().getTime(),
//	assetId[0] : row_ids[0],
//	assetId[1] : row_ids[1],
//	assetId[2] : row_ids[2],
//	assetId[3] : row_ids[3],
//	assetId[4] : row_ids[4],
//	assetId[5] : row_ids[5],
//	assetId[6] : row_ids[6],
//	assetId[7] : row_ids[7],
//	assetId[8] : row_ids[8],
//	assetId[9] : row_ids[9],
//	assetId[10] : row_ids[10],
//	assetId[11] : row_ids[11],
//	assetId[12] : row_ids[12],
//});


