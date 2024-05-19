let isFunctionCalled = false;
let intervalId;
getWeatherData = async () => {
  if (intervalId) {
    clearInterval(intervalId);
  }
  isFunctionCalled = true;
  let cityName = searchQueryInput.value;
  if (cityName) {
    // console.log(cityName);
    document.body.style.background = "none";
    const now = new Date();
    const localDateTime = now.toLocaleString();
    console.log(localDateTime);
    const response = await fetch(
      `https://api.openweathermap.org/data/2.5/weather?q=${cityName}&appid=d4b89c4b3c286935a01b731ef3bc8720&units=metric`
    );
    response.json().then((data) => {
      console.log(data);
      let currentWeather = data.weather[0].main;
      // let currentWeather = "Snow";
      console.log(currentWeather);
      let tempDegree = data.main.temp;
      let humidity = data.main.humidity;
      let country = data.sys.country;
      let city = data.name;
      let cityId = data.id;
      var temp1 = "";
      var temp2 = "";
      var bg = "";
      var weatherIcon = "";
      if (
        currentWeather == "Rain" ||
        currentWeather == "Drizzle" ||
        currentWeather == "Thunderstorm"
      ) {
        var rainCategory = "";
        temp2 = "Don't forget your umberllas !";
        if (currentWeather == "Rain") {
          rainCategory = "Raining";
          weatherIcon = "./media/rain-icon.png";
        } else if (currentWeather == "Drizzle") {
          rainCategory = "Drizzling";
          weatherIcon = "./media/rain-icon.png";
        } else if (currentWeather == "Thunderstorm") {
          rainCategory = "Thunderstorms";
          temp2 = "Don't go outside !";
          weatherIcon = "./media/thuderstorm.png";
        }
        temp1 = `It's ${rainCategory} Now`;
        bg = "./media/night.gif";
        // document.body.style.backgroundImage = "url('')";
        const style = document.createElement("style");
        style.innerHTML = `
          body::before {
            background-image: url('./media/rain-1.jpg');
          }
        `;
        document.head.appendChild(style);
      } else if (currentWeather == "Clouds") {
        temp1 = "It's Cloudy Today";
        temp2 = "Gray skies looming overhead";
        bg = "./media/night.gif";
        weatherIcon = "./media/cloudy-2.png";
        const style = document.createElement("style");
        style.innerHTML = `
          body::before {
            background-image: url('./media/cloud-3.jpg');
          }
        `;
        document.head.appendChild(style);
      } else if (currentWeather == "Clear") {
        temp1 = "The Sun's Out Today";
        temp2 = "Blue skies and sunshine";
        bg = "./media/summer.gif";
        weatherIcon = "./media/sunny.png";
        const style = document.createElement("style");
        style.innerHTML = `
          body::before {
            background-image: url('./media/sunny-6.jpg');
          }
        `;
        document.head.appendChild(style);
      } else if (currentWeather == "Snow") {
        temp1 = "Snowflakes falling gently outside";
        temp2 = "Bundle up, it's snowing today";
        bg = "./media/winter.gif";
        weatherIcon = "./media/snow.png";
        const style = document.createElement("style");
        style.innerHTML = `
          body::before {
            background-image: url('./media/winter-5.jpg');
          }
        `;
        document.head.appendChild(style);
      } else if (currentWeather == "Mist" || currentWeather == "Haze") {
        temp1 = "Damp and misty outside";
        temp2 = "Visibility reduced due to mist";
        bg = "./media/winter_morning.gif";
        weatherIcon = "./media/mist.png";
        const style = document.createElement("style");
        style.innerHTML = `
          body::before {
            background-image: url('./media/mist-haze-2.jpg');
          }
        `;
        document.head.appendChild(style);
      } else if (
        currentWeather == "Smoke" ||
        currentWeather == "Dust" ||
        currentWeather == "Sand"
      ) {
        temp1 = "Conditions dusty, smoky, or sandy";
        temp2 = "Expecting poor air quality due to smoke, dust, and sand";
        bg = "./media/desert.gif";
        const style = document.createElement("style");
        style.innerHTML = `
          body::before {
            background-image: url('./media/smog.jpg');
          }
        `;
        document.head.appendChild(style);
      } else if (currentWeather == "Squall" || currentWeather == "Tornado") {
        temp1 = "Windy with showers";
        temp2 = "Gusty winds, rain, potential tornado";
        bg = "./media/tornado.gif";
        const style = document.createElement("style");
        style.innerHTML = `
          body::before {
            background-image: url('./media/tornado-2.jpg');
          }
        `;
        document.head.appendChild(style);
      }

      console.log(bg);
      weatherData.innerHTML = "";
      weatherData.innerHTML = `
     <div
    class="card shadow rounded-3"
    style="width: 20rem;background-image: url(${bg});"
    id="climateCard"
    data-aos="flip-left"
    data-aos-duration="1500"
  >
    <div class="card-body">
      <h4 class="card-title text-light">${temp1}</h4>
      <h5 class="card-subtitle mb-2 text-light">
        ${temp2}
      </h5>
      <img
        src="${weatherIcon}"
        alt=""
        class="ms-2 w-25 climate-img"
      />
      <h4 class="card-title text-light weather-details">${city.toUpperCase()}</h4>
      <h4 class="card-title text-light">${tempDegree}<sup>o</sup>C</h4>
      <h5 class="card-subtitle mb-2 text-light">
        ${localDateTime}
      </h5>
    </div>
  </div>
    `;
    });
  } else {
    alert(`Please enter valid input`);
  }
};
bgArray = [
  "./media/night.gif",
  "./media/summer.gif",
  "./media/winter.gif",
  "./media/winter_morning.gif",
  "./media/desert.gif",
  "./media/tornado.gif",
];
let currentIndex = 0;
changeBg = () => {
  currentIndex = (currentIndex + 1) % bgArray.length;
  climateCard.style.backgroundImage = `url(${bgArray[currentIndex]})`;
};
if (!isFunctionCalled) {
  intervalId = setInterval(changeBg, 3000);
}
handleKeyPress = (event) => {
  if (event.keyCode === 13) {
    getWeatherData();
  }
};
// https://api.openweathermap.org/data/2.5/weather?q=Kochi&appid=5fe36b192ffd1c36dffb6752bc1722b2
