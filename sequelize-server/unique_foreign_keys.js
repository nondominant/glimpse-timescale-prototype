const express = require('express')
const app = express()
const port = 4000;
const Sequelize = require('sequelize');
const Datatypes = require('sequelize/lib/data-types');

app.use(express.json());

const sequelize = new Sequelize(
'postgres://admin:octopus@localhost:5432/example?sslmode=disable',
  {
  protocol: 'postgres:',
  slashes: true,
  auth: 'admin:octopus',
  host: 'localhost',
  port: '5432',
  hostname: 'localhost',
  hash: null,
  search: null,
  query: null,
  pathname: '/example',
  path: '/example',
  href: 'postgres://admin:octopus@localhost:5432/example'
//    dialect: 'postgres',
//    protocol: 'postgres',
//    dialectOptions: {
//      ssl: {
//        require: true,
//        rejectUnauthorized: false
//      }
//    }
  });

let cbwTurnsTable = sequelize.define('cbwTurnsTable', {
  time: {
    type: Datatypes.DATE, 
    primaryKey: true, 
    allowNull: false
  },
  //assetKey: {
  //  type: Datatypes.INTEGER, 
  //  primaryKey: true,
  //  allowNull: false
  //},
  exitingProductID: {
    type: Datatypes.INTEGER,
    allowNull: false
  },
  enteringProductID: {
    type: Datatypes.INTEGER,
    allowNull: false
  }
}, {timestamps: false});

let eventSourceTable = sequelize.define('eventSourceTable', {
  macAddress: {
    type: Datatypes.TEXT, 
    primaryKey: true, 
    allowNull: false
  },
  //eventSourceID: {
  //  type: Datatypes.INTEGER, 
  //  allowNull: false
  //},
  //assetKey: {
  //  type: Datatypes.INTEGER,
  //  allowNull: false
  //},
  weightedSum: {
    type: Datatypes.FLOAT,
    allowNull: false
  }
}, {timestamps: false});

let sensorEventTable = sequelize.define('sensorEventTable', {
  time: {
    type: Datatypes.DATE, 
    primaryKey: true, 
    allowNull: false
  },
  //eventSourceID: {
  //  type: Datatypes.INTEGER, 
  //  primaryKey: true, 
  //  allowNull: false
  //},
  //assetKey: {
  //  type: Datatypes.INTEGER, 
  //  allowNull: false
  //},
  //employeeID: {
  //  type: Datatypes.INTEGER, 
  //  allowNull: false
  //},
  weightedSum: {
    type: Datatypes.FLOAT, 
    allowNull: false
  },
  //productID: {
  //  type: Datatypes.INTEGER,
  //  allowNull: false
  //}
}, {timestamps: false});

let coachingMomentTable = sequelize.define('coachingMomentTable', {
  time: {
    type: Datatypes.DATE, 
    primaryKey: true, 
    allowNull: false
  },
  employeeID: {
    type: Datatypes.INTEGER, 
    primaryKey: true, 
    allowNull: false
  },
  managerID: {
    type: Datatypes.INTEGER, 
    allowNull: false
  },
  note: {
    type: Datatypes.TEXT,
    allowNull: false
  }
}, {timestamps: false});

let productTable = sequelize.define('productTable', {
  //productID: {
  //  type: Datatypes.INTEGER,
  //  primaryKey: true, 
  //  allowNull: false
  //},
  productName: {
    type: Datatypes.TEXT,
    allowNull: false
  },
  weight: {
    type: Datatypes.FLOAT,
    allowNull: false
  }
}, {timestamps: false});

let machineStatusTable = sequelize.define('machineStatusTable', {
  time: {
    type: Datatypes.DATE, 
    primaryKey: true, 
    allowNull: false
  },
  //assetKey: {
  //  type: Datatypes.INTEGER, 
  //  primaryKey: true, 
  //  allowNull: false
  //},
  status: {
    type: Datatypes.TEXT, 
    allowNull: false
  },
  //productID: {
  //  type: Datatypes.INTEGER, 
  //  allowNull: false
  //}
}, {timestamps: false});

