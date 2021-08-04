function toggleFullScreen() {
    if (!document.fullscreenElement) {
        document.documentElement.requestFullscreen();
    } else {
      if (document.exitFullscreen) {
        document.exitFullscreen();
      }
    }
  }

document.querySelector('.fullscreen').addEventListener('click', e => {
      toggleFullScreen();
})

function btnActive(e) {
  if (!e.classList.contains('btn-active')){
      document.querySelector('.btn-active').classList.remove('btn-active');
      e.classList.add('btn-active');
  }
}

const labels = document.querySelector('.filters').querySelectorAll('label');
labels.forEach(i => {
  i.addEventListener('input', e => {
    i.lastElementChild.value = e.target.value;
    document.documentElement.style.setProperty(`--${e.target.name}`, e.target.value + e.target.dataset.sizing);
  })
})

const img = document.querySelector('img');
const nextBtn = document.querySelector('.btn-next');
let c = 0;
nextBtn.addEventListener('click', () => {
  btnActive(nextBtn);
  c > 19 ? c = 1 : c += 1;
  function namePhoto(c) {
    if(c < 10) c = '0' + c;
    let hour = new Date().getHours();
    if(hour >= 6 && hour < 12) hour = 'morning';
    if(hour >= 12 && hour < 18) hour = 'day';
    if(hour >= 18 && hour < 24) hour = 'evening';
    if(hour >= 0 && hour < 6) hour = 'night';
    return `https://raw.githubusercontent.com/rolling-scopes-school/stage1-tasks/assets/images/${hour}/${c}.jpg`
  }
  img.src = namePhoto(c);
})

const resetBtn = document.querySelector('.btn-reset');
resetBtn.addEventListener('click', () => {
  btnActive(resetBtn);
  labels.forEach(i => {
    i.firstElementChild.name == 'saturate' ? i.firstElementChild.value = 100 : i.firstElementChild.value = 0;
    i.lastElementChild.value = i.firstElementChild.value;
    document.documentElement.style.setProperty(`--${i.firstElementChild.name}`, i.firstElementChild.value + i.firstElementChild.dataset.sizing);
  })
})

const loadBtn = document.querySelector('.btn-load');
loadBtn.addEventListener('click', e => {
  btnActive(loadBtn);
})

const loadImg = document.querySelector('.btn-load--input');
loadImg.addEventListener('change', e => {
  const file = loadImg.files[0];
  const reader = new FileReader();
  reader.onload = () => {
    img.src = reader.result;
    loadImg.value = '';
  }
  reader.readAsDataURL(file);
})

const saveBtn = document.querySelector('.btn-save');
saveBtn.addEventListener('click', e => {
  btnActive(saveBtn);
  const canvas = document.createElement('canvas');
  function drawImage() {
    const image = new Image();
    image.setAttribute('crossOrigin', 'anonymous'); 
    image.src = img.src;  
    image.onload = function() {
      let rate = Math.max(image.height / img.height, image.width / img.width);
      canvas.width = image.width;
      canvas.height = image.height;
      const ctx = canvas.getContext("2d");
      const blurInput = document.querySelector('[name=blur]');
      const invertInput = document.querySelector('[name=invert]');
      const sepiaInput = document.querySelector('[name=sepia]');
      const saturateInput = document.querySelector('[name=saturate]');
      const hueInput = document.querySelector('[name=hue]');
      ctx.filter = `blur(${blurInput.value * rate + blurInput.dataset.sizing})
      invert(${invertInput.value + invertInput.dataset.sizing})
      sepia(${sepiaInput.value + sepiaInput.dataset.sizing})
      saturate(${saturateInput.value + saturateInput.dataset.sizing})
      hue-rotate(${hueInput.value + hueInput.dataset.sizing})`;
      ctx.drawImage(image, 0, 0);
      let link = document.createElement('a');
      link.download = 'image.png';
      link.href = canvas.toDataURL('image/png');
      link.click();
      link.delete;
    };
  }
  drawImage();
})

