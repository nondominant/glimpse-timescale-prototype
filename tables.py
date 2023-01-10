########## sensor events ################
cbwTurnsTable                                \
macAddress VARCHAR (25) NOT NULL,	      \

eventSourceTable                             \
macAddress VARCHAR (25) NOT NULL,	      \

sensorEventTable                             \
macAddress VARCHAR (25) NOT NULL,	      \

########## cron job updated ################
machineStatusTable                           \
assetKey INTEGER NOT NULL, 	              \
productID INTEGER NOT NULL, 	              \

########## user interface ################
coachingMomentTable                          \
employeeID INTEGER NOT NULL, 	              \
managerID INTEGER NOT NULL, 	              \
note VARCHAR (300) NOT NULL, 	              \

productTable                                 \
productID INTEGER NOT NULL, 	              \
productName VARCHAR (50) NOT NULL, 	      \
weight FLOAT4 NOT NULL, 	              \

resourceUsageTable                           \
meterID INTEGER NOT NULL, 	              \

meterTable                                   \
meterID INTEGER NOT NULL, 	              \
usageIncrement FLOAT4 NOT NULL, 	      \
unit VARCHAR (10) NOT NULL, 	              \
type VARCHAR (30) NOT NULL,  	              \
assetKey INTEGER NOT NULL, 	              \

assetTable                                   \
assetKey INTEGER NOT NULL, 	              \
assetName VARCHAR (50) NOT NULL, 	      \
status VARCHAR (30) NOT NULL, 	              \

employeeTable                                \
employeeID INTEGER NOT NULL, 	              \
employeeName VARCHAR (50) NOT NULL, 	      \

######### Bluetooth server updated ##########
locationTable                                \
employeeID INTEGER NOT NULL, 	              \
productID INTEGER, 	                      \







