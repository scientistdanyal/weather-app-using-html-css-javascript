const apikey = "456ffb3cc3254c7fe93b28e46e7cc4cf";
const weathDataE1 = document.getElementById("weather-data");
const cityInputE1 = document.getElementById("city-input");
const formE1 = document.querySelector("form");



formE1.addEventListener("submit", (event)=>{
 event.preventDefault();
 const cityValue = cityInputE1.value;
 getweatherData(cityValue);
})


async function getweatherData(cityValue) {

    try {

        const response = await fetch(`https://api.openweathermap.org/data/2.5/weather?q=${cityValue}&appid=${apikey}&units=metric`);
        
        if(!response.ok){
            throw new Error("Network response was not ok")
        }

        const data = await response.json();
        
        const temperture = Math.round(data.main.temp);

        const description = data.weather[0].description;

        const icon = data.weather[0].icon;

        const details = [
            `Feels like: ${Math.round(data.main.feels_like)}`,
            `Humidity: ${data.main.humidity}`,
            `Wind Speed: ${data.wind.speed}`
        ]

        weathDataE1.querySelector(".icon").innerHTML = `<img src="http://openweathermap.org/img/wn/${icon}.png" alt="weather icon">`
        weathDataE1.querySelector(".temperature").textContent = `${temperture}°C`;
        weathDataE1.querySelector(".description").textContent = description;
        weathDataE1.querySelector(".details").innerHTML = details.map((details) => `<div>${details}</div>`).join(""); 

    } catch (error) {
        weathDataE1.querySelector(".icon").innerHTML = "";
        weathDataE1.querySelector(".temperature").textContent = "";
        weathDataE1.querySelector(".description").textContent = "";
        weathDataE1.querySelector(".details").innerHTML = "An error happened, please try again later"; 

    }
}
