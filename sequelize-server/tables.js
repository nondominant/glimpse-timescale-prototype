cbwTurnsTable.belongsTo(assetTable, {as: "cbw_asset"});

eventSourceTable.belongsTo(assetTable, {as: "event_asset"});

sensorEventTable.belongsTo(eventSourceTable, {as: "eventSource"});

sensorEventTable.belongsTo(assetTable, {as: "event_asset"});

sensorEventTable.belongsTo(employeeTable, {as: "event_employee"});

sensorEventTable.belongsTo(productTable, {as: "event_product"});

machineStatusTable.belongsTo(assetTable, {as: "status_asset"});

machineStatusTable.belongsTo(productTable, {as: "status_product"});

resourceUsageTable.belongsTo(meterTable, {as: "resource_meter"});

meterTable.belongsTo(assetTable, {as: "meter_asset"});

resourceUsageTable.belongsTo(assetTable, {as: "resource_asset"});

locationTable.belongsTo(employeeTable, {as: "location_employee"});

locationTable.belongsTo(assetTable, {as: "location_asset"});

locationTable.belongsTo(productTable,{as: "location_product"});
