const d = document;

const apikey = "bcae56b33c6e9fbf69fade1501c12372";

let ciudad = document.getElementById('name-city');
let temp = document.getElementById('info-temp');
let time = document.getElementById('info-time');
let nubosidad = document.getElementById('info-nubosidad');
let humedad = document.getElementById('info-humedad');
let viento = document.getElementById('info-viento');
let atardecer = document.getElementById('info-atardecer');
let psol = document.getElementById('info-psol');
let ltd = document.getElementById('info-ltd');
let desc = document.getElementById('info-desc');

let btn = d.getElementById('btn-find');
let city = d.getElementById('find-city');
let defaultCity = 'Madrid'


d.addEventListener('DOMContentLoaded', () => {
    if (localStorage.getItem('city') === null) {
        city.value = defaultCity;
      } else {
        city.value = JSON.parse(localStorage.getItem("city"));

      }

      render(city.value);
   
})  

btn.addEventListener("click", (e) => {


    localStorage.setItem("city", JSON.stringify(city.value));
   

    if (localStorage.getItem('city') === null) {
        city.value = defaultCity;
      } else {
        city.value = JSON.parse(localStorage.getItem("city"));

      }

      render(city.value);

});


function render (city){

    fetch(`https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apikey}&units=metric`)
    .then((response) => response.json())
    .then((weather) => {
        ciudad.textContent = weather.name;
        temp.textContent = Math.floor(weather.main.temp)+"°C";
        time.textContent = new Date(weather.dt * 1000).toLocaleTimeString();
        nubosidad.textContent = weather.clouds.all+"%";
        humedad.textContent = weather.main.humidity+"%";
        viento.textContent = Math.floor(weather.wind.speed*3.6)+"km/h";
        atardecer.textContent = new Date(weather.sys.sunset * 1000).toLocaleTimeString();
        psol.textContent = new Date (weather.sys.sunrise * 1000).toLocaleTimeString();
        ltd.textContent = weather.sys.sunset;
        desc.textContent = weather.weather[0].description;
    })
    .catch((error) => {
        console.log(error);
    })

   
}



 