let resourceUsageTable = sequelize.define('resourceUsageTable', {
  time: {
    type: Datatypes.DATE, 
    primaryKey: true, 
    allowNull: false
  },
  //meterID: {
  //  type: Datatypes.INTEGER, 
  //  primaryKey: true, 
  //  allowNull: false
  //},
  usageIncrement: {
    type: Datatypes.FLOAT, 
    allowNull: false
  },
  unit: {
    type: Datatypes.TEXT, 
    allowNull: false
  },
  type: {
    type: Datatypes.TEXT, 
    allowNull: false
  },
  //assetKey: {
  //  type: Datatypes.INTEGER, 
  //  allowNull: false
  //}
}, {timestamps: false});

let meterTable = sequelize.define('meterTable', {
  //meterID: {
  //  type: Datatypes.INTEGER, 
  //  primaryKey: true, 
  //  allowNull: false
  //},
  usageIncrement: {
    type: Datatypes.FLOAT, 
    allowNull: false
  },
  unit: {
    type: Datatypes.TEXT, 
    allowNull: false
  },
  type: {
    type: Datatypes.TEXT, 
    allowNull: false
  },
  //assetKey: {
  //  type: Datatypes.INTEGER, 
  //  allowNull: false
  //}
}, {timestamps: false});

let assetTable = sequelize.define('assetTable', {
  //assetKey: {
  //  type: Datatypes.INTEGER, 
  //  allowNull: false
  //},
  assetName: {
    type: Datatypes.TEXT, 
    allowNull: false
  },
  status: {
    type: Datatypes.TEXT, 
    allowNull: false
  }
}, {timestamps: false});

let employeeTable = sequelize.define('employeeTable', {
  //employeeID: {
  //  type: Datatypes.INTEGER, 
  //  primaryKey: true,
  //  allowNull: false
  //},
  employeeName: {
    type: Datatypes.TEXT, 
    allowNull: false
  }
}, {timestamps: false});

let locationTable = sequelize.define('locationTable', {
  time: {
    type: Datatypes.DATE, 
    primaryKey: true, 
    allowNull: false
  },
  //employeeID: {
  //  type: Datatypes.INTEGER, 
  //  primaryKey: true,
  //  allowNull: false
  //},
  //assetKey: {
  //  type: Datatypes.INTEGER, 
  //  allowNull: false
  //},
  //productID: {
  //  type: Datatypes.INTEGER, 
  //  allowNull: false
  //}
}, {timestamps: false});
// ========== JOINS ====================
//assetTable.hasOne(cbwTurnsTable );
cbwTurnsTable.belongsTo(assetTable, {as: "cbw_asset"});

//assetTable.hasMany(eventSourceTable );
eventSourceTable.belongsTo(assetTable, {as: "event_asset"});

//eventSourceTable.hasMany(sensorEventTable);
sensorEventTable.belongsTo(eventSourceTable, {as: "eventSource"});

//assetTable.hasMany(sensorEventTable);
sensorEventTable.belongsTo(assetTable, {as: "event_asset"});

//employeeTable.hasMany(sensorEventTable);
sensorEventTable.belongsTo(employeeTable, {as: "event_employee"});

//productTable.hasMany(sensorEventTable);
sensorEventTable.belongsTo(productTable, {as: "event_product"});

//assetTable.hasMany(machineStatusTable);
machineStatusTable.belongsTo(assetTable, {as: "status_asset"});

//productTable.hasMany(machineStatusTable);
machineStatusTable.belongsTo(productTable, {as: "status_product"});

//meterTable.hasMany(resourceUsageTable, );
resourceUsageTable.belongsTo(meterTable, {as: "resource_meter"});

//assetTable.hasMany(resourceUsageTable);
resourceUsageTable.belongsTo(assetTable, {as: "resource_asset"});

