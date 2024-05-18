getWeatherData = async () => {
  let cityName = searchQueryInput.value;
  if (cityName) {
    // console.log(cityName);
    const now = new Date();
    const localDateTime = now.toLocaleString();
    console.log(localDateTime);
    const response = await fetch(
      `https://api.openweathermap.org/data/2.5/weather?q=${cityName}&appid=5fe36b192ffd1c36dffb6752bc1722b2`
    );
    response.json().then((data) => {
      let currentWeather = data.weather[0].main;
      let tempDegree = Math.trunc((data.main.temp - 273.15) * 10) / 10;
      let humidity = data.main.humidity;
      let country = data.sys.country;
      let city = data.name;
      var temp1 = "";
      var temp2 = "";
      var bg = "";
      if (currentWeather == "Rain") {
        temp1 = "It's Raining Now";
        temp2 = "   Don't forget your umberllas !";
        bg = "./media/night.gif";
      } else if (currentWeather == "Clouds") {
        temp1 = "It's Cloudy Today";
        temp2 = "Don't leave your raincoats behind!";
        bg = "./media/night.gif";
      } else if (currentWeather == "Clear") {
        temp1 = "The Sun's Out Today";
        temp2 = "Don't leave your sunglasses at home!";
        bg = "./media/summer.gif";
      }
      console.log(bg);
      weatherData.innerHTML = `
     <div
    class="card shadow rounded-3"
    style="width: 20rem;background-image: url(${bg});"
    id="climateCard"
  >
    <div class="card-body">
      <h4 class="card-title text-light">${temp1}</h4>
      <h5 class="card-subtitle mb-2 text-light">
        ${temp2}
      </h5>
      <img
        src="./media/rain-icon.png"
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
// https://api.openweathermap.org/data/2.5/weather?q=Kochi&appid=5fe36b192ffd1c36dffb6752bc1722b2
