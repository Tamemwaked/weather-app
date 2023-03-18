class APIManager {
  constructor() {
    this.cities = [];
  }

  loadAllCities() {
    return $.get("/savedWeathers").then((weather) => {
      this.cities.push(...weather);
      return this.cities;
    });
  }

  loadSpecificCity(cityName) {
    return $.get(`/weather?cityName=${cityName}`).then((city) => {
      return city;
    });
  }
  saveCity(city) {
    $.ajax({
      type: "POST",
      url: "/weather",
      data: city,
      success: "posted",
      dataType: "dataType",
    });
  }
  deleteCity(cityName) {
    $.ajax({
      url: `/weather/${cityName}`,
      type: "DELETE",
      success: function (result) {
        console.log(result);
      },
      error: function (xhr, text, error) {
        console.log(xhr.responseText);
      },
    });
  }
}