//employeeTable.hasMany(locationTable);
locationTable.belongsTo(employeeTable, {as: "location_employee"});

//assetTable.hasMany(locationTable);
locationTable.belongsTo(assetTable, {as: "location_asset"});

//productTable.hasMany(locationTable);
locationTable.belongsTo(productTable,{as: "location_product"});
// ==========================================
//

(async () => {
	await sequelize.sync({ force: true });
	console.log("All models were synchronized successfully.");
})();

//(async () => {
//	await sequelize.query('SET FOREIGN_KEY_CHECKS=0', {raw : true}).then(function() {
//			sequelize.sync()
//			console.log("All models were synchronized successfully.");
//		}
//	);
//})();
//employeeTable.sync({ alter: true }).then(() => console.log("Sync employeeTable complete"));
//assetTable.sync({ alter: true }).then(() => console.log("Sync assetTable complete"));
//meterTable.sync({ alter: true }).then(() => console.log("Sync meterTable complete"));
//productTable.sync({ alter: true }).then(() => console.log("Sync productTable complete"));
//eventSourceTable.sync({ alter: true }).then(() => console.log("Sync eventSourceTable complete"));
//coachingMomentTable.sync({ alter: true }).then(() => console.log("Sync coachingMomentTable complete"));
//cbwTurnsTable.sync({ alter: true }).then(() => console.log("Sync cbwTurnsTable complete"));
//machineStatusTable.sync({ alter: true }).then(() => console.log("Sync machineStatusTable complete"));
//resourceUsageTable.sync({ alter: true }).then(() => console.log("Sync resourceUsageTable complete"));
//locationTable.sync({ alter: true }).then(() => console.log("Sync locationTable complete"));
//sensorEventTable.sync({ alter: true }).then(() => console.log("Sync sensorEventTable complete"));

app.get('/', async (req, res) => {
	res.status(200).send('hello');
})


