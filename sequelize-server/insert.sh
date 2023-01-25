#!/bin/bash


#/usr/bin/curl -X POST http://localhost:8000/insert/b/employeeTable -H Content-Type:application/json -H Accept:application/json -d '{"employeeID":"3", "employeeName":"Goe Goe"}'

#/usr/bin/curl -X POST http://localhost:8000/insert/employeeTable -H Content-Type:application/json -H Accept:application/json -d '{"employeeID":"45", "employeeName":"Ann ecks"}'
#
#
/usr/bin/curl -X POST http://localhost:8000/insert/chunk/employeeTable -H Content-Type:application/json -H Accept:application/json -d '{ "data":
	[
		{"employeeID":"1","employeeName":"Joe"},
		{"employeeID":"2","employeeName":"alex"},
		{"employeeID":"3","employeeName":"mike"}
	]
}'

