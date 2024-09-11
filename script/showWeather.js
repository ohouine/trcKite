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

document.querySelector("#inptDate").addEventListener("change",(e)=>{
    const WEATHER = ReadWeather()

    for (let i = 0; i < WEATHER.length; i++) {
        const element = WEATHER[i];
        
        const DATE = new Date(element.date);
        const FORMATTED_DATE = String(DATE.getUTCFullYear()).slice(-2) +"-"+String(DATE.getUTCMonth() + 1).padStart(2, '0') +"-"+ String(DATE.getUTCDate()).padStart(2, '0') ;
        if (FORMATTED_DATE == e.srcElement.value.substring(2)) {
            console.log("continue");
            //round to closest ten
            acctual = Math.round(i / 10) * 10
            ShowWeather()
            document.querySelector("#message").innerHTML = ""
            return ""
        }
    }

    document.querySelector("#message").innerHTML = "date not found"
})

function ShowWeather() {
    const WEATHER = ReadWeather()
    //handle row <--/--> visibility
    if (acctual == 0) {
        document.querySelector("#btnLeft").style.visibility = "hidden"
    }else{
        document.querySelector("#btnLeft").style.visibility = "visible"
    }
    if (acctual + GAP >= WEATHER.length) {
        document.querySelector("#btnRight").style.visibility = "hidden"
    }else{
        document.querySelector("#btnRight").style.visibility = "visible"
    }

    document.querySelector("#content").innerHTML = ""
    for (let i = acctual; i < acctual + GAP; i++) {
        let element = WEATHER[i]
        let clone = document.querySelector("#tempWeather").content.cloneNode(true)
        //date
        const DATE = new Date(element.date);
        const FORMATTED_DATE = String(DATE.getUTCMonth() + 1).padStart(2, '0') +"/"+ String(DATE.getUTCDate()).padStart(2, '0') +"/"+String(DATE.getUTCFullYear()).slice(-2) ;
        const HURMIN = String(DATE.getUTCHours()).padStart(2, '0')+":"+String(DATE.getUTCMinutes()).padStart(2, '0'); // Get the hours and pad with zero if needed
        clone.querySelector("#date").innerHTML = FORMATTED_DATE+"<br>"+HURMIN

        clone.querySelector("#speed").innerHTML = Math.round(element.wind / 1.85 * 100) / 100
        clone.querySelector("#direction").innerHTML = element.direction
        clone.querySelector("#direction").style.color = (element.direction > 40 && element.direction < 266)?"red":"black"
        document.querySelector("#content").appendChild(clone)
    }
}

ShowWeather()