import json 
from multiprocessing import Process
import time
import os
import webbrowser
import requests

def send_event_minutely(url, data, repeat):
        while repeat > 0:
            x = requests.post(url, json = data)
            print(x)
            print(x.text)
            time.sleep(repeat)
        x = requests.post(url, json = data)
        print(x)
        print(x.text)


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
        {'url' : 'http://localhost:8000/insert/b/employeeTable', 'data' : {'employeeID':'1','employeeName':'peter'}},
        {'url' : 'http://localhost:8000/insert/b/employeeTable', 'data' : {'employeeID':'2','employeeName':'james'}},
        {'url' : 'http://localhost:8000/insert/b/employeeTable', 'data' : {'employeeID':'3','employeeName':'tony'}},
            ]
    Static = [

        {'url' : 'http://localhost:8000/insert/b/assetTable', 'data' : {'assetKey':'1','assetName':'CBW 1', 'status':'running'}},
        {'url' : 'http://localhost:8000/insert/b/assetTable', 'data' : {'assetKey':'2','assetName':'CBW 2', 'status':'running'}},
        {'url' : 'http://localhost:8000/insert/b/assetTable', 'data' : {'assetKey':'3','assetName':'Ironer 3', 'status':'running'}},

        {'url' : 'http://localhost:8000/insert/b/productTable', 'data' : {'productID':'44','productName':'pillow slip', 'weight':'0.7'}},
        {'url' : 'http://localhost:8000/insert/b/productTable', 'data' : {'productID':'22','productName':'king sheet', 'weight':'1.1'}},


        {'url' : 'http://localhost:8000/insert/b/meterTable', 'data' : {'meterID':'1', 'usageIncrement':'30', 'unit':'m3', 'type':'water','assetKey':'1'}},
        {'url' : 'http://localhost:8000/insert/b/meterTable', 'data' : {'meterID':'2', 'usageIncrement':'30', 'unit':'m3', 'type':'water','assetKey':'2'}},

    ]
    Source = [
        {'url' : 'http://localhost:8000/insert/b/eventSourceTable', 'data' : {'macAddress':'AABB','eventSourceID':'1', 'assetKey':'1','weightedSum':'1'}},
        {'url' : 'http://localhost:8000/insert/b/eventSourceTable', 'data' : {'macAddress':'BBAA','eventSourceID':'2', 'assetKey':'2','weightedSum':'1'}},
            ]
    machineStatus = [
            {'url' : 'http://localhost:8000/insert/b/machineStatusTable', 'data' : {'assetKey':'1', 'productID':'22'}},
            {'url' : 'http://localhost:8000/insert/b/machineStatusTable', 'data' : {'assetKey':'2', 'productID':'44'}},
            ]
    SensorEvent = [
        {'url' : 'http://localhost:8000/insert/b/sensorEventTable', 'data' : {'macAddress':'AABB'}},
            ]
    Location = [
            {'url' : 'http://localhost:8000/insert/b/locationTable', 'data' : {'employeeID':'1', 'assetKey':'1'}},
            {'url' : 'http://localhost:8000/insert/b/locationTable', 'data' : {'employeeID':'2', 'assetKey':'2'}},
            ]

    for t in Source: 
        process_handles.append(Process(target=send_event_minutely, args=(t['url'], t['data'], 0)))

    for t in employee: 
        process_handles.append(Process(target=send_event_minutely, args=(t['url'], t['data'], 0)))
#
    for w in Static: 
        process_handles.append(Process(target=send_event_minutely, args=(w['url'], w['data'], 0)))
#
    for z in cbw: 
        process_handles.append(Process(target=send_event_minutely, args=(z['url'], z['data'], 0)))
##
##    for x in params:
##        process_handles.append(Process(target=send_event_minutely, args=(x['url'], x['data'], 0)))
#
    for a in machineStatus: 
       process_handles.append(Process(target=send_event_minutely, args=(a['url'], a['data'], 0)))

    for b in SensorEvent: 
        process_handles.append(Process(target=send_event_minutely, args=(b['url'], b['data'], 0)))

    for c in Location: 
        process_handles.append(Process(target=send_event_minutely, args=(c['url'], c['data'], 0)))

    for y in process_handles:
        y.start()


