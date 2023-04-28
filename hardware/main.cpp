#include <Arduino.h>

#include <Arduino.h>
#include <WiFi.h>
#include <Wire.h>
#include <ThingSpeak.h>
#include <SoftwareSerial.h>
#include <DHT.h>
#include <Adafruit_BMP085.h>

#define SSID "linksys"
//#define pass "47736566"
#define WRITE_API_KEY "YP27E4V6VA7P6HHJ"
unsigned long CHANNEL_ID = 2021316;
const byte ph[] = {0x01, 0x03, 0x00, 0x0d, 0x00, 0x01, 0x15, 0xc9};
byte values[11];
// #define TMP_PIN 32
#define DHT_PIN 4
#define SCL 22
#define SDA 21
#define RE 32  // Connect RE terminal with 32 of ESP
#define DE 33  // Connect DE terminal with 33 of ESP  
#define RX 26
#define TX 27
#define MOIST_PIN 33

int air = 599;
int water = 294;

unsigned long lastTimestamp = 0;
unsigned long timeDelay = 15000;

WiFiClient client;
SoftwareSerial mod(RX,TX);  // RX=26 , TX =27
DHT dht(DHT_PIN, 22);
Adafruit_BMP085 bmp;

void initWiFi();
void initThingSpeak();
void initSoilPh();
void initDHT();
void initBMP();
float taskThemometer();
float taskSoilPh();
float taskDHT();
float taskPressure();
float taskAltitude();
int taskSoilMoist();
void errorHandleThingSpeak(int error);

void setup() {
  Serial.begin(9600);
  initWiFi();
  initThingSpeak();
  initSoilPh();
  initDHT();
  // delay(2000);
  // initBMP();
  delay(3000);
  Serial.println("Setup Done");
}

void loop() {
  if (millis()-lastTimestamp > timeDelay){
    // float temp = taskThemometer();
    float soil_ph = taskSoilPh();
    float humidity = taskDHT();
    // float pressure = taskPressure();
    // float altitude = taskAltitude();
    float soil_moist = taskSoilMoist();
    int error = ThingSpeak.writeField(CHANNEL_ID, 1, 20, WRITE_API_KEY);
    errorHandleThingSpeak(error);
    delay(15000);
    error = ThingSpeak.writeField(CHANNEL_ID, 2, humidity, WRITE_API_KEY);
    errorHandleThingSpeak(error);
    delay(15000);
    error = ThingSpeak.writeField(CHANNEL_ID, 3, 100000, WRITE_API_KEY);
    errorHandleThingSpeak(error);
    delay(15000);
    error = ThingSpeak.writeField(CHANNEL_ID, 4, soil_moist, WRITE_API_KEY);
    errorHandleThingSpeak(error);
    delay(15000);
    error = ThingSpeak.writeField(CHANNEL_ID, 5, soil_ph, WRITE_API_KEY);
    lastTimestamp = millis();
    Serial.println("One cycle done");
  }
}

void initWiFi(){
  // WiFi.begin(SSID, pass);
  WiFi.begin(SSID);
  Serial.print("Connecting to WiFi ..");
  while (WiFi.status() != WL_CONNECTED){
    Serial.print('.');
    delay(1000);
  }
  Serial.println("Connected!");
  Serial.println(WiFi.localIP());
}

void initThingSpeak(){
  ThingSpeak.begin(client);
}

void initSoilPh(){
  mod.begin(9600);
  pinMode(RE, OUTPUT);
  pinMode(DE, OUTPUT);
}

void initDHT(){
  dht.begin();
}

void initBMP(){
  Wire.begin();
  if (!bmp.begin()) {
	Serial.println("Could not find a valid BMP085/BMP180 sensor, check wiring!");
	// while (1) {}
  }
  // Serial.println("BMP setup done");
}

// float taskThemometer(){
//   float sum = 0;
//   for (int i=0; i<20; i++){
//     int reading = analogRead(TMP_PIN);
//     float voltage = (float) reading * (3300/1024.0);
//     float temp = (voltage - 500.0) / 100.0;
//     sum += temp;
//   }
//   return (sum / 20.0);
// }

float taskThemometer(){
  float temperature = bmp.readTemperature();
  while(isnan(temperature)){
    temperature = bmp.readTemperature();
  }
  return temperature;
}

// float taskSoilPh(){
//   digitalWrite(RE, HIGH);
//   digitalWrite(DE, HIGH);
//   delay(10);
//   if (mod.write(ModReadBuffer, sizeof(ModReadBuffer)) == 8){
//     digitalWrite(RE, LOW);
//     digitalWrite(DE, LOW);
//     for (byte i=0; i<11; i++){
//       buf[i] = mod.read();
//       Serial.println(buf[i], HEX);
//     }
//     float soil_ph = float(buf[4])/10;
//     return soil_ph;
//   }
// }

float taskSoilPh(){
  byte val;
  digitalWrite(DE, HIGH);
  digitalWrite(RE, HIGH);
  delay(10);
  if (mod.write(ph, sizeof(ph)) == 8){
    digitalWrite(DE, LOW);
    digitalWrite(RE, LOW);
    for (byte i = 0; i < 11; i++){
      values[i] = mod.read();
      Serial.print(values[i], HEX);
    }
    Serial.println();
  }
  float soil_ph = float(values[4])/10;
  Serial.print("Soil pH: ");
  Serial.println(soil_ph, 1);
  return soil_ph;
}

float taskDHT(){
  float humidity = dht.readHumidity();
  while (isnan(humidity)){
    Serial.print("NAN");
    humidity = dht.readHumidity();
  }
  return humidity;
}

float taskPressure(){
  float pressure = bmp.readPressure();
  while (isnan(pressure)){
    pressure = bmp.readPressure();
  }
  return pressure;
}

// float taskAltitude(){
//   float altitude = bmp.readAltitude();
//   while (isnan(altitude)){
//     altitude = bmp.readAltitude();
//   }
//   return altitude;
// }

int taskSoilMoist(){
  int soil_moist_val = analogRead(MOIST_PIN);
  int soil_moist_per = map(soil_moist_val, air, water, 0, 100);
  if (soil_moist_per > 100){
    soil_moist_per = 100;
  }
  else if (soil_moist_per < 0){
    soil_moist_per = 0;
  }
  // Serial.print(soil_moist_per);
  // Serial.println(" %");
  return soil_moist_per;
}

void errorHandleThingSpeak(int error){
  if (error == 200){
    Serial.println("Channel update successful.");
  }
  else{
    Serial.println("Problem updating channel. HTTP error code " + String(error));
  }
}