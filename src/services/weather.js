import request from "../network/request"
const LOCATION_API = `https://geocoding-api.open-meteo.com/v1/`
const WEATHER_API = `https://api.open-meteo.com/v1/`
export const getCities = (value) => {
    return request({
        url: `search?name=${value}`,
        baseURL: LOCATION_API,


    })
}

export const getWeather = ({ latitude, longitude }) => {
    return request({
        url: `forecast?latitude=${latitude}&longitude=${longitude}&hourly=temperature_2m,relativehumidity_2m,apparent_temperature,weathercode,windspeed_10m&current_weather=true&timeformat=unixtime&current_weather=true&timeformat=unixtime`,
        baseURL: WEATHER_API,
    })
}