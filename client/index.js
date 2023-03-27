let data = {
	timestamps: [],
	machines: {},
}

let machines = [
	'ironer 1',
	'ironer 2',
	'ironer 3',
	'ironer 4',
	'ironer 5',
	'ironer 6',
	'CBW 1',
	'CBW 2',
	'CBW 3',
	'Fax Folder',
	'Small Piece Folder'
];

machines.map((x) => {
	data.machines[x] = [];
});

let time_range = [new Date(), new Date(), new Date(), new Date(), new Date()];

time_range.map((x) => {
	data.timestamps.push(x);
	Object.keys(data.machines).map((y) => {
		data.machines[y].push(proto_event_generate())
	});

});

function proto_event_generate() {
	return {
		'average_throughput_per_hour': 20,
		'product': 'Blankets',
		'employee': 'Peter Hooper',
		'machine_status': 'running',
		'gas_usage_per_hour': 1.3898,
		'water_usage_per_hour': 33.45,
	};
}

console.log(data.timestamps.map(x => { return x.getTime();}));
console.log(`gas usage of ${machines[2]} `, data.machines[machines[2]].map(x => { return x['gas_usage_per_hour']}));
console.log(`product going through ${machines[3]}`, data.machines[machines[3]].map(x => { return x['product']}));
console.log(`employee using ${machines[4]}`, data.machines[machines[4]].map(x => { return x['employee']}));


