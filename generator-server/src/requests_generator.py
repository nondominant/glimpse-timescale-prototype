import json 
import time
import os
import webbrowser
import requests

def send_event_minutely(url, data):
    while True:
        x = requests.post(url, json = data)
        print(x.text)
        time.sleep(120)


if __name__ == '__main__':
    url = 'http://localhost:8000/insert/b/cbwTurnsTable'
    data = {'macAddress':'44-23-AB-0B-44', 'exitingProductID':'44', 'enteringProductID':'44'}
    send_event_minutely(url, data)

    url = 'http://localhost:8000/insert/b/resourceUsageTable'
    data = {'meterID':'1'}
    send_event_minutely(url, data)

    url = 'http://localhost:8000/insert/b/machineStatusTable'
    data = {'assetKey':'1','productID':'44'}
    send_event_minutely(url, data)

    url = 'http://localhost:8000/insert/b/locationTable'
    data = {'assetKey':'1','employeeID':'44'}
    send_event_minutely(url, data)

    url = 'http://localhost:8000/insert/b/sensorEventTable'
    data = {'macAddress':'FF-23-AB-0B-55', 'exitingProductID':'44', 'enteringProductID':'44'}
    send_event_minutely(url, data)
