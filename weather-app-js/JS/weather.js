const d = document;

const apikey = "bcae56b33c6e9fbf69fade1501c12372";
let _weather = {};

const btn = d.getElementById("btn-find");
let city = d.getElementById("find-city");
const defaultCity = "Madrid";

d.addEventListener("DOMContentLoaded", () => {
  let app = new App();
  app.getFetchData(getlocalStorage());
});
 




btn.addEventListener("click", (e) => {
  try{
    let app = new App();
  localStorage.setItem("city", JSON.stringify(city.value));

  app.getFetchData(getlocalStorage());
  }catch(error){
    console.log(error);
  }
  
  


});


class App {
  constructor() {


    this.ciudad = document.getElementById("name-city");
    this.temp = document.getElementById("info-temp");
    this.time = document.getElementById("info-time");
    this.nubosidad = document.getElementById("info-nubosidad");
    this.humedad = document.getElementById("info-humedad");
    this.viento = document.getElementById("info-viento");
    this.atardecer = document.getElementById("info-atardecer");
    this.psol = document.getElementById("info-psol");
    this.ltd = document.getElementById("info-ltd");
    this.desc = document.getElementById("info-desc");
    this._weather = {};
   
  }



   render(weather) { 
    
    this.ciudad.textContent = this._weather.name;
    this.temp.textContent = Math.floor(this._weather.temp) + "°C";
    this.time.textContent = new Date(this._weather.time * 1000).toLocaleTimeString();
    this.nubosidad.textContent = this._weather.nubosidad + "%";
    this.humedad.textContent = this._weather.humedad + "%";
    this.viento.textContent = Math.floor(this._weather.viento * 3.6) + "km/h";
    this.atardecer.textContent = new Date(
      this._weather.atardecer * 1000
    ).toLocaleTimeString();
    this.psol.textContent = new Date(this._weather.psol * 1000).toLocaleTimeString();
    this.ltd.textContent = this._weather.ltd;
    this.desc.textContent = this._desc;
  }


  getFetchData(xCity) {
    try {
      fetch(
        `https://api.openweathermap.org/data/2.5/weather?q=${xCity}&appid=${apikey}&units=metric`
      )
        .then((response) => response.json())
        .then((weather) => {
          this._weather = {
           name: weather.name,
           temp: weather.main.temp,
           time: weather.dt,
           nubosidad: weather.clouds.all,
           humedad: weather.main.humidity,
           viento: weather.wind.speed,
           atardecer: weather.sys.sunset,
           psol: weather.sys.sunrise,
           ltd: weather.sys.sunset,
           desc: weather.weather[0].description
          }
  
          this.render(this._weather);
          
        
      
        
        })
        .catch((error) => {
          console.log(error);
        });
  
    } catch (error) {
      console.log(error);
    }
    
      
      
  }


  

}



function getlocalStorage() {
  try {
    if (localStorage.getItem("city") === null) {
      city.value = defaultCity;
    } else {
      city.value = JSON.parse(localStorage.getItem("city"));
    }
  
    return city.value;  
  } catch (error) {
    console.log(error);
  }
  
}



 



