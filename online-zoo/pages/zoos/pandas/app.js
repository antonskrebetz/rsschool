let arrLike = [];
let likeBtn = document.querySelector(".content-header__icon_favor");
likeBtn.addEventListener("click", addLikedVideo);

function addLikedVideo() {
  let activeVideo = document.querySelector(".main-video");
  !likeBtn.classList.contains("liked")
    ? arrLike.push(activeVideo.src)
    : arrLike.splice(activeVideo.src, 1);
  likeBtn.classList.toggle("liked");
}

document
  .querySelectorAll(".slides-item")
  .forEach((item) => item.addEventListener("click", selectVideo));

function selectVideo() {
  likeBtn.classList.remove("liked");
  let mainVideo = document.querySelector(".main-video");
  const newItem = this.querySelector("iframe");
  newItem.classList.remove("slides-video");
  newItem.classList.add("main-video");
  let replaced = mainVideo.parentNode.replaceChild(newItem, mainVideo);
  replaced.classList.remove("main-video");
  replaced.classList.add("slides-video");
  this.append(replaced);

  if (arrLike.indexOf(document.querySelector(".main-video").src) !== -1)
    likeBtn.classList.add("liked");
}

document
  .querySelectorAll(".features-arrows__right, .features-arrows__left")
  .forEach((item) => item.addEventListener("click", slideChange));

function slideChange() {
  let slides = document.querySelectorAll(".slides-item");

  if (this.classList.contains("features-arrows__right")) {
    let lastItem = slides[slides.length - 1];
    lastItem.parentNode.insertBefore(lastItem, lastItem.parentNode.firstChild);
  }
  if (this.classList.contains("features-arrows__left")) {
    slides[0].parentNode.insertBefore(
      slides[0],
      slides[0].parentNode.lastChild
    );
  }
}
