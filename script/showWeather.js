function ReadWeather() {
    return JSON.parse(localStorage.getItem('weatherList'))
}

ReadWeather().forEach(element => {
    let clone = document.querySelector("#tempWeather").content.cloneNode(true)
        clone.querySelector("#date").innerHTML = element.date
        clone.querySelector("#speed").innerHTML = Math.round(element.wind / 1.85 * 100) / 100
        clone.querySelector("#direction").innerHTML = element.direction

        document.querySelector("#content").appendChild(clone)


});