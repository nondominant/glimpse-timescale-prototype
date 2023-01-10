#!/bin/bash


/usr/bin/curl -X POST http://localhost:8000/insert/b/employeeTable -H Content-Type:application/json -H Accept:application/json -d '{"employeeID":"3", "employeeName":"Goe Goe"}'

#/usr/bin/curl -X POST http://localhost:8000/insert/employeeTable -H Content-Type:application/json -H Accept:application/json -d '{"employeeID":"45", "employeeName":"Ann ecks"}'
#
#
#/usr/bin/curl -X POST http://localhost:8000/insert/eventSourceTable -H Content-Type:application/json -H Accept:application/json -d '{"macAddress":"00-B0-D0-63-C2-26", "eventSourceID":"3", "assetKey":"4"}'

