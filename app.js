const redirect = "http://localhost:8888/logged";
const client_id = "a644b20888dc4eb182b3f8d546a678ca";
const client_secret = "5acd2502954048fdb552c5a145f123da";

const AUTHORIZE = "https://accounts.spotify.com/authorize";
const TOKEN = "https://accounts.spotify.com/api/token";
const TRACKS =
  "https://api.spotify.com/v1/recommendations?seed_artists=5cIc3SBFuBLVxJz58W2tU9&limit=10";

const list = document.getElementById("list");

function authorize() {
  let url = AUTHORIZE;
  url += "?client_id=" + client_id;
  url += "&response_type=code";
  url += "&redirect_uri=" + encodeURIComponent(redirect);
  url += "&show_dialog=true";
  url +=
    "&scope=user-read-private user-read-email user-read-playback-state user-top-read";
  window.location.href = url;
}

function onPageLoad() {
  document.addEventListener("DOMContentLoaded", function () {
    console.log("Page loaded!");
  });
}

function handleRedirect() {
  let code = getCode();
  fetchAccessToken(code);
  window.history.pushState("", "", redirect);
}

function getCode() {
  const queryString = window.location.search;
  return queryString.length > 0
    ? new URLSearchParams(queryString).get("code")
    : null;
}

function fetchAccessToken(code) {
  const body = new URLSearchParams({
    grant_type: "authorization_code",
    code,
    redirect_uri: redirect,
    client_id,
    client_secret,
  }).toString();

  callApi("POST", TOKEN, body, handleAuthResponse);
}

function refreshAccessToken() {
  const refresh_token = localStorage.getItem("refresh_token");

  if (!refresh_token) {
    console.error("Refresh token is missing.");
    return;
  }

  const body = new URLSearchParams({
    grant_type: "refresh_token",
    refresh_token,
    client_id,
  }).toString();

  console.log("Refreshing access token...");

  callApi("POST", TOKEN, body, handleAuthResponse);
}

function handleAuthResponse(response) {
  if (response.status == 200) {
    response.json().then((data) => {
      if (data.access_token != undefined) {
        localStorage.setItem("access_token", data.access_token);
      }
      if (data.refresh_token != undefined) {
        localStorage.setItem("refresh_token", data.refresh_token);
      }
      getSongs();
    });
  } else {
    console.log(response.statusText);
    alert(response.statusText);
  }
}

function getSongs() {
  console.log("getSongs called");
  callApi("GET", TRACKS, null, handleSongResponse);
}

function callApi(method, url, body, callback) {
  const access_token = localStorage.getItem("access_token");

  const headers = {
    "Content-Type": "application/x-www-form-urlencoded",
  };

  if (access_token) {
    headers["Authorization"] = "Bearer " + access_token;
  }

  if (method === "POST") {
    headers["Authorization"] = "Basic " + btoa(client_id + ":" + client_secret);
  }

  fetch(url, {
    method: method,
    headers: headers,
    body: body,
  })
    .then(callback)
    .catch((error) => console.error("Error:", error));
}

function handleSongResponse(response) {
  if (response.status === 200) {
    response.json().then((data) => {
      console.log("Handling song response:", data);

      if (data.tracks && Array.isArray(data.tracks)) {
        songlist(data);
        hideSecondAnimation();
      } else {
        console.error("Invalid or missing data.tracks in the response:", data);
      }
    });
  } else if (response.status === 401) {
    refreshAccessToken();
  } else {
    console.log(response.statusText);
    alert(response.statusText);
  }
}

function hideSecondAnimation() {
  const secondAnimationPlayer = document.getElementById(
    "second-animation-player"
  );
  if (secondAnimationPlayer) {
    secondAnimationPlayer.style.display = "none";
  } else {
    console.error("Second animation player not found.");
  }
}

function createListItem(songData) {
  const card = document.createElement("div");
  card.classList.add("card", "grid-item");
  card.style.backgroundColor = "white";

  const img = document.createElement("img");
  img.classList.add("card-img-top", "resize");
  if (songData.album.images && songData.album.images.length > 1) {
    img.src = songData.album.images[1].url;
  }
  card.appendChild(img);

  const cardBody = document.createElement("div");
  cardBody.classList.add("card-body");

  const title = document.createElement("h5");
  title.classList.add("card-title");
  title.textContent = songData.name;
  cardBody.appendChild(title);
  const text = document.createElement("p");
  text.classList.add("card-text");

  text.textContent = `${songData.album.name} . ${songData.artists[0].name}`;
  cardBody.appendChild(text);

  const addtocart = document.createElement("a");
  addtocart.id = "add-to-cart-button";
  addtocart.classList.add("btn", "btn-primary");
  addtocart.href = "product.js";
  addtocart.target = "_blank";
  addtocart.textContent = "Add to Cart";
  cardBody.appendChild(addtocart);

  card.appendChild(cardBody);

  return card;
}

function songlist(data) {
  console.log("Inside songlist function");
  console.log(data);
  removeItem();

  const listElement = document.getElementById("list");
  listElement.classList.add("list");

  if (data.tracks && Array.isArray(data.tracks)) {
    console.log("List element found:", listElement);

    for (let i = 0; i < data.tracks.length; i++) {
      console.log("Processing item:", data.tracks[i]);
      const listItem = createListItem(data.tracks[i]);
      listElement.appendChild(listItem);
    }
  } else {
    console.error("Tracks not found or is not an array in data.");
  }
}

function removeItem() {
  list.innerHTML = "";
}
