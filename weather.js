const weather = document.querySelector(".js-weather");
const API_KEY = "d64b94a9ee293d309483c6f3e4e571e8";
const COORDS = 'coords';

function getweather(lat, lng){
fetch(`https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lng}&appid=${API_KEY}&units=metric`)
.then(function(response){
    return response.json();
})
.then(function(json) {
    const temperature = json.main.temp;
    const place = json.name;
    weather.innerText = `${temperature}℃ @ ${place}`;
})
};

function saveCoords(coordsObj){
localStorage.setItem(COORDS, JSON.stringify(coordsObj))
};


function handleGeoSuccess(position){
const latitude = position.coords.latitude;
const longitude = position.coords.longitude;
const coordsObj = {
    latitude : latitude,
    longitude : longitude
};
saveCoords(coordsObj);
getweather(latitude, longitude);
}

function handleGeoError(){
    console.log("Can't access geo location")
}

function askForCoords(){
    navigator.geolocation.getCurrentPosition(handleGeoSuccess, handleGeoError)
}

function loadCoords(){
    const loadedCoords = localStorage.getItem(COORDS);
    if(loadedCoords === null){
        askForCoords();
    } else{
const parsedCoords = JSON.parse(loadedCoords);
getweather(parsedCoords.latitude, parsedCoords.longitude)
    }
}

function init(){
loadCoords();
}

init();