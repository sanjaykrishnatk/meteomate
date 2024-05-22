let isFunctionCalled = false;
let intervalId;
getWeatherData = async () => {
  if (intervalId) {
    clearInterval(intervalId);
  }
  isFunctionCalled = true;
  let cityName = searchQueryInput.value;
  if (cityName) {
    document.body.style.background = "none";
    const dateObj = new Date();
    const localDateTime = dateObj.toString().substring(4);
    const response = await fetch(
      `https://api.openweathermap.org/data/2.5/weather?q=${cityName}&appid=d4b89c4b3c286935a01b731ef3bc8720&units=metric`
    );
    response.json().then((data) => {
      let currentWeather = data.weather[0].main;
      // let currentWeather = "Snow";
      let tempDegree = data.main.temp;
      let humidity = data.main.humidity;
      let wind = data.wind.speed;
      let country = data.sys.country;
      let city = data.name;
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
        weatherIcon = "./media/cloudy-2.png";
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
      <h4 class="card-title text-light weather-details">${city.toUpperCase()} (${country})</h4>
      <h4 class="card-title text-light">${tempDegree}<sup>o</sup>C</h4>
      <div class="d-flex">
      <img
        src="./media/wind.png"
        class="wpIcon me-2"
        width="25px"
        height="25px"
        alt=""
      />
      <h5 class="card-title text-light me-2">${wind} Kmph</h5>
      <img
        src="./media/humidity.png"
        width="25px"
        height="25px"
        alt=""
        class="wpIcon me-2"
      />
      <h5 class="card-title text-light">${humidity}</h5>
    </div>
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
    getWeatherForecast();
  }
};
// https://api.openweathermap.org/data/2.5/weather?q=Kochi&appid=5fe36b192ffd1c36dffb6752bc1722b2
getWeatherForecast = async () => {
  let city = searchQueryInput.value;
  const weatherImages = {
    Rain: "./media/rain-icon.png",
    Clear: "./media/sunny.png",
    Thunderstorm: "./media/thunderstorm-2.png",
    Drizzle: "./media/rain-icon.png",
    Clouds: "./media/cloudy.png",
    Snow: "./media/snow.png",
    Mist: "./media/mist.png",
    Haze: "./media/mist.png",
    Smoke: "./media/cloudy.png",
    Dust: "./media/cloudy.png",
    Sand: "./media/cloudy.png",
  };
  getWeatherIcon = (weather) => {
    if (weather in weatherImages) {
      return weatherImages[weather];
    } else {
      return "./media/cloudy.png";
    }
  };
  const forecastResponse = await fetch(
    `https://api.openweathermap.org/data/2.5/forecast?q=${city}&appid=d4b89c4b3c286935a01b731ef3bc8720&units=metric`
  );
  forecastResponse.json().then((data) => {
    const dayOne = data.list.slice(8, 16);
    const minTemp = dayOne.map((item) => item.main.temp_min);
    const minTempValue = minTemp.reduce((t1, t2) => (t1 < t2 ? t1 : t2));
    const maxTemp = dayOne.map((item) => item.main.temp_max);
    const maxTempValue = maxTemp.reduce((t1, t2) => (t1 > t2 ? t1 : t2));

    const dayOne1Main = getWeatherIcon(dayOne[3].weather[0].main);
    const dayOne2Main = getWeatherIcon(dayOne[4].weather[0].main);
    const dayOne3Main = getWeatherIcon(dayOne[5].weather[0].main);

    const dayOne1Desc = dayOne[3].weather[0].description;
    const dayOne2Desc = dayOne[4].weather[0].description;
    const dayOne3Desc = dayOne[5].weather[0].description;

    dayTwo = data.list.slice(16, 24);
    minTempD2 = dayTwo.map((item) => item.main.temp_min);
    minTempValueD2 = minTempD2.reduce((t1, t2) => (t1 < t2 ? t1 : t2));

    maxTempD2 = dayTwo.map((item) => item.main.temp_max);
    maxTempValueD2 = maxTempD2.reduce((t1, t2) => (t1 > t2 ? t1 : t2));

    const dayTwo1Main = getWeatherIcon(dayTwo[3].weather[0].main);
    const dayTwo2Main = getWeatherIcon(dayTwo[4].weather[0].main);
    const dayTwo3Main = getWeatherIcon(dayTwo[5].weather[0].main);
    const dayTwo1Desc = dayTwo[3].weather[0].description;
    const dayTwo2Desc = dayTwo[4].weather[0].description;
    const dayTwo3Desc = dayTwo[5].weather[0].description;

    //day one updation
    day1.innerHTML = `         <div
    class="col-4 d-flex justify-content-center align-items-center"
    data-aos="fade-up"
    data-aos-duration="500"
  >
    <h6 class="text-light mb-0 mt-2"><b>Tommorow</b></h6>
  </div>
  <div
    class="col-4 d-flex justify-content-center align-items-center"
    data-aos="fade-up"
    data-aos-duration="500"
  >
    <h6 class="text-light mb-0 mt-2">
      <b id="minTempD1">Min Temp : ${minTempValue}<sup>o</sup>C</b>
    </h6>
  </div>
  <div
    class="col-4 d-flex justify-content-center align-items-center"
    data-aos="fade-up"
    data-aos-duration="500"
  >
    <h6 class="text-light mb-0 mt-2">
      <b>Max Temp : ${maxTempValue}<sup>o</sup>C</b>
    </h6>
  </div>`;
    day1Weather.innerHTML = `
  <div
  class="col-md-4 d-flex justify-content-center align-items-center"
  data-aos="fade-up"
  data-aos-duration="1500"
>
  <div class="card rounded-3 b-0 forecastCard">
    <div class="card-body bg-dark rounded-3 b-0">
      <h5 class="card-title text-light text-center"><b>9 AM</b></h5>
      <div class="d-flex justify-content-center align-items-center">
        <img
          src="${dayOne1Main}"
          alt=""
          class="ms-3 w-75 mb-2 forecastIcon"
        />
      </div>
      <h6 class="card-subtitle mb-2 text-light text-center">
        <b>${dayOne1Desc.toUpperCase()}</b>
      </h6>
    </div>
  </div>
</div>
<div
  class="col-md-4 d-flex justify-content-center align-items-center"
  data-aos="fade-up"
  data-aos-duration="1500"
>
  <div class="card rounded-3 b-0 forecastCard">
    <div class="card-body bg-dark rounded-3 b-0">
      <h5 class="card-title text-light text-center">
        <b>12 PM</b>
      </h5>
      <div class="d-flex justify-content-center align-items-center">
        <img
          src="${dayOne2Main}"
          alt=""
          class="ms-3 w-75 mb-2 forecastIcon"
        />
      </div>
      <h6 class="card-subtitle mb-2 text-light text-center">
        <b>${dayOne2Desc.toUpperCase()}</b>
      </h6>
    </div>
  </div>
</div>
<div
  class="col-md-4 d-flex justify-content-center align-items-center"
  data-aos="fade-up"
  data-aos-duration="1500"
>
  <div class="card rounded-3 b-0 forecastCard">
    <div class="card-body bg-dark rounded-3 b-0">
      <h5 class="card-title text-light text-center"><b>3 PM</b></h5>
      <div class="d-flex justify-content-center align-items-center">
        <img
          src="${dayOne3Main}"
          alt=""
          class="ms-3 w-75 mb-2 forecastIcon"
        />
      </div>
      <h6 class="card-subtitle mb-2 text-light text-center">
        <b>${dayOne3Desc.toUpperCase()}</b>
      </h6>
    </div>
  </div>
</div>
  `;

    day2.innerHTML = ` <div
  class="col-4 d-flex justify-content-center align-items-center"
  data-aos="fade-up"
  data-aos-duration="500"
>
  <h6 class="text-light mb-0 mt-2"><b>Day after tommorow</b></h6>
</div>
<div
  class="col-4 d-flex justify-content-center align-items-center"
  data-aos="fade-up"
  data-aos-duration="500"
>
  <h6 class="text-light mb-0 mt-2">
    <b>Min Temp : ${minTempValueD2}<sup>o</sup>C</b>
  </h6>
</div>
<div
  class="col-4 d-flex justify-content-center align-items-center"
  data-aos="fade-up"
  data-aos-duration="500"
>
  <h6 class="text-light mb-0 mt-2">
    <b>Max Temp :  ${maxTempValueD2}<sup>o</sup>C</b>
  </h6>
</div>`;
    day2Weather.innerHTML = `
<div
class="col-md-4 d-flex justify-content-center align-items-center"
data-aos="fade-up"
data-aos-duration="1500"
>
<div class="card rounded-3 b-0 forecastCard">
  <div class="card-body bg-dark rounded-3 b-0">
    <h5 class="card-title text-light text-center"><b>9 AM</b></h5>
    <div class="d-flex justify-content-center align-items-center">
      <img
        src="${dayTwo1Main}"
        alt=""
        class="ms-3 w-75 mb-2 forecastIcon"
      />
    </div>
    <h6 class="card-subtitle mb-2 text-light text-center">
      <b>${dayTwo1Desc.toUpperCase()}</b>
    </h6>
  </div>
</div>
</div>
<div
class="col-md-4 d-flex justify-content-center align-items-center"
data-aos="fade-up"
data-aos-duration="1500"
>
<div class="card rounded-3 b-0 forecastCard">
  <div class="card-body bg-dark rounded-3 b-0">
    <h5 class="card-title text-light text-center">
      <b>12 PM</b>
    </h5>
    <div class="d-flex justify-content-center align-items-center">
      <img
        src="${dayTwo2Main}"
        alt=""
        class="ms-3 w-75 mb-2 forecastIcon"
      />
    </div>
    <h6 class="card-subtitle mb-2 text-light text-center">
      <b>${dayTwo2Desc.toUpperCase()}</b>
    </h6>
  </div>
</div>
</div>
<div
class="col-md-4 d-flex justify-content-center align-items-center"
data-aos="fade-up"
data-aos-duration="1500"
>
<div class="card rounded-3 b-0 forecastCard">
  <div class="card-body bg-dark rounded-3 b-0">
    <h5 class="card-title text-light text-center"><b>3 PM</b></h5>
    <div class="d-flex justify-content-center align-items-center">
      <img
        src="${dayTwo3Main}"
        alt=""
        class="ms-3 w-75 mb-2 forecastIcon"
      />
    </div>
    <h6 class="card-subtitle mb-2 text-light text-center">
      <b>${dayTwo3Desc.toUpperCase()}</b>
    </h6>
  </div>
</div>
</div>
`;
  });
};
