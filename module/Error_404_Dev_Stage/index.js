// Importing node modules
const express = require("express");
const pug = require("pug");
const path = require("path");

// Initializing express app
const app = express();

// Setting our view engine to pug
app.set("view engine", "pug");

// Setting our default views
app.set("views", __dirname + "/views");

// Serving public assets
app.use(express.static(path.join(__dirname + "/public")));

// Home page will render "index.pug"
// file. ".pug" extension is not
// required. Express takes care of
// it behind the scenes
app.get("/", (req, res) => {
  res.render("index");
});

// Listening our app on port 3000
app.listen(3000);

(function () {
  function ready(fn) {
    if (document.readyState != "loading") {
      fn();
    } else {
      document.addEventListener("DOMContentLoaded", fn);
    }
  }

  function makeSnow(el) {
    var ctx = el.getContext("2d");
    var width = 0;
    var height = 0;
    var particles = [];

    var Particle = function () {
      this.x = this.y = this.dx = this.dy = 0;
      this.reset();
    };

    Particle.prototype.reset = function () {
      this.y = Math.random() * height;
      this.x = Math.random() * width;
      this.dx = Math.random() * 1 - 0.5;
      this.dy = Math.random() * 0.5 + 0.5;
    };

    function createParticles(count) {
      if (count != particles.length) {
        particles = [];
        for (var i = 0; i < count; i++) {
          particles.push(new Particle());
        }
      }
    }

    function onResize() {
      width = window.innerWidth;
      height = window.innerHeight;
      el.width = width;
      el.height = height;

      createParticles((width * height) / 10000);
    }

    function updateParticles() {
      ctx.clearRect(0, 0, width, height);
      ctx.fillStyle = "#f6f9fa";

      particles.forEach(function (particle) {
        particle.y += particle.dy;
        particle.x += particle.dx;

        if (particle.y > height) {
          particle.y = 0;
        }

        if (particle.x > width) {
          particle.reset();
          particle.y = 0;
        }

        ctx.beginPath();
        ctx.arc(particle.x, particle.y, 5, 0, Math.PI * 2, false);
        ctx.fill();
      });

      window.requestAnimationFrame(updateParticles);
    }

    onResize();
    updateParticles();

    window.addEventListener("resize", onResize);
  }

  ready(function () {
    var canvas = document.getElementById("snow");
    makeSnow(canvas);
  });
})();
