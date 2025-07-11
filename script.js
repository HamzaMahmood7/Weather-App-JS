const apiKey = "0cec993acf166ad7fa98b993610946e3";
const apiUrl =
  "https://api.openweathermap.org/data/2.5/weather?units=metric&q=";

const searchBox = document.querySelector(".search input");
const searchBtn = document.querySelector(".search button");
const weatherIcon = document.querySelector(".weather-icon");
const card = document.querySelector(".card");
const search = document.querySelector(".search");

async function checkWeather(city) {
  const response = await fetch(apiUrl + city + `&appid=${apiKey}`);
  if (response.status == 404) {
    document.querySelector(".error").style.display = "block";
    document.querySelector(".weather").style.display = "none";
  } else {
    let data = await response.json();
    console.log(data);

    const startHour = 6;
    const endHour = 20;

    // Get the timestamp of the city and convert it to readable local time
    const unixTimeUTC = data.dt;
    const timezoneOffsetSeconds = data.timezone;
    const localUnixTime = unixTimeUTC + timezoneOffsetSeconds;
    const localDate = new Date(localUnixTime * 1000);
    // const timeStamp = date.toLocaleString("en-GB", {
    //   hour: "2-digit",
    //   minute: "2-digit",
    //   second: "2-digit",
    //   hour12: false,
    // });
    // console.log(timeStamp);

    const currentHour = localDate.getUTCHours();

    console.log(`cities local current hour ${currentHour}`);

    // Depeding on the time of day, the background of the card will change
    currentHour >= startHour && currentHour < endHour
      ? (card.style.backgroundImage = 'url("images/day-time-bg.jpg")')
      : (card.style.backgroundImage = 'url("images/night-sky-bg.png")');

    document.querySelector(".city").textContent = data.name;
    document.querySelector(".temp").textContent =
      Math.round(data.main.temp) + "°c";
    document.querySelector(".humidity").textContent = data.main.humidity + "%";
    document.querySelector(".wind").textContent = data.wind.speed + " mph";

    if (data.weather[0].main == "Clouds") {
      weatherIcon.src = "images/clouds.png";
    } else if (data.weather[0].main == "Clear") {
      weatherIcon.src = "images/clear.png";
    } else if (data.weather[0].main == "Rain") {
      weatherIcon.src = "images/rain.png";
    } else if (data.weather[0].main == "Drizzle") {
      weatherIcon.src = "images/drizzle.png";
    } else if (data.weather[0].main == "Mist") {
      weatherIcon.src = "images/mist.png";
    } else if (data.weather[0].main == "Snow") {
      weatherIcon.src = "images/snow.png";
    } else {
      weatherIcon.src = "images/clouds.png"; // Default icon
    }

    document.querySelector(".weather").style.display = "block";
    document.querySelector(".error").style.display = "none";
  }
}

searchBtn.addEventListener("click", function () {
  checkWeather(searchBox.value);
});
