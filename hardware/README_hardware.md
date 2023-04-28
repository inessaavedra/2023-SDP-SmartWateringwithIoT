# Hardware of Smart Watering with IoT
## Schematics: 
![kiCad](https://user-images.githubusercontent.com/98182939/235266730-c6779ff9-2494-4e84-bc26-0b6b1cff5a31.jpg)


The hardware of the project consists of: 
- 3 IoT sensors: BME280, Soil Moisture, Soil pH
- ESP32 microcontroller
- 12V battery

The microcontroller and the board is integrated in a weatherproof box and has connectors for the sensors that need to go to the crop.

The system will be powered off of a +12V Sealed Lead Acid battery to supply the required +12V, +5V, and +3.3V. This circuit will also be capable of using various solar panels to recharge the battery, making use of the LT3652 IC. This IC allows for implementation of Mean Power Point Tracking (MPPT) to regulate the charging current such that the solar panel operates in its maximum power efficiency range. Since the peak power voltage, Vp, will vary between solar panels, this setting is adjustable through a 500kΩ trim potentiometer. If desired, this function can be disabled by using two jumpers. The LT3652 is configured to have a peak charging current of 1A, set by using a 0.1Ω shunt resistor connected to the SENSE pin of the LT3652. This current will allow for greater flexibility of the +12V battery being used. 

The battery voltage needs to be regulated down to +12V, as the actual battery voltage will be ~13.2V to 14.2V depending on charge. This is accomplished using a 12V low dropout linear regulator (Using the TL750L12 in a TO-92 package). A linear voltage regulator would be unsuitable for the +5V generation, as the voltage difference would be dissipated as heat. Instead, a +5V step-down DC-DC converter IC (Recom R-78E5.0-0.5 SIP) is used to efficiently drop the voltage to +5V. Since the 5V goes on to power everything except the pH sensor, overcurrent protection is implemented using a socketed 1A radial fuse. The +5V rail will supply the MAX485 RS-485 transceiver with the needed +5V. Furthermore, the +5V supply will also power the ESP32 through the Vin pin. This way, the +3.3V supply is generated using the 3.3V LDO included on the ESP32 Development Board. 
The hardware part of the Smart Watering System includes sensors connected to a microcontroller to collect environmental data. The microcontroller is programmed using C++ and PlatformIO with VS Code as an integrated development environment.


A 12 V battery charges the device. A future application could be to charge that battery with solar energy so that it is more sustainable. 
