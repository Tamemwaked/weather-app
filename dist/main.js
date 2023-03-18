let apiManager = new APIManager();
let renderer = new Renderer();

function loadFavoriteCities() {
  apiManager.loadAllCities().then((cities) => {
    renderer.renderFavoritecities(cities);
  });
}

function searchedCity() {
  let cityName = $("#input").val();
  $("#input").val("");
  cityName = cityName.charAt(0).toUpperCase() + cityName.slice(1);

  apiManager.loadSpecificCity(cityName).then((result) => {
    if (typeof result === "object") {
      renderer.renderSpecificCity(result);
    } else {
      alert(result);
    }
  });
}

$(".favorite-cities").on("click", "#removeCity", function () {
  cityName = $(this).data().name;
  apiManager.deleteCity(cityName);
  window.location.reload();
});

$(".searched-city").on("click", "#addCity", function () {
  let city = {
    name: $(this).data().name,
    temperature: $(this).data().temp,
    condition: $(this).data().condition,
    conditionPic: $(this).data().icon,
  };
  apiManager.saveCity(city);
  window.location.reload();
});

loadFavoriteCities();
