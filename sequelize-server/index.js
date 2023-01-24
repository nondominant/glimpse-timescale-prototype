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
  assetKey: {
    type: Datatypes.INTEGER, 
    primaryKey: true,
    allowNull: false
  },
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
  eventSourceID: {
    type: Datatypes.INTEGER, 
    allowNull: false
  },
  assetKey: {
    type: Datatypes.INTEGER,
    allowNull: false
  },
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
  eventSourceID: {
    type: Datatypes.INTEGER, 
    primaryKey: true, 
    allowNull: false
  },
  assetKey: {
    type: Datatypes.INTEGER, 
    allowNull: false
  },
  employeeID: {
    type: Datatypes.INTEGER, 
    allowNull: false
  },
  weightedSum: {
    type: Datatypes.FLOAT, 
    allowNull: false
  },
  productID: {
    type: Datatypes.INTEGER,
    allowNull: false
  }
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
  productID: {
    type: Datatypes.INTEGER,
    primaryKey: true, 
    allowNull: false
  },
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
  assetKey: {
    type: Datatypes.INTEGER, 
    primaryKey: true, 
    allowNull: false
  },
  status: {
    type: Datatypes.TEXT, 
    allowNull: false
  },
  productID: {
    type: Datatypes.INTEGER, 
    allowNull: false
  }
}, {timestamps: false});

let resourceUsageTable = sequelize.define('resourceUsageTable', {
  time: {
    type: Datatypes.DATE, 
    primaryKey: true, 
    allowNull: false
  },
  meterID: {
    type: Datatypes.INTEGER, 
    primaryKey: true, 
    allowNull: false
  },
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
  assetKey: {
    type: Datatypes.INTEGER, 
    allowNull: false
  }
}, {timestamps: false});

let meterTable = sequelize.define('meterTable', {
  meterID: {
    type: Datatypes.INTEGER, 
    primaryKey: true, 
    allowNull: false
  },
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
  assetKey: {
    type: Datatypes.INTEGER, 
    allowNull: false
  }
}, {timestamps: false});

let assetTable = sequelize.define('assetTable', {
  assetKey: {
    type: Datatypes.INTEGER, 
    allowNull: false
  },
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
  employeeID: {
    type: Datatypes.INTEGER, 
    primaryKey: true,
    allowNull: false
  },
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
  employeeID: {
    type: Datatypes.INTEGER, 
    primaryKey: true,
    allowNull: false
  },
  assetKey: {
    type: Datatypes.INTEGER, 
    allowNull: false
  },
  productID: {
    type: Datatypes.INTEGER, 
    allowNull: false
  }
}, {timestamps: false});

(async () => {
	await sequelize.sync({ force: true });
	console.log("All models were synchronized successfully.");
})();

app.get('/', async (req, res) => {
	res.status(200).send('hello');
})


// editable table receives data from user interaction on 
// web page
const meterTableInsert = async (data) => {
	// UPDATE IF RECORD EXISTS
        const success = await meterTable.upsert({
		meterID: data.meterID,
		usageIncrement: data.usageIncrement,
		unit: data.unit,
		type: data.type,
		assetKey: data.assetKey,
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
		    assetKey: data.assetKey
	    }
    });
	console.log('machineStatusRow', machineStatusRow);
	console.log('machineStatusRow[0]["dataValues"]', machineStatusRow["dataValues"]);
    const success = await locationTable.create({
		time: time,
		employeeID: data.employeeID,
		assetKey: data.assetKey,
		productID: machineStatusRow["dataValues"]["productID"]
    });
    return success;
};
// editable table receives data from user interaction of 
// web page
const employeeTableInsert = async (data) => {
	// UPDATE IF RECORD EXISTS
    const success = await employeeTable.upsert({
		employeeID: data.employeeID,
		employeeName: data.employeeName
	});
    return success;
};
// editable table receives data from user interaction of 
// web page
const assetTableInsert = async (data) => {
	// UPDATE IF RECORD EXISTS
    const success = await assetTable.upsert({
		assetKey: data.assetKey,
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
		    meterID: data.meterID
	    }
    });
    const success = await resourceUsageTable.create({
		time: time,
		meterID: data.meterID,
		usageIncrement: meterTableRow[0]["dataValues"]["usageIncrement"],
		unit: meterTableRow[0]["dataValues"]["unit"],
		type: meterTableRow[0]["dataValues"]["type"],
		assetKey: meterTableRow[0]["dataValues"]["assetKey"]
        });
    return success;
};
const machineStatusTableInsert = async (data) => {
    const time = new Date().getTime();
	// query status from assetTable
    const assetTableRow = await assetTable.findAll({
	    where: {
		    assetKey: data.assetKey
	    }
    });
    const success = await machineStatusTable.create({
		time: time,
		assetKey: data.assetKey, 
		status: assetTableRow[0]["dataValues"]["status"],
		productID: data.productID
        })
    return success;
};
// editable table receives data from user interaction of 
// web page
const productTableInsert = async (data) => {
	// UPDATE IF RECORD EXISTS
    const success = await productTable.upsert({
		productID: data.productID,
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
		    assetKey: eventSourceRow[0]["dataValues"]["assetKey"]

	    }
    });
	// query eventSourceID, assetKey, weightedSum from eventSourceTable
	// employeeID, productID from locationTable
    const success = await sensorEventTable.create({
		time: time,
		eventSourceID: eventSourceRow[0]["dataValues"]["eventSourceID"],
		assetKey: eventSourceRow[0]["dataValues"]["assetKey"],
		employeeID: locationRow["dataValues"]["employeeID"],
		weightedSum: eventSourceRow[0]["dataValues"]["weightedSum"],
		productID: locationRow["dataValues"]["productID"]
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
		eventSourceID: data.eventSourceID,
		assetKey: data.assetKey,
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
	console.log('row', row)
	console.log('row[0]', row[0])
	console.log('row[0]["dataValues"]', row[0]["dataValues"])
	console.log('row[0]["dataValues"]["macAddress"]', row[0]["dataValues"]["macAddress"])
    const success = await cbwTurnsTable.create({
	  time: time,
	  assetKey: row[0]["dataValues"]["assetKey"],
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
	if (!Object.keys(validTables).includes(table)) {
	        res.status(400).send();
	}
	let data = req.body.data;
	let success = [];
	for (let i = 0; i < data.length; i ++) {
		const handler = insertFunctions[table];
		const current = await handler(data[i]);
		success.push(current);
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
	const body = req.body;
	const tableHandle = validTables[table];
	const row = await tableHandle.findAll();
        res.json(row);
    } catch (e) {
	return next(e);
    }
})

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