// editable table receives data from user interaction on 
// web page
const meterTableInsert = async (data) => {
	// UPDATE IF RECORD EXISTS
        const success = await meterTable.upsert({
		resource_meter: data.meterID,
		usageIncrement: data.usageIncrement,
		unit: data.unit,
		type: data.type,
		meter_asset: data.assetKey,
        });
	return success;
};
const locationTableInsert = async (data) => {
    const time = new Date().getTime();
	// update comes from Bluetooth Server, data contains employeeID & assetKey
	// query productID from MachineStatusTable
	console.log('data', data);
    const machineStatusRow = await machineStatusTable.findOne({
	    where: {
		    status_asset: data.assetKey
	    }
    });
    const success = await locationTable.create({
		time: time,
		location_employee: data.employeeID,
		location_asset: data.assetKey,
		location_product: machineStatusRow["dataValues"]["location_product"]
    });
    return success;
};
// editable table receives data from user interaction of 
// web page
const employeeTableInsert = async (data) => {
	// UPDATE IF RECORD EXISTS
    const success = await employeeTable.upsert({
		event_employee: data.employeeID,
		location_employee: data.employeeID,
		employeeName: data.employeeName
	});
    return success;
};
// editable table receives data from user interaction of 
// web page
const assetTableInsert = async (data) => {
	// UPDATE IF RECORD EXISTS
    const success = await assetTable.upsert({
		cbw_asset: data.assetKey,
		meter_asset: data.assetKey,
		event_asset: data.assetKey,
		status_asset: data.assetKey,
		resource_asset: data.assetKey,
		location_asset: data.assetKey,
		assetName: data.assetName,
		status: data.status
        });
    return success;
};
const resourceUsageTableInsert = async (data) => {
    const time = new Date().getTime();
	// query usageIncrement, unit, type, assetKey from meterTable 
    const meterTableRow = await meterTable.findAll({
	    where: {
		    resource_asset: data.meterID
	    }
    });
    const success = await resourceUsageTable.create({
		time: time,
		resource_meter: data.meterID,
		usageIncrement: meterTableRow[0]["dataValues"]["usageIncrement"],
		unit: meterTableRow[0]["dataValues"]["unit"],
		type: meterTableRow[0]["dataValues"]["type"],
		resource_asset: meterTableRow[0]["dataValues"]["resource_asset"]
        });
    return success;
};
const machineStatusTableInsert = async (data) => {
    const time = new Date().getTime();
	// query status from assetTable
    const assetTableRow = await assetTable.findAll({
	    where: {
		    status_asset: data.assetKey
	    }
    });
    const success = await machineStatusTable.create({
		time: time,
		status_asset: data.assetKey, 
		status: assetTableRow[0]["dataValues"]["status"],
		status_product: data.productID
        })
    return success;
};
// editable table receives data from user interaction of 
// web page
const productTableInsert = async (data) => {
	// UPDATE IF RECORD EXISTS
    const success = await productTable.upsert({
		event_product: data.productID,
		location_product: data.productID,
		status_product: data.productID,
		productName: data.productName,
		weight: data.weight
        });
    return success;
};
// editable table receives data from user interaction of 
// web page
const coachingMomentTableInsert = async (data) => {
	// UPDATE IF RECORD EXISTS
    const time = new Date().getTime();
    const success = await coachingMomentTable.upsert({
		time: time,
		employeeID: data.employeeID,
		managerID: data.managerID,
		note: data.note
        });
    return success;
};
const sensorEventTableInsert = async (data) => {
    const time = new Date().getTime();
    const eventSourceRow = await eventSourceTable.findAll({
	    where: {
		    macAddress: data.macAddress
	    }
    });

	console.log('eventSourceRow', eventSourceTable)
	// findOne only returns most recent matching entry
    const locationRow = await locationTable.findOne({
	    where: {
		    location_asset: eventSourceRow[0]["dataValues"]["event_asset"]

	    }
    });
	// query eventSourceID, assetKey, weightedSum from eventSourceTable
	// employeeID, productID from locationTable
    const success = await sensorEventTable.create({
		time: time,
		eventSource: eventSourceRow[0]["dataValues"]["eventSource"],
		event_asset: eventSourceRow[0]["dataValues"]["event_asset"],
		event_employee: locationRow["dataValues"]["event_employee"],
		weightedSum: eventSourceRow[0]["dataValues"]["weightedSum"],
		event_product: locationRow["dataValues"]["event_product"]
        });
    return success;
};
// editable table receives data from user interaction of 
// web page
const eventSourceTableInsert = async (data) => {
	// UPDATE IF RECORD EXISTS
    const time = new Date().getTime();
    const success = await eventSourceTable.upsert({
		macAddress: data.macAddress,
		eventSource: data.eventSource,
		event_asset: data.assetKey,
		weightedSum: data.weightedSum,
        });
    return success;
};
const cbwTurnsTableInsert = async (data) => {
    const time = new Date().getTime();
	// query assetKey from eventSourceTable
	console.log('data', data)
    const row = await eventSourceTable.findAll({
	    where: {
		    macAddress: data.macAddress
	    }
    });
    const success = await cbwTurnsTable.create({
	  time: time,
	  cbw_asset: row[0]["dataValues"]["cbw_asset"],
	  exitingProductID: data.exitingProductID,
	  enteringProductID: data.enteringProductID
        })
    return success;
};

const tester = async (data) => {
	return new Promise((resolve, reject) => {
		setTimeout(() => {
			resolve({row:data});
		});
	});
}
const formatAsHours = async (timePeriod) => {
	// query data time stamp 
};


