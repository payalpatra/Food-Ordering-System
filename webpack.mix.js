let mix = require("laravel-mix");
// What to compile , where to store after compile [Prameters]
mix
  .js("resources/js/app.js", "public/js/app.js")
  .sass("resources/scss/app.scss", "public/css/app.css");
