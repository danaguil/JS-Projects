// function will activate when we search something
async function fetchWeather() {
  
  let searchInput = document.getElementById('search').value; // input using the #search elements value
  const weatherDataSection = document.getElementById("weather-data"); // also selected the #weather-data element, where our search result will appear
  weatherDataSection.style.display = "block"; // block so the fetched data can be seen, property was first set to none
  // Remeber for an API, NEVER share it to anybody to prevent hacking
  // if published, change the key to "API KEY"
  const apiKey = "ccba33bd8324bd8a8a18adc7637149fe" // adding our API key from OpenWeather API key

  // if statement that displays custom message for an empty input with innerHTML of weatherDataSection var
  if (searchInput == "") {
    weatherDataSection.innerHTML = `
    <div>
      <h2>Empty Input!</h2>
      <p>Please try again with a valid <u>city name</u>.</p>
    </div>
    `;
    return;
  }

  // Next, lets define 2 inner functions that will help us with getting our weather information
  // Both will be needed to use 2 seperate API's. 1) getting the locations long and lat coordinates
  // 2) gets current weather data based on those coordinates
  async function getLonAndLat(){ // using async, await, fetch() to ensure we get valid weather info each time
    const countryCode = 1 // needed for GeoCoding API to work, depends on country USA = 1
    const geocodeURL = `https://api.openweathermap.org/geo/1.0/direct?q=${searchInput.replace(" ", "%20")},${countryCode}&limit=1&appid=${apiKey}`
       // the API endpoint that include the countryCode and API key

    /* returning long and lat data. Because data is coming from another computer, may not be returned immediately
       this is why we used asyc/await;
       await: prevents associated async function from continuing until response data is returned from fetch(), 
       then stored in response
    */
    const response = await fetch(geocodeURL);
    if(!response.ok){ // if we get bad response
      console.log("Bad response!", response.status); // error msg is logged and nothing is returned
      return;
      }
   
    // Now getting actual geocode data in JSON, we use response obect's .json()
    // since data is coming from response, it's asynchronous, must use await
    const data = await response.json();

    // if out API call wasn't successful, our data array will be empty
    if (data.length == 0) {
      console.log("Something went wrong here."); // error msg
      weatherDataSection.innerHTML = `
      <div>
        <h2>Invalid Input: "${searchInput}"</h2>
        <p>Please try again with a valid <u>city name</u>.</p>
      </div>
      `;
      return;
    } else {
      return data[0];
    }
  }
  async function getWeatherData(lon,lat){
    // defining a weatherURL var
    const weatherURL = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${apiKey}`

    // defining a response var, assinging the object returned by fetch() function with weatherURL passed in
    const response = await fetch(weatherURL);
    if(!response.ok){ // if we get bad response
      console.log("Bad response!", response.status); // error msg is logged and nothing is returned
      return;
    }
    const data = await response.json(); // making another data object with JSON object for current weather data

    /* using weather information from data var
      data.weather[0].icon = image respresentatoin of current weather
      data.name = for the location/city
      data.main.temp = for the temp(measured in kelvins by default, hence the rounding)
      data.weather[0].description = breif decription of the current weather
    */
    // adding the weather information beside the icon
    weatherDataSection.style.display = "flex";
    weatherDataSection.innerHTML = `
    <img src="https://openweathermap.org/img/wn/${data.weather[0].icon}.png" alt="${data.weather[0].description}" width="100" />
    <div>
      <h2>${data.name}</h2>
      <p><strong>Temperature:</strong> ${Math.round((data.main.temp - 273.15) * 9/5 + 32)}°F</p>
      <p><strong>Description:</strong> ${data.weather[0].description}</p>
    </div>
    `
  }
  // lets use the functions we defined to finish writing fetchWeather() function
  document.getElementById("search").value = ""; // reseting search value so that the text input is cleared
  const geocodeData = await getLonAndLat(); // var with long and lat
  getWeatherData(geocodeData.lon,geocodeData.lat); 
}
