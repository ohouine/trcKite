//WEATHER AND IMAGE
//#region 
const formWeight = document.querySelector("#formWeight");

formWeight.addEventListener("submit", async (e) => {
    e.preventDefault();

    const weight = formWeight.querySelector("#weight").value
    let tips = "weight invalid"
    if (weight > 0 && weight <= 60) {
        tips = "you need a 9m2 kite"
    }else if (weight > 60 && weight <= 65) {
        tips = "you need a 9-10m2 kite"
    }else  if (weight > 65 && weight <= 70) {
        tips = "you need a 10-11m2 kite"
    } else  if (weight > 70 && weight <= 75) {
        tips = "you need a 12m2 kite"
    }else  if (weight > 75 && weight <= 80) {
        tips = "you need a 13m2 kite"
    }else  if (weight > 80 && weight <= 90) {
        tips = "you need a 14m2 kite"
    } else  if (weight > 90) {
        tips = "you need a 15m2 kite"
    }
    
    document.querySelector("#infoKitsWidth").textContent = tips
    const windSpeed = await getMeteo()
    document.querySelector("#windInfo").textContent = `wind is going at ${windSpeed.value} km/h with an angle of ${windSpeed.wind_direction}`
})

async function getMeteo() {
    let init = {
        method: "GET",
        headers: {
            'Content-Type': 'application/json',
        },
    }

    let response = await fetch("https://data.geo.admin.ch/ch.meteoschweiz.messwerte-windgeschwindigkeit-kmh-10min/ch.meteoschweiz.messwerte-windgeschwindigkeit-kmh-10min_en.json", init)
    let jsonResponse = await response.json()

    console.log(jsonResponse.features[51].properties);
    return jsonResponse.features[51].properties
}

async function getImage(){
    let init = {
        method: "GET",
        headers: {
            'Content-Type': 'application/json',
		    'Accept-Version': 'v5'
        },
    }

    let response = await fetch("https://api.waifu.im/search?", init)

    let jsonResponse = await response.json()

    return jsonResponse.images[0].url;
}

setInterval(async () => {document.querySelector("#waifu").src = await getImage();},5000);

//#endregion

//DB handeling
//#region 
function addWeather(date, wind, direction) {
    let weatherList = JSON.parse(localStorage.getItem('weatherList')) || [];
    weatherList.push({date,wind,direction});
    localStorage.setItem('weatherList', JSON.stringify(weatherList));
}


//#endregion

//history
//#region 

//stock history
//powered by chatGPT
const ACTION_INTERVAL_MINUTES = 10; // Interval in minutes

async function performAction() {
    
    let weather = await getMeteo()
    // Update the last action timestamp

    addWeather(weather.reference_ts,weather.value,weather.wind_direction)
    localStorage.setItem('lastActionTime', Date.now());
}

function checkAndPerformAction() {
    const lastActionTime = localStorage.getItem('lastActionTime');
    const now = Date.now();
    const intervalMs = ACTION_INTERVAL_MINUTES * 60 * 1000;

    if (!lastActionTime || (now - lastActionTime) >= intervalMs) performAction();   
}

checkAndPerformAction();
// Set up an interval to check periodically
setInterval(checkAndPerformAction, 60 * 1000);
//#endregion