import React,{ useState, useEffect } from 'react';
import swal from 'sweetalert';
const api = {
  key: "382b9c6030f2b9e7f04f51413429479a",
  base: "https://api.openweathermap.org/data/2.5/"
}

function App() {

  const[query, setQuery] = useState('');
  const[weather, setWeather] = useState({});
  const[cls, setCls] = useState('app');

  const search = (event) => {
    if(event.key === "Enter"){
      fetch(`${api.base}weather?q=${query}&units=metric&APPID=${api.key}`)
      .then(res => res.json())
      .then(result => {
        setWeather(result);
        setQuery('');
        if(result.cod === '404')
        {
         swal("error 404","city not found","error");
        }
      })
    }
  }

  

  var [Time,setTime] = useState(0);

  let date = String(new window.Date());
  date = date.slice(3,15);

  useEffect(() => {
    const interval = setInterval(() => {
      setTime(Time => new Date().toLocaleTimeString())
    }, 1000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className={(typeof weather.main != "undefined") ? ((weather.main.temp > 30) ? 'app-warm' :((weather.main.temp < 31) &&(weather.main.temp >10)) ? 'app-normal':'app-winter') : 'app'}>
     <main>
       <div className="search-box">
        <input type="text" placeholder="Search..." className="search" value={query} onChange={e => setQuery(e.target.value)} onKeyPress={search}></input>
       </div>
       <div className="heading"><h2>Search Your City</h2></div>
       <div className="imfo">
         <div className="date">
         <h3>{date}</h3>
         </div>
         <div className="time">
          <h4>{Time}</h4>
         </div>
       </div>
       {(typeof weather.main != "undefined") ? (
       <div>
       <div className="location">
          <h2>{weather.name},{weather.sys.country}</h2>
         </div>
       <div className="weather-imfo">
         <div className="temp">
          {weather.main.temp}°C
         </div>
         <div className="weather">
          Humidity = {weather.main.humidity}<br/>
          Pressure = {weather.main.pressure}<br/>
          Co-ordinates<br/>
          lon:{weather.coord.lon}<br/>
          lat:{weather.coord.lat}<br/>
         </div>
       </div>
       </div>
       ): ('')}
     </main>
    </div>
  );
}

export default App;
