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
  const id = this.classList[this.classList.length - 1];
  $(`.${id}`).toggle();
});

// http://jservice.io/api/random?count=10
// [
//   {
//       "id": 11729,
//       "answer": "Thomas Wolfe",
//       "question": "\"The Lost Boy\", a novella by this \"Look Homeward, Angel\" author, wasnt published in full until 1992",
//       "value": 500,
//       "airdate": "1993-12-31T12:00:00.000Z",
//       "created_at": "2014-02-11T22:53:18.552Z",
//       "updated_at": "2014-02-11T22:53:18.552Z",
//       "category_id": 1328,
//       "game_id": null,
//       "invalid_count": null,
//       "category": {
//           "id": 1328,
//           "title": "in the bookstore",
//           "created_at": "2014-02-11T22:53:18.143Z",
//           "updated_at": "2014-02-11T22:53:18.143Z",
//           "clues_count": 35
//       }
//   }
// ]
