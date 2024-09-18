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

        let color = getrWindDanger(Math.round(element.wind / 1.85 * 100) / 100)
        let clone = document.querySelector("#tempWeather").content.cloneNode(true)
        //date
        const DATE = new Date(element.date);
        const FORMATTED_DATE =String(DATE.getUTCDate()).padStart(2, '0') +"/"+ String(DATE.getUTCMonth() + 1).padStart(2, '0') +"/"+ String(DATE.getUTCFullYear()).slice(-2) ;
        const HURMIN = String(DATE.getUTCHours()).padStart(2, '0')+":"+String(DATE.getUTCMinutes()).padStart(2, '0'); // Get the hours and pad with zero if needed
        clone.querySelector("#date").innerHTML = FORMATTED_DATE+"<br>"+HURMIN

        clone.querySelector("#speed").innerHTML = Math.round(element.wind / 1.85 * 100) / 100
        clone.querySelector("#speed").style.color = color
        clone.querySelector("#direction").innerHTML = element.direction
        clone.querySelector("#direction").style.color = (element.direction > 40 && element.direction < 266)?"red":"black"
        document.querySelector("#content").appendChild(clone)
    }
}

function getrWindDanger(wind) {
     let WEIGHT = localStorage.getItem("weight")
     
     if (WEIGHT > 49 && WEIGHT <= 60) {

        if (wind < 18) {
            return "red"
        }else if ((wind >= 18 && wind < 20) || (wind >= 30 && wind < 34) ) {
            return "orange"
        }else if(wind >= 20 && wind < 30) {
            return "green"
        }else return "red"

     }else if (WEIGHT >= 60 && WEIGHT <= 65) {
         
        if (wind < 16) {
            return "red"
        }else if ((wind >= 16 && wind < 18) || (wind >=26 && wind < 30) ) {
            return "orange"
        }else if(wind >= 16 && wind < 26) {
            return "green"
        }else return "red"

     }else  if (WEIGHT > 65 && WEIGHT <= 70) {
        
        if (wind < 12) {
            return "red"
        }else if ((wind >= 12 && wind < 14) || (wind >=22 && wind < 26) ) {
            return "orange"
        }else if(wind >= 16 && wind < 22) {
            return "green"
        }else return "red"

     } else  if (WEIGHT > 70 && WEIGHT <= 75) {
        
        if (wind < 10) {
            return "red"
        }else if ((wind >= 10 && wind < 16) || (wind >=22 && wind < 24) ) {
            return "orange"
        }else if(wind >= 14 && wind < 22) {
            return "green"
        }else return "red"

     }else  if (WEIGHT > 75 && WEIGHT <= 80) {
        
        if (wind < 8) {
            return "red"
        }else if ((wind >= 10 && wind < 12) || (wind >=20 && wind < 22) ) {
            return "orange"
        }else if(wind >= 12 && wind < 20) {
            return "green"
        }else return "red"

     }else  if (WEIGHT > 80 && WEIGHT <= 90) {
        
        if (wind < 8) {
            return "red"
        }else if ((wind >= 8 && wind < 10) || (wind >=18 && wind < 20) ) {
            return "orange"
        }else if(wind >= 10 && wind < 18) {
            return "green"
        }else return "red"

     } else  if (WEIGHT > 90) {
        
        if (wind < 6) {
            return "red"
        }else if ((wind >= 6 && wind < 8) || (wind >=16 && wind < 18) ) {
            return "orange"
        }else if(wind >= 8 && wind < 16) {
            return "green"
        }else return "red"

     }

     return "black"
}

ShowWeather()