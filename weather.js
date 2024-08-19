async function getWeather(lat, lon) {
  const apiKey = "eda8d98890214bab926190059241708";
  const url = `https://api.weatherapi.com/v1/current.json?key=${apiKey}&q=${lat},${lon}`;

  try {
    const response = await fetch(url);
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    const data = await response.json();
    if (data.error) {
      throw new Error(`API error! message: ${data.error.message}`);
    }

    function formatDate(date) {
      return date.toLocaleDateString("en-US", {
        month: "long",
        day: "numeric",
        year: "numeric",
      });
    }

    document.querySelector(".date").textContent = formatDate(new Date());

    document.querySelector(
      ".location"
    ).textContent = `${data.location.name}, ${data.location.country}`;
    document.querySelector(".temp").textContent = `${data.current.temp_c}℃`;
  } catch (error) {
    console.error("Error fetching weather data:", error);
    alert("Failed to retrieve weather data: " + error.message);
  }
}

function showPosition(position) {
  const lat = position.coords.latitude;
  const lon = position.coords.longitude;
  getWeather(lat, lon);
}

function showError(error) {
  switch (error.code) {
    case error.PERMISSION_DENIED:
      alert("User denied the request for Geolocation.");
      break;
    case error.POSITION_UNAVAILABLE:
      alert("Location information is unavailable.");
      break;
    case error.TIMEOUT:
      alert("The request to get user location timed out.");
      break;
    case error.UNKNOWN_ERROR:
      alert("An unknown error occurred.");
      break;
  }
}

function requestLocation() {
  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(showPosition, showError);
  } else {
    alert("Geolocation is not supported by this browser.");
  }
}

document.addEventListener("DOMContentLoaded", (event) => {
  requestLocation();
});
