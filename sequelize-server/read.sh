#!/bin/bash


/usr/bin/curl -X POST http://localhost:8000/read/employeeTable -H Content-Type:application/json -H Accept:application/json -d '{"where":{"employeeID":1}}'

