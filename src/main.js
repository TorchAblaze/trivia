import $ from "jquery";
import "bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";
import "./css/styles.css";

$(document).ready(() => {
  let request = new XMLHttpRequest();
  const url = "http://jservice.io/api/random?count=10";

  request.onreadystatechange = function () {
    if (this.readyState === 4 && this.status === 200) {
      const response = JSON.parse(this.responseText);
      getElements(response);
    }
  };

  request.open("GET", url, true);
  request.send();

  function getElements(response) {
    console.log(response);
    let html = "";
    response.forEach((triviaElement) => {
      if (
        triviaElement.question === undefined ||
        triviaElement.question === ""
      ) {
        return;
      }
      // now we can get key/values for each one...
      html += `<div class="card my-border front ${triviaElement.id}">`;
      html += `<div><h5>Category: ${triviaElement.category.title}</h5></div>`;
      html += triviaElement.question;
      html += "</div>";
      html += `<div class="card my-border back ${triviaElement.id}">`;
      html += triviaElement.answer;
      html += "</div>";
    });
    $(".results").html(html).show();
  }
});

$(".results").on("click", "div", function () {
  const aud = document.getElementById("theme");
  console.log(aud);
  if (aud.currentTime > 0) {
    // then it is playing, stop it
    aud.pause();
    aud.currentTime = 0;
  } else {
    aud.play();
  }

  const currentSide = this.classList[this.classList.length - 2];
  const id = this.classList[this.classList.length - 1];
  if (currentSide === "front") {
    $(`.front.${id}`).fadeToggle(() => $(`.back.${id}`).fadeToggle());
  } else {
    $(`.back.${id}`).fadeToggle(() => $(`.front.${id}`).fadeToggle());
  }
});
