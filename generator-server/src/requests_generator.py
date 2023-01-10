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
    data = {'macAddress':'00-B0-D0-63-28','assetKey':'1', 'exitingProductID':'44', 'enteringProductID':'44'}
    send_event_minutely(url, data)
