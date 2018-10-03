LoadEvents();

async function getImages(queryString) {
  let response = await fetch(
    "https://pixabay.com/api" +
      "?key=10293957-518136e5e8f0bb18d6513b4e7" +
      queryString
  );

  return await response.json();
}

function displayImage(url) {
  let stage = document.querySelector("#stage");
  let image = document.createElement("img");
  image.src = url;
  stage.appendChild(image);
}

function LoadEvents() {
  let showImageButton = document.querySelector("#search-btn");
  showImageButton.addEventListener("click", () => {
    showImageButtonClickEventHandler();
  });

  let clearStageButton = document.querySelector("#search-clear");
  clearStageButton.addEventListener("click", () =>
    clearButtonClickEventHandler()
  );

  let categories = document.querySelectorAll("#category-img-container > img");
  categories.forEach(img =>
    img.addEventListener("click", event =>
      categoryImageClickEventHandler(event)
    )
  );
}

function clearButtonClickEventHandler() {
  hideStage();
  clearStage();
}

async function showImageButtonClickEventHandler() {
  showStage();
  clearStage();
  displaySearchResult();
}

async function displaySearchResult() {
  let searchQuery = constructQueryString();
  let images = await getImages(searchQuery);
  images.hits.forEach(hit => {
    displayImage(hit.largeImageURL);
  });
}

function setCategoryBoarder(image) {
  image.style.outline = "2px solid yellow";
}

function clearAllCategoryBoarders() {
  let categories = document.querySelectorAll("#category-img-container > img");
  categories.forEach(img => (img.style.outline = "unset"));
}

function setCategorySelection(image) {
  let textDisplay = document.querySelector("#category-selectionText");
  textDisplay.textContent = image.title;
  clearAllCategoryBoarders();
  setCategoryBoarder(image);
}

function categoryImageClickEventHandler(event) {
  setCategorySelection(event.target);
}

function clearStage() {
  let stageItems = document.querySelectorAll("#stage > *");
  stageItems.forEach(item => item.remove());
}

function constructQueryString() {
  let result = "&q=";
  result += document.querySelector("#search-text").value;
  result += "&image_type=" + getImageTypeString();
  result += "&orientation=" + getOrientationString();
  result += "&category=" + getCategoryString();
  result += "&colors=" + getColorsString();
  result += "&editors_choice=" + getEditorsChoiceString();
  result += "&safesearch=" + getSafesearchString();
  result += "&order=" + getOrderString();
  return result;
}

function getImageTypeString() {
  let result = "";
  let inputs = document.querySelectorAll('[name="image-type"]');
  inputs.forEach(input => (input.checked ? (result = input.value) : {}));
  return result;
}

function getOrientationString() {
  let result = "all";
  let orientationInput = document.querySelectorAll("#orientation input");
  orientationInput.forEach(
    input => (input.checked ? (result = input.value) : {})
  );
  return result;
}

function getCategoryString() {}

function getColorsString() {}

function getEditorsChoiceString() {}

function getSafesearchString() {}

function getOrderString() {}

function showStage() {
  let stage = document.querySelector("#stage");
  stage.style.visibility = "visible";
}

function hideStage() {
  let stage = document.querySelector("#stage");
  stage.style.visibility = "hidden";
}
