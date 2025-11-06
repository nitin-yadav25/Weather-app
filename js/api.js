const API_KEY = "5163583bb139651b4352cee82ceefc9c";
const BASE = "https://api.openweathermap.org/data/2.5";

function handleResp(resp) {
  if (!resp.ok) throw new Error(`${resp.status} ${resp.statusText}`);
  return resp.json();
}

// 🔹 Current Weather by City
export async function getCurrentWeather(city) {
  const url = `${BASE}/weather?q=${encodeURIComponent(city)}&units=metric&appid=${API_KEY}`;
  const res = await fetch(url);
  return handleResp(res);
} // ← ye closing curly brace missing thi

// 🔹 Weather by Latitude & Longitude
export async function getWeatherByCoords(lat, lon) {
  const url = `${BASE}/weather?lat=${lat}&lon=${lon}&units=metric&appid=${API_KEY}`;
  const res = await fetch(url);
  return handleResp(res);
}

// 🔹 Forecast (5-day)
export async function getForecast(city) {
  const url = `${BASE}/forecast?q=${encodeURIComponent(city)}&units=metric&appid=${API_KEY}`;
  const res = await fetch(url);
  return handleResp(res);
}
