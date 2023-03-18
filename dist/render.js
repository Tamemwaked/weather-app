class Renderer {
  constructor() {}

  renderFavoritecities(city) {
    const source = $("#weather-template").html();
    const template = Handlebars.compile(source);
    const newHTML = template({ city: city });
    $(".favorite-cities").empty().append(newHTML);
  }
  renderSpecificCity(city) {
    const source = $("#searched-template").html();
    const template = Handlebars.compile(source);
    const newHTML = template(city);
    $(".searched-city").empty().append(newHTML);
  }
}
