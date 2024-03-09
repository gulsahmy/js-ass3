document.addEventListener("DOMContentLoaded", () => {
  setTimeout(() => {
    document.getElementById("loading").style.display = "none";
    document.querySelector(".container").style.display = "block";
    fetchCatImages();
    updateDateTime();
  }, 3000);
  setInterval(updateDateTime, 1000);
});

let currentColorIndex = 0;
const colors = [
  "yellow",
  "pink",
  "aqua",
  "green",
  "magenta",
  "purple",
  "darksalmon",
  "darkseagreen",
  "aquamarine",
  "deeppink",
  "gold",
  "greenyellow",
]; 

document.getElementById("fetch-btn").addEventListener("click", () => {
  fetchCatImages();
  changeBackgroundColor();
});

function fetchCatImages() {
  const cardDiv = document.getElementById("cardDiv");
  cardDiv.innerHTML = '<img src="./img/loading.gif" alt="Loading..."/>';

  fetch("https://api.thecatapi.com/v1/images/search?limit=9")
    .then((response) => {
      if (!response.ok) {
        throw new Error("Network response was not ok");
      }
      return response.json();
    })
    .then((data) => {
      cardDiv.innerHTML = "";
      data.forEach((cat) => {
        cardDiv.innerHTML += `
                <div class="col-12 col-sm-6 col-lg-4 mb-4">
                    <div class="card">
                        <img src="${cat.url}" class="card-img-top card-img" alt="Cat">
                    </div>
                </div>`;
      });
    })
    .catch((error) => {
      console.error("Error:", error);
      cardDiv.innerHTML = `<p>Error fetching cat images: ${error.message}</p>`;
    });
}

function updateDateTime() {
  const now = new Date();
  document.getElementById(
    "tarih"
  ).innerText = `${now.toLocaleString()}`;
}

function changeBackgroundColor() {
  document.body.style.backgroundColor = colors[currentColorIndex];
  currentColorIndex++;
  if (currentColorIndex >= colors.length) {
    currentColorIndex = 0;
  }
}
