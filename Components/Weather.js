import React from 'react'
import { View, Text, StyleSheet, StatusBar, ScrollView } from 'react-native'
import { Ionicons } from '@expo/vector-icons'
import { LinearGradient } from 'expo-linear-gradient'
import WeatherStyle from '../assets/style/WeatherStyle.js'

const weatherOptions = {
  Rain: {
    iconName: "rainy",
    gradient: ['#4c669f','#192f6b'],
    daysGradient: ['#045beb', '#00a4ff','#ddff7b'],
  },
  Clouds: {
    iconName: "cloudy",
    gradient: ['#00B4DB','#0083B0'],
    daysGradient: ['#045beb', '#00a4ff','#ddff7b'],
  },
  Snow: {
    iconName: 'snow',
    gradient: ['#83a4d4', '#b6fbff'],
    daysGradient: ['#045beb', '#00a4ff','#ddff7b'],
  },
  Thunderstorm: {
    iconName: 'thunderstorm',
    gradient: ['#4B79A1','#283E51'],
    daysGradient: ['#045beb', '#00a4ff','#ddff7b'],
  },
  Drizzle: {
    iconName: 'thunderstorm',
    gradient: ['#1A2980','#26D0CE'],
    daysGradient: ['#045beb', '#00a4ff','#ddff7b'],
  },
  Clear: {
    iconName: 'sunny',
    gradient: ['#2BC0E4','#EAECC6'],
    daysGradient: ['#045beb', '#00a4ff','#ddff7b'],
  },
  Mist: {
    iconName: 'cloud',
    gradient: ['#757F9A','#D7DDE8'],
    daysGradient: ['#045beb', '#00a4ff','#ddff7b'],
  },
  Smoke: {
    iconName: 'weather-windy',
    gradient: ['#0F2027','#203A43','#2C5364'],
    daysGradient: ['#045beb', '#00a4ff','#ddff7b'],
  },
  Haze: {
    iconName: 'weather-hazy',
    gradient: ['#757F9A','#D7DDE8'],
    daysGradient: ['#045beb', '#00a4ff','#ddff7b'],
  },
  Dust: {
    iconName: 'weather-windy-variant',
    gradient: ['#6D6027','#D3CBB8'],
    daysGradient: ['#045beb', '#00a4ff','#ddff7b'],
  },
  Fog: {
    iconName: 'weather-fog',
    gradient: ['#757F9A','#D7DDE8'],
    daysGradient: ['#045beb', '#00a4ff','#ddff7b'],
  },
  Sand: {
    iconName: 'wind',
    gradient: ['#6D6027','#D3CBB8'],
    daysGradient: ['#045beb', '#00a4ff','#ddff7b'],
  },
  Ash: {
    iconName: 'weather-fog',
    gradient: ['#0F2027','#203A43','#2C5364'],
    daysGradient: ['#045beb', '#00a4ff','#ddff7b'],
  },
  Squall: {
    iconName: 'rainy',
    gradient: ['#bdc3c7','#2c3e50'],
    daysGradient: ['#045beb', '#00a4ff','#ddff7b'],
  },
  Tornado: {
    iconName: 'weather-tornado',
    gradient: ['#bdc3c7','#2c3e50'],
    daysGradient: ['#045beb', '#00a4ff','#ddff7b'],
  }
}

let days = ['ВС', 'ПН', 'ВТ', 'СР', 'ЧТ', 'ПТ', 'СБ'];

const hours = ['00','01','02','03','04','05','06','07','08','09','10','11','12','13','14','15','16','17','18','19','20','21','22','23']

export default function Weather({data, condition}) {
  const getDays = (current, mass, temp) => {
    let days = []
    let date = new Date(current)
    let num = date.getDay()
    for(let i=0; i<7 ; i++) {
      if(num>=mass.length){
        num = 0
      }
      const day = mass[num]
      if(i === 0){
        day = 'Сегодня'
      }
      num = num + 1
      days.push(
      <View key={i} style={WeatherStyle.days_item} >
        <Text style={WeatherStyle.days_item_content}>{day}</Text>
        <Ionicons name={weatherOptions[condition].iconName} size={18} color='white' style={{marginRight: '5%'}}/>
        <Text style={WeatherStyle.text}>5</Text>
        <LinearGradient colors={weatherOptions[condition].daysGradient} start={{ x: 0, y: 0 }} end={{ x: 1, y: 0 }} locations={[0.2, 0.5, 1]} style={WeatherStyle.indicator}>
          <View style={{width:9, backgroundColor:'#fff',height: 9, marginLeft: ((temp-1)/temp)*100+'%', borderRadius: '50%'}}></View>
        </LinearGradient>
        <Text style={WeatherStyle.text}>{temp}</Text>
      </View>)
    }
    return days
  }

  return (
    <LinearGradient colors={weatherOptions[condition].gradient} style={WeatherStyle.container}>
      <ScrollView showsVerticalScrollIndicator={false}>
        <StatusBar barStyle={"light-content"}/>
        <View style={WeatherStyle.halfContainer}>
          <Text style={{color:'#fff',fontSize: 28, fontWeight: 'bold', marginTop: 20}}>
            {data.name}
          </Text>
          <View style={WeatherStyle.main_content}>
              <Ionicons name={weatherOptions[condition].iconName} size={96} color='white'/>
              <Text style={WeatherStyle.temp_text}>{Math.round(data.main.temp)}°C</Text>
          </View>
          <View style={WeatherStyle.info_container}>
            <Text style={{marginTop: 10,fontSize: 14, color: '#fff', marginLeft: 15}}>{data.weather[0].description[0].toUpperCase() + data.weather[0].description.slice(1)} .Wind speed: {data.wind.speed}. Pressure: {data.main.pressure}</Text>
            <ScrollView horizontal={true}  showsHorizontalScrollIndicator={false}>
              {hours.map((item)=> { return (
                <View key={item} style={WeatherStyle.scroll_container}>
                  <Text style={WeatherStyle.hour_item}>{Math.round(data.main.temp)}°C</Text>
                  <Ionicons name={weatherOptions[condition].iconName} size={32} color='white' style={WeatherStyle.hour_item}/>
                  <Text style={{color: '#fff'}}>{item}</Text>
                </View> 
              )})}
            </ScrollView>
          </View>
        </View>
        <View style={WeatherStyle.halfContainer}>
          <View style={WeatherStyle.info_container}>
            {getDays(data.dt,days,parseInt(Math.round(data.main.temp)),10)}
          </View>
        </View>
      </ScrollView>
    </LinearGradient>   
  )
}
