#!/bin/bash

/usr/bin/curl -X POST http://localhost:8000/insert/assetTable -H Content-Type:application/json -H Accept:application/json -d '{"assetKey":"4", "assetName":"cbw 3 - dryer 1", "status":"emergency maintenance"}'

/usr/bin/curl -X POST http://localhost:8000/insert/employeeTable -H Content-Type:application/json -H Accept:application/json -d '{"employeeID":"1", "employeeName":"Joe Moe"}'

/usr/bin/curl -X POST http://localhost:8000/insert/employeeTable -H Content-Type:application/json -H Accept:application/json -d '{"employeeID":"45", "employeeName":"Ann ecks"}'

/usr/bin/curl -X POST http://localhost:8000/insert/cbwTurnsTable -H Content-Type:application/json -H Accept:application/json -d '{"macAddress":"00-B0-D0-63-C2-26", "exitingProductID": "44", "enteringProductID": "44"}'

/usr/bin/curl -X POST http://localhost:8000/insert/eventSourceTable -H Content-Type:application/json -H Accept:application/json -d '{"macAddress":"00-B0-D0-63-C2-26", "eventSourceID":"3", "assetKey":"4"}'

/usr/bin/curl -X POST http://localhost:8000/insert/coachingMomentTable -H Content-Type:application/json -H Accept:application/json -d '{"employeeID":"1", "managerID":"45", "note":"After speaking to X we have resolved the issue"}'

/usr/bin/curl -X POST http://localhost:8000/insert/productTable -H Content-Type:application/json -H Accept:application/json -d '{"productID":"44","productName":"bed sheets", "weight":"0.5"}'

/usr/bin/curl -X POST http://localhost:8000/insert/machineStatusTable -H Content-Type:application/json -H Accept:application/json -d '{"assetKey":"4", "productID":"44"}'

/usr/bin/curl -X POST http://localhost:8000/insert/meterTable -H Content-Type:application/json -H Accept:application/json -d '{"meterID":"9", "usageIncrement":"30", "unit":"m3", "type":"gas", "assetKey":"4"}'

/usr/bin/curl -X POST http://localhost:8000/insert/resourceUsageTable -H Content-Type:application/json -H Accept:application/json -d '{"meterID":"9"}'

/usr/bin/curl -X POST http://localhost:8000/insert/sensorEventTable -H Content-Type:application/json -H Accept:application/json -d '{"macAddress":"00-B0-D0-63-C2-26"}'

/usr/bin/curl -X POST http://localhost:8000/insert/locationTable -H Content-Type:application/json -H Accept:application/json -d '{"employeeID":"1", "productID":"44", "meterID":"9"}'