const formatAsPieces = async (timePeriod) => {
	// TODO filter by time period
	// query returns: [timestamp, machine, person, product]
	
	// const pieceEventData = await sensorEventTable.findAll({
	// 	include: [
	// 		{ model: eventSourceTable },
	// 		{ model: assetTable },
	// 		{ model: employeeTable },
	// 		{ model: productTable }
	// 	]
	// });
	 const pieceEventData = await sensorEventTable.findAll({
	 	include: [
	 		{ model: eventSourceTable, as: 'eventSourceID', required: true },
	 		{ model: assetTable, as: 'assetKey', required: true },
	 		{ model: employeeTable, as: 'employeeID', required: true },
	 		{ model: productTable, as: 'productID', required: true }
	 	]
	 });
	// const pieceEventData = await sensorEventTable.findAll({
	// 	include: {all : true, nested : true}
	// });
	return pieceEventData;
};
const formatAsProductivity = async (timePeriod) => {
};
const formatAsResourceUsage = async (timePeriod) => {
};

let formatterFunctions = {
	'hours' : formatAsHours,
	'pieces' : formatAsPieces,
	'productivity' : formatAsProductivity,
	'resourceUsage' : formatAsResourceUsage,
};
let validTables = {
	'locationTable' : locationTable,
	'employeeTable' : employeeTable,
	'assetTable' : assetTable,
	'resourceUsageTable' : resourceUsageTable,
	'machineStatusTable' : machineStatusTable,
	'productTable' : productTable,
	'coachingMomentTable' : coachingMomentTable,
	'sensorEventTable' : sensorEventTable,
	'eventSourceTable' : eventSourceTable,
	'meterTable' : meterTable,
	'tester' : tester,
	'cbwTurnsTable' : cbwTurnsTable
}
let insertFunctions = {
	'locationTable' : locationTableInsert,
	'employeeTable' : employeeTableInsert,
	'assetTable' : assetTableInsert,
	'resourceUsageTable' : resourceUsageTableInsert,
	'machineStatusTable' : machineStatusTableInsert,
	'productTable' : productTableInsert,
	'coachingMomentTable' : coachingMomentTableInsert,
	'sensorEventTable' : sensorEventTableInsert,
	'eventSourceTable' : eventSourceTableInsert,
	'meterTable' : meterTableInsert,
	'cbwTurnsTable' : cbwTurnsTableInsert
}

app.post('/insert/b/:table', async (req, res, next) => {
    try {
	let table = req.params.table; 
	if (!Object.keys(validTables).includes(table)) {
	        res.status(400).send();
	}
	let data = req.body;
	console.log('inserting into ', table);
	const handler = insertFunctions[table];
	const success = await handler(data);
	res.status(200).send(success);
    } catch (e) {
	return next(e);
    }
});
app.post('/insert/chunk/:table', async (req, res, next) => {
    try {
	let table = req.params.table; 
	console.log('table: ', table);
	if (!Object.keys(validTables).includes(table)) {
	        res.status(400).send();
	}
	let data = req.body.data;
	console.log('data: ', data);
	const handler = insertFunctions[table];
	let success = [];
	let current = null;
	for (let i = 0; i < data.length; i ++) {
		console.log("data[i]", data[i]);
		current = await handler(data[i]);
		success.push(current);
		console.log("success", success);
	}
	res.status(200).send(success);
    } catch (e) {
	return next(e);
    }
});
app.post('/insert/migrate', async (req, res, next) => {
    try {
	let data = req.body.data;
	let firstEntry = data[0];
	let fields = Object.keys(firstEntry);
	let keyMap = ["time","assetKey","exitingProductID","enteringProductID","employeeID","ProductID","meterID","usageIncrement","unit","type","status","eventSourceID","weightedSum"];
	let flags = fields.map((x, i) => {
	return keyMap.includes(x) ? Math.pow(2, keyMap.indexOf(x)) : 0;
	});

	let total = flags.reduce((prev, curr) => {
	    return prev + curr;
	});
	
	let handler = null;
	if (total === 15) {
		handler = async (data) =>  { 
			cbwTurnsTable.create({
			// the + operator coerces the string data.time into a number
			      time: +data.time,
			      assetKey: data.assetKey,
			      exitingProductID: data.exitingProductID,
			      enteringProductID: data.enteringProductID
			    })
		};
	} else if (total === 51) {
		handler = async (data) => {
			locationTable.create({
			// the + operator coerces the string data.time into a number
				time: +data.time,
				employeeID: data.employeeID,
				assetKey: data.assetKey,
				productID: data.productID,
			});
		};
	} else if (total === 963) {
		handler = async (data) => {
			resourceUsageTable.create({
			// the + operator coerces the string data.time into a number
				time: +data.time,
				meterID: data.meterID,
				usageIncrement: data.usageIncrement,
				unit: data.unit, 
				type: data.type,
				assetKey: data.assetKey,
			});
		};
	} else if (total === 1059) {
		handler = async (data) => { 
			machineStatusTable.create({
			// the + operator coerces the string data.time into a number
				time: +data.time,
				assetKey: data.assetKey, 
				status: data.status,
				productID: data.productID
			})
		};
	} else if (total === 6195) {
		handler = async (data) => {
			sensorEventTable.create({
			// the + operator coerces the string data.time into a number
				time: +data.time,
				eventSourceID: data.eventSourceID,
				assetKey: data.assetKey,
				employeeID: data.employeeID,
				weightedSum: data.weightedSum,
				productID: data.productID,
			});
		};

	} else {
		//throw error
	        res.status(400).send('fields don"t match database');
	}

	let success = [];
	let current = null;

	//catch case where handler remains null somehow? 
	//-----------------------------------
	if (handler === null) { return next(e) };
	//-----------------------------------

	for (let i = 0; i < data.length; i ++) {
		console.log("data[i]", data[i]);
		current = await handler(data[i]);
		success.push(current);
		console.log("success", success);
	}
	res.status(200).send(success);
    } catch (e) {
	return next(e);
    }


});

