
import React, { useState, useEffect } from "react";
import { getCities, getWeather } from "./services/weather";
import { ReactSearchAutocomplete } from 'react-search-autocomplete'
function App() {
  const [data, setData] = useState(null)
  const [cities, setCities] = useState([])
  const [userLocation,setUserLocation] = useState(null); // Kullanıcının konumunu tutmak için state

  console.log('data', data)

  useEffect(() => {
    // Sayfa yüklendiğinde kullanıcının konumunu al
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          console.log('pos', position)
          const { latitude, longitude } = position.coords;
          setUserLocation({ latitude, longitude });
          handleOnSelect({ latitude, longitude })
        },
        (error) => {
          console.error("Kullanıcı konumu alınamadı: ", error);
        }
      );
    } else {
      console.error("Tarayıcınız konum hizmetlerini desteklemiyor.");
    }
  }, []);

  const handleOnSelect = async (item) => {
    // the item selected
    try {
      const res = await getWeather({
        latitude: item.latitude, longitude: item.longitude
      })
      console.log('res', res);
      setData(res.data)
    } catch (error) {
    }
  }

  const handleOnSearch = async (string, results) => {
    if (string.length > 2) {
      try {
        const res = await getCities(string)
        setCities(res.data.results)
      } catch (error) {
      }
    }
  }

  return (
    <div className="App">
      <div className="search">
        <ReactSearchAutocomplete
          items={cities}
          onSearch={handleOnSearch}
          onSelect={handleOnSelect}
        />

      </div>
      <div className="container">
        <div className="top">
          <div className="location">
            <p> {data?.name} </p>
          </div>
          <div className="template">
            {data?.hourly ? <h1>{data?.current_weather.temperature}°C</h1> : null}
          </div>
        </div>

        {data &&
          <div className="bottom">
            <div className="feels">
              {data?.hourly ? <p className='bold'>{data?.hourly.apparent_temperature[84]}°C</p> : null}
              <p>Hissedilen</p>
            </div>
            <div className="humidity">
              {data?.hourly ? <p className='bold'>{data?.hourly.relativehumidity_2m[0]}%</p> : null}
              <p>Nem Oranı</p>
            </div>
            <div className="wind">
              {data?.hourly ? <p className='bold'>{data?.current_weather.windspeed} KM</p> : null}
              <p>Rüzgar Hızı</p>
            </div>
          </div>
        }
      </div>
    </div>
  );
}
export default App;

