# 2023-SDP-SmartWateringwithIoT


Smart Watering with IoT is a project that aims to reduce the impact that agriculture has on water scarcity and climate change.Hola

<img src ="https://user-images.githubusercontent.com/98182939/235264984-2705ff20-58a2-42c1-a56d-9852d024beb0.JPG" width="250" height="250"/><img src ="https://user-images.githubusercontent.com/98182939/235265296-2853f9e2-c113-44b5-98b1-2e7a51947bf5.PNG" width="150" height="250"/><img width="400" alt="Captura de pantalla 2023-04-28 a las 18 43 27" src="https://user-images.githubusercontent.com/98182939/235265696-79b816a2-424f-4729-b704-563a7aceddc8.png">

It consist of a device that has IoT sensors that measure: 
- temperature
- humidity
- pressure
- soil moisture
- soil ph 

This data is read thanks to an ESP32 and Wifi and it is send to ThingSpeak. ThingSpeak is a cloud platform that allows to read and analyze data. 
Once this data is in the cloud, it is send to a simple React Native App so that the user can see in real-time the data that its being
gathered from its crops. 

The user will receive alerts when the values collected are not in the optimal range so that he or she can make informed decisions 
on the irrigation schedules. 

Technologies used: 
- ThingSpeak: cloud platform MATLAB-based
- ESP32 as the microcontroller 
- BME280, soil moisture and soil pH sensors
- React Native App using Expo go 
- PlatformIO for the sensors' code
- 12V Baterry that gives power to the whole device

Future applications: 

Battery being charged by 20V solar panels. 