app.post('/delete/:table', async (req, res, next) => {
    try {
	const table = req.params.table; 
	const body = req.body;
	const tableHandle = validTables[table];
	const row = await tableHandle.destroy({
		where: {
			[Sequelize.Op.and]: [
				body
			]
		}
	});
        res.json(row);
    } catch (e) {
	return next(e);
    }
})
app.get('/read/format', async (req, res, next) => {
    try {
	const row = await sensorEventTable.findAll({
	 	include: [
	 		{ model: assetTable, as: 'assetKey', required: true },
	 		{ model: employeeTable, as: 'employeeID', required: true },
	 	]
	});
	res.json(row);
    } catch (e) {
	return next(e);
    }
})
app.post('/read/:table', async (req, res, next) => {
    try {
	const table = req.params.table; 
	const body = req.body;
	const tableHandle = validTables[table];
	const row = await tableHandle.findAll(body);
        res.json(row);
    } catch (e) {
	return next(e);
    }
})
app.get('/read/:table', async (req, res, next) => {
    try {
	const table = req.params.table; 
	const tableHandle = validTables[table];
	const row = await tableHandle.findAll();
        res.json(row);
    } catch (e) {
	return next(e);
    }
})
app.get('/data/:format/:start/:end', async (req, res, next) => {
	try {
		let format = req.params.format;
		let startDate = req.params.start;
		let endDate = req.params.end;
		const formatterHandle = formatterFunctions[format];
		let result = await formatterHandle("replace me with date range");
		res.json(result);
	} catch (e) {
		return next(e);
	}
});

//
app.get('/query/:table/:data', async (req, res) => {

    try {
	let table = req.params.table; 
	let data = req.params.data; 
	const handler = validTables[table];
	const word = await handler(data);
        res.json(word);
    } catch (e) {
	return next(e);
    }
    //res.send(`${table} and ${data} = ${word}`);
    // check that the table exists
    //if (!Object.keys(validTables).includes(table)) {
    //        res.status(400).send();
    //}
    // get the user agent and current time
});

//
//sequelize.authenticate().then(() => {
//  console.log("connected successfully");
//}).catch(err => {
//  console.error("Unable to connect", err);
//});

app.listen(port, () => console.log(`listening at http://localhost:${port}`));
