import json 
from multiprocessing import Process
import time
import os
import webbrowser
import requests

def send_event_minutely(url, data, repeat):
        x = requests.post(url, json = data)
        print(x.text)
        while repeat > 0:
            x = requests.post(url, json = data)
            print(x.text)
            time.sleep(repeat)


if __name__ == '__main__':
    process_handles = []


    params = [
        {'url' : 'http://localhost:8000/insert/b/sensorEventTable', 'data' : {'macAddress':'FF-23-AB-0B-55'} },
        {'url' : 'http://localhost:8000/insert/b/sensorEventTable', 'data' : {'macAddress':'44-23-AB-0B-44'} },
       {'url' : 'http://localhost:8000/insert/b/sensorEventTable', 'data' : {'macAddress':'44-23-AB-0B-45'} },
        {'url' : 'http://localhost:8000/insert/b/machineStatusTable', 'data' : {'assetKey':'3','productID':'44'}},
        {'url' : 'http://localhost:8000/insert/b/machineStatusTable', 'data' : {'assetKey':'2','productID':'44'}},
        {'url' : 'http://localhost:8000/insert/b/machineStatusTable', 'data' : {'assetKey':'1','productID':'22'}},
        {'url' : 'http://localhost:8000/insert/b/locationTable', 'data' : {'assetKey':'1','employeeID':'1'}},
        {'url' : 'http://localhost:8000/insert/b/locationTable', 'data' : {'assetKey':'3','employeeID':'2'}},
        {'url' : 'http://localhost:8000/insert/b/locationTable', 'data' : {'assetKey':'2','employeeID':'3'}},
        {'url' : 'http://localhost:8000/insert/b/resourceUsageTable', 'data' : {'meterID':'1'}},
        {'url' : 'http://localhost:8000/insert/b/resourceUsageTable', 'data' : {'meterID':'2'}},
            ]
    params2 = [
        {'url' : 'http://localhost:8000/insert/b/cbwTurnsTable', 'data' : {'macAddress':'44-23-AB-0B-44', 'exitingProductID':'44', 'enteringProductID':'44'}},
        {'url' : 'http://localhost:8000/insert/b/cbwTurnsTable', 'data' : {'macAddress':'44-23-AB-0B-45', 'exitingProductID':'22', 'enteringProductID':'22'}},
            ]
    params3 =[
        {'url' : 'http://localhost:8000/insert/b/eventSourceTable', 'data' : {'macAddress':'44-23-AB-0B-45','eventSourceID':'1', 'assetKey':'3','weightedSum':'1'}},
        {'url' : 'http://localhost:8000/insert/b/eventSourceTable', 'data' : {'macAddress':'44-23-AB-0B-44','eventSourceID':'2', 'assetKey':'2','weightedSum':'1'}},
        {'url' : 'http://localhost:8000/insert/b/eventSourceTable', 'data' : {'macAddress':'FF-23-AB-0B-55','eventSourceID':'3', 'assetKey':'1','weightedSum':'1'}},

        {'url' : 'http://localhost:8000/insert/b/productTable', 'data' : {'productID':'44','productName':'pillow slip', 'weight':'0.7'}},
        {'url' : 'http://localhost:8000/insert/b/productTable', 'data' : {'productID':'22','productName':'king sheet', 'weight':'1.1'}},

        {'url' : 'http://localhost:8000/insert/b/assetTable', 'data' : {'assetKey':'1','assetName':'CBW 1', 'status':'running'}},
        {'url' : 'http://localhost:8000/insert/b/assetTable', 'data' : {'assetKey':'2','assetName':'CBW 2', 'status':'running'}},
        {'url' : 'http://localhost:8000/insert/b/assetTable', 'data' : {'assetKey':'3','assetName':'Ironer 3', 'status':'running'}},

        {'url' : 'http://localhost:8000/insert/b/meterTable', 'data' : {'meterID':'1', 'usageIncrement':'30', 'unit':'m3', 'type':'water','assetKey':'1'}},
        {'url' : 'http://localhost:8000/insert/b/meterTable', 'data' : {'meterID':'2', 'usageIncrement':'30', 'unit':'m3', 'type':'water','assetKey':'2'}},
        {'url' : 'http://localhost:8000/insert/b/employeeTable', 'data' : {'employeeID':'1','employeeName':'peter'}},
        {'url' : 'http://localhost:8000/insert/b/employeeTable', 'data' : {'employeeID':'2','employeeName':'james'}},
        {'url' : 'http://localhost:8000/insert/b/employeeTable', 'data' : {'employeeID':'3','employeeName':'tony'}},
    ]


    for w in params3: 
        process_handles.append(Process(target=send_event_minutely, args=(w['url'], w['data'], 0)))

    for z in params2: 
        process_handles.append(Process(target=send_event_minutely, args=(z['url'], z['data'], 120)))

    for x in params:
        process_handles.append(Process(target=send_event_minutely, args=(x['url'], x['data'], 30)))



    for y in process_handles:
        y.start()


