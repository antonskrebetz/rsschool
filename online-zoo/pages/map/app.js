const mapImage = document.getElementById("map");
const zoomInButton = document.getElementById("zoomIn");
const zoomOutButton = document.getElementById("zoomOut");

let isClick = false;
let clickX;
let clickY;

mapImage.addEventListener("pointerdown", (e) => {
  clickX = e.clientX;
  clickY = e.clientY;
  isClick = true;
});

window.addEventListener("pointerup", (e) => {
  isClick = false;
});

mapImage.addEventListener("pointermove", (e) => {
  if (!isClick) {
    return;
  }
  if (!mapImage.classList.contains("nozoom")) {
    const diffY = e.clientY - clickY;
    const diffX = e.clientX - clickX;

    clickX = e.clientX;
    clickY = e.clientY;

    const newTop =
      +window.getComputedStyle(mapImage).top.split("px")[0] + diffY + "px";
    const newLeft =
      +window.getComputedStyle(mapImage).left.split("px")[0] + diffX + "px";

    mapImage.style.top = newTop;
    mapImage.style.left = newLeft;
  }
});

let zoomStep = 1;

zoomInButton.addEventListener("click", () => {
  if (zoomStep < 6) {
    mapImage.style.width =
      Number(getComputedStyle(mapImage).width.split("px")[0]) * 1.2 + "px";
    mapImage.style.height =
      Number(getComputedStyle(mapImage).height.split("px")[0]) * 1.2 + "px";
    zoomStep++;
  }
  if (zoomStep > 1) {
    mapImage.classList.remove("nozoom");
  } else {
    mapImage.classList.add("nozoom");
    mapImage.style.top = 0;
    mapImage.style.left = 0;
  }
});

zoomOutButton.addEventListener("click", () => {
  if (zoomStep > 1) {
    mapImage.style.width =
      Number(getComputedStyle(mapImage).width.split("px")[0]) / 1.2 + "px";
    mapImage.style.height =
      Number(getComputedStyle(mapImage).height.split("px")[0]) / 1.2 + "px";
    zoomStep--;
  }
  if (zoomStep > 1) {
    mapImage.classList.remove("nozoom");
  } else {
    mapImage.classList.add("nozoom");
    mapImage.style.top = 0;
    mapImage.style.left = 0;
  }
});
