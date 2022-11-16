const checkbox = document.getElementById("check");
const toggle = document.querySelector(".toggle");
const body = document.body;
const temp = document.querySelector(".temperature");
const cityName = document.querySelector(".city__name");
const weather = document.querySelector(".weather");
const weatherLoading = document.querySelector(".weather-loading");

const API_KEY = "1fe55f27829afc97ea60a0f3b1978686";

toggle.addEventListener("click", function () {
  if (checkbox.checked) {
    checkbox.checked = false;
    body.classList.replace("dark", "light");
  } else {
    checkbox.checked = true;
    body.classList.replace("light", "dark");
  }
});

if (navigator.geolocation) {
  navigator.geolocation.getCurrentPosition(
    async function (position) {
      weatherLoading.classList.contains("error") &&
        weatherLoading.classList.remove("error");
      try {
        const { coords } = position;
        const response = await fetch(
          `https://api.openweathermap.org/data/2.5/weather?lat=${coords.latitude}&lon=${coords.longitude}&appid=${API_KEY}&units=metric`
        );

        if (!response.ok) throw new Error("Something went wrong");
        const data = await response.json();

        temp.textContent = Math.round(data.main.temp);
        cityName.textContent = `${data.name}, ${data.sys.country}`;

        weatherLoading.remove();
        weather.removeAttribute("hidden");
      } catch (error) {
        weatherLoading.textContent = error.message;
        weatherLoading.classList.add("error");
      }
    },
    function () {
      weatherLoading.innerHTML =
        "<div class='error'>Access to geolocation is not given! </div>";
    }
  );
}
