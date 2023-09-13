const div= document.getElementById("div");
const datePer= document.getElementById("datePer");
const dateEn= document.getElementById("dateEn");
const cityName= document.getElementById("cityName");
const cityLocation= document.getElementById("cityLocation");
const statusWeather= document.getElementById("statusWeather");
const input_text= document.getElementById("input_text");
const search_button= document.getElementById("search_button");

var city= "tehran";
var key= "B5BMX7755ZL689NNFJZSYWZXW";
var link1= "https://weather.visualcrossing.com/VisualCrossingWebServices/rest/services/timeline/";
var link2= "?unitGroup=metric&include=days&key="+key+"&contentType=json";

startFetch(link1,city,link2);

search_button.addEventListener('click',()=>{
    city= input_text.value;
    // console.log(link1+city+link2);
    startFetch(link1,city,link2);
})

function startFetch(url1,cityname,url2){
    fetch(url1+cityname+url2).then(response=>{
        
        response.json().then(data=>{
            div.innerHTML= "";
            setData(data);
        })
    })
}
function setData(element){

    datePer.innerText= new Date().toLocaleDateString("fa-ir");
    dateEn.innerText= new Date().toLocaleDateString("en-us");

    cityName.innerText= element.resolvedAddress;
    cityLocation.innerText= element.latitude+"/"+element.longitude;

    element.days.forEach(element => {
        // console.log(element.datetime)
        setDetail(element);
    });

}


function setDetail(element){

    let newIcon= document.createElement('img');
    newIcon.id= element.id;
    newIcon.className= "icon";
    switch(element.icon){
        case "rain":
            newIcon.src= "./icons/rain.gif";
        break;
        case "partly-cloudy-day":
            newIcon.src= "./icons/party-cloudy.gif";
        break;
        case "cloudy":
            newIcon.src= "./icons/cloudy.gif";
        break;
        default:
            newIcon.src= "./icons/sun.gif";
        
    }

    let newTemp= document.createElement('div');
    newTemp.id= element.id;
    newTemp.className= "temp";
    newTemp.innerHTML= "<span><b>دمای هوا</b>: °"+element.tempmin+"/<b>°"+element.temp+"</b>/°"+element.tempmax+"</span>";

    let newTime= document.createElement('h2');
    newTime.id= element.id;
    newTime.className= "time";
    newTime.innerText= element.datetime;

    let newDescription= document.createElement('p');
    newDescription.id= element.id;
    newDescription.className= "description";
    newDescription.innerText= element.description;

    let newSunrise= document.createElement('p');
    newSunrise.id= element.id;
    newSunrise.className= "sunrise";
    newSunrise.innerText="طلوع خورشید: "+ element.sunrise;

    let newSunset= document.createElement('p');
    newSunset.id= element.id;
    newSunset.className= "sunet";
    newSunset.innerText="غروب خورشید: "+ element.sunset;

    let newHumidity= document.createElement('p');
    newHumidity.id= element.id;
    newHumidity.className= "humidity";
    newHumidity.innerText="رطوبت: "+ element.humidity+"%";

    let newDiv= document.createElement('div');
    newDiv.id= element.id;
    newDiv.className= "newDiv";

    newDiv.appendChild(newIcon);
    newDiv.appendChild(newTemp);
    newDiv.appendChild(newTime);
    newDiv.appendChild(newDescription);
    newDiv.appendChild(newSunrise);
    newDiv.appendChild(newSunset);
    newDiv.appendChild(newHumidity);

    div.appendChild(newDiv);
    
    newDiv.addEventListener('click',()=>{
        startFetch("https://api.punkapi.com/v2/beers/"+element.id);
    })
}