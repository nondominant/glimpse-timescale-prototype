import json 
from multiprocessing import Process
import time
import os
import webbrowser
import requests

def send_event_minutely(url, data, repeat):
        while repeat > 0:
            x = requests.post(url, json = data)
            time.sleep(repeat)
        x = requests.post(url, json = data)


if __name__ == '__main__':
    process_handles = []


    resource = [
        {'url' : 'http://localhost:8000/insert/b/resourceUsageTable', 'data' : {'meterID':'1'}},
        {'url' : 'http://localhost:8000/insert/b/resourceUsageTable', 'data' : {'meterID':'2'}},
            ]
    cbw = [
        {'url' : 'http://localhost:8000/insert/b/cbwTurnsTable', 'data' : {'macAddress':'BBAA', 'exitingProductID':'44', 'enteringProductID':'44'}},
        #{'url' : 'http://localhost:8000/insert/b/cbwTurnsTable', 'data' : {'macAddress':'44-23-AB-0B-44', 'exitingProductID':'44', 'enteringProductID':'44'}},
        {'url' : 'http://localhost:8000/insert/b/cbwTurnsTable', 'data' : {'macAddress':'AABB', 'exitingProductID':'22', 'enteringProductID':'22'}},
        #{'url' : 'http://localhost:8000/insert/b/cbwTurnsTable', 'data' : {'macAddress':'44-23-AB-0B-45', 'exitingProductID':'22', 'enteringProductID':'22'}},
            ]
    employee = [
        {'url' : 'http://localhost:8000/insert/b/employeeTable', 'data' : {'employeeName':'peter'}},
        {'url' : 'http://localhost:8000/insert/b/employeeTable', 'data' : {'employeeName':'james'}},
        {'url' : 'http://localhost:8000/insert/b/employeeTable', 'data' : {'employeeName':'tony'}},
            ]
    Static = [

#        {'url' : 'http://localhost:8000/insert/b/assetTable', 'data' : {'assetName':'CBW 1', 'status':'running'}},
#        {'url' : 'http://localhost:8000/insert/b/assetTable', 'data' : {'assetName':'CBW 2', 'status':'running'}},
#        {'url' : 'http://localhost:8000/insert/b/assetTable', 'data' : {'assetName':'Ironer 3', 'status':'running'}},
#
#        {'url' : 'http://localhost:8000/insert/b/productTable', 'data' : {'productName':'pillow slip', 'weight':'0.7'}},
#        {'url' : 'http://localhost:8000/insert/b/productTable', 'data' : {'productName':'king sheet', 'weight':'1.1'}},
#

        {'url' : 'http://localhost:8000/insert/b/meterTable', 'data' : {'usageIncrement':'30', 'unit':'m3', 'type':'water','assetID':'1'}},
        {'url' : 'http://localhost:8000/insert/b/meterTable', 'data' : {'usageIncrement':'30', 'unit':'m3', 'type':'water','assetID':'2'}},

        ]
    Source = [
        {'url' : 'http://localhost:8000/insert/b/eventSourceTable', 'data' : {'macAddress':'AA:BB:CC:DD','assetID':'1','weightedSum':'1'}},
        {'url' : 'http://localhost:8000/insert/b/eventSourceTable', 'data' : {'macAddress':'XX:ZZ:BB:AA','assetID':'2','weightedSum':'1'}},
        ]
    machineStatus = [
        {'url' : 'http://localhost:8000/insert/b/machineStatusTable', 'data' : {'assetID':'1', 'productID':'22'}},
        {'url' : 'http://localhost:8000/insert/b/machineStatusTable', 'data' : {'assetID':'2', 'productID':'44'}},
        ]
    SensorEvent = [
        {'url' : 'http://localhost:8000/insert/b/sensorEventTable', 'data' : {'macAddress':'AABB'}},
        ]
    Location = [
        {'url' : 'http://localhost:8000/insert/b/locationTable', 'data' : {'employeeID':'1', 'assetID':'1'}},
        {'url' : 'http://localhost:8000/insert/b/locationTable', 'data' : {'employeeID':'2', 'assetID':'2'}},
        ]


    # resource usage
#    for r in resource: 
#        process_handles.append(Process(target=send_event_minutely, args=(r['url'], r['data'], 0)))

    # event source
#    for t in Source: 
#        process_handles.append(Process(target=send_event_minutely, args=(t['url'], t['data'], 0)))

#    for t in employee: 
#        process_handles.append(Process(target=send_event_minutely, args=(t['url'], t['data'], 0)))

    
    # asset table
    # product table
    # meter table
    for w in Static: 
        process_handles.append(Process(target=send_event_minutely, args=(w['url'], w['data'], 0)))
#
#    # cbw
#    for z in cbw: 
#        process_handles.append(Process(target=send_event_minutely, args=(z['url'], z['data'], 0)))
###
###    for x in params:
###        process_handles.append(Process(target=send_event_minutely, args=(x['url'], x['data'], 0)))
##
#    # machine status 
#    for a in machineStatus: 
#       process_handles.append(Process(target=send_event_minutely, args=(a['url'], a['data'], 0)))
#
#    # sensor event 
#    for b in SensorEvent: 
#        process_handles.append(Process(target=send_event_minutely, args=(b['url'], b['data'], 0)))
#
#    # location event
#    for c in Location: 
#        process_handles.append(Process(target=send_event_minutely, args=(c['url'], c['data'], 0)))

    for y in process_handles:
        y.start()


