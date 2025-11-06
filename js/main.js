
import { getCurrentWeather, getForecast, getWeatherByCoords } from "./api.js";
import { showCurrent, showForecast, showError, clearUI } from "./ui.js";

const cityInput = document.getElementById("cityInput");
const searchBtn  = document.getElementById("searchBtn");

cityInput.addEventListener("keydown", e => {
  if(e.key === "Enter") searchBtn.click();
});

searchBtn.addEventListener("click", async () => {
  const city = cityInput.value.trim();
  if(!city) { showError("Please enter a city name"); return; }

  clearUI();
  try {
    const curr = await getCurrentWeather(city);
    showCurrent(curr);


    try{
      const f = await getForecast(city);
      showForecast(f);
    }catch(err){
      console.warn("Forecast failed:", err);
    }
  } catch(err){
    console.error(err);
    showError("City not found or API error. Check console for details.");
  }
});


window.addEventListener("load", () => {
  if(navigator.geolocation){
    navigator.geolocation.getCurrentPosition(async (pos) => {
      const { latitude, longitude } = pos.coords;
      clearUI();
      try {
        const curr = await getWeatherByCoords(latitude, longitude);
        showCurrent(curr);
    
        try {
          const f = await getForecast(curr.name);
          showForecast(f);
        } catch(e) { console.warn("Forecast by coords failed", e); }
      } catch(e) {
        console.warn("Geo weather failed", e);
      }
    }, (err) => {
      console.warn("Location denied or unavailable", err);
    });
  }
});
