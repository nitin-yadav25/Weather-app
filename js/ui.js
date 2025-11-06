

export function showCurrent(data){
  const currentCard = document.getElementById("currentCard");
  document.getElementById("cityName").textContent = `${data.name}, ${data.sys.country}`;
  document.getElementById("temp").textContent = `${Math.round(data.main.temp)}°C`;
  document.getElementById("description").textContent = data.weather[0].description;
  document.getElementById("humidity").textContent = `Humidity ${data.main.humidity}%`;
  document.getElementById("wind").textContent = `Wind ${data.wind.speed} m/s`;
  document.getElementById("weatherIcon").src = `https://openweathermap.org/img/wn/${data.weather[0].icon}@2x.png`;
  currentCard.classList.remove("hidden");

  setBackground(data.weather[0].main);
}

export function showForecast(forecastData){

  const container = document.getElementById("forecast");
  container.innerHTML = ""; 


  const daysMap = new Map();
  forecastData.list.forEach(item => {
    const date = item.dt_txt.split(" ")[0];
    if(!daysMap.has(date)) daysMap.set(date, []);
    daysMap.get(date).push(item);
  });


  const entries = Array.from(daysMap.entries()).slice(0, 5);

  entries.forEach(([date, items]) => {

    const temps = items.map(i => i.main.temp);
    const minT = Math.round(Math.min(...temps));
    const maxT = Math.round(Math.max(...temps));

    const rep = items[Math.floor(items.length/2)];
    const icon = rep.weather[0].icon;
    const desc = rep.weather[0].main;

    const d = new Date(date);
    const dayName = d.toLocaleDateString("en-IN", { weekday: "short", month: "short", day: "numeric" });

    const card = document.createElement("div");
    card.className = "day";
    card.innerHTML = `
      <div class="day-title">${dayName}</div>
      <img src="https://openweathermap.org/img/wn/${icon}@2x.png" alt="${desc}" style="width:60px;height:60px"/>
      <p>${desc}</p>
      <p>${minT}° / ${maxT}°</p>
    `;
    container.appendChild(card);
  });
}

export function showError(msg){
  alert(msg);
}

export function setBackground(condition){

  const root = document.body;
  const map = {
    Clear: "linear-gradient(120deg,#f6d365,#fda085)",
    Clouds: "linear-gradient(120deg,#bdc3c7,#2c3e50)",
    Rain: "linear-gradient(120deg,#4b79a1,#283e51)",
    Snow: "linear-gradient(120deg,#83a4d4,#b6fbff)",
    Thunderstorm: "linear-gradient(120deg,#141e30,#243b55)"
  };
  root.style.background = map[condition] || "linear-gradient(135deg,#74ebd5,#acb6e5)";
}

export function clearUI(){
  document.getElementById("currentCard").classList.add("hidden");
  document.getElementById("forecast").innerHTML = "";
}
