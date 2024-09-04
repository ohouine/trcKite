function ReadWeather() {
    return JSON.parse(localStorage.getItem('weatherList'))
}

const GAP = 10
//where we acctually are in alle the weather info
let acctual = 0

document.querySelector("#btnRight").addEventListener("click",(e)=>{
    if (acctual + GAP >= ReadWeather().length) return;
    acctual += GAP
    ShowWeather()
})

document.querySelector("#btnLeft").addEventListener("click",(e)=>{
    if (acctual - GAP < 0) return;
    acctual -= GAP
    ShowWeather()
})

function ShowWeather() {
    const WEATHER = ReadWeather()
    document.querySelector("#content").innerHTML = ""
    for (let i = acctual; i < acctual + GAP; i++) {
        let element = WEATHER[i]
        let clone = document.querySelector("#tempWeather").content.cloneNode(true)
        clone.querySelector("#date").innerHTML = element.date
        clone.querySelector("#speed").innerHTML = Math.round(element.wind / 1.85 * 100) / 100
        clone.querySelector("#direction").innerHTML = element.direction
        clone.querySelector("#direction").style.color = (element.direction > 40 && element.direction < 266)?"red":"black"

        document.querySelector("#content").appendChild(clone)
    }
}

ShowWeather()