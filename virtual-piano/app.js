const piano = document.querySelector('.piano');
const pianoКeys = document.querySelectorAll('.piano-key');

function playAudio(sound) {
  const audio = new Audio(`assets/audio/${sound}.mp3`);
  audio.currentTime = 0;
  audio.play();
}

piano.addEventListener('mousedown', e => {
  if(e.target.classList.contains('piano-key')) {
    e.target.classList.add('piano-key-active');
    e.target.classList.add('piano-key-active-pseudo');
    const sound = e.target.dataset.note;
    playAudio(sound);
  }
  piano.addEventListener('mouseover', mouseOver);
});

function mouseOver(e) {
  if (e.target.classList.contains('piano-key')) {
    e.target.classList.add('piano-key-active');
    e.target.classList.add('piano-key-active-pseudo');
    const sound = e.target.dataset.note;
    playAudio(sound);
  }
}

piano.addEventListener('mouseout', e => {
  e.target.classList.remove('piano-key-active');
  e.target.classList.remove('piano-key-active-pseudo');
})

window.addEventListener('mouseup', e => {
  piano.removeEventListener('mouseover', mouseOver);
  e.target.classList.remove('piano-key-active');
  e.target.classList.remove('piano-key-active-pseudo');
});

window.addEventListener('keydown', e => {
  pianoКeys.forEach(k => {
    if (k.dataset.let == e.code) {
      k.classList.add('piano-key-active');
      k.classList.add('piano-key-active-pseudo');
      if(!e.repeat){
        const sound = k.dataset.note;
        playAudio(sound);
      }  
    }
  })
})

window.addEventListener('keyup', e => {
  pianoКeys.forEach(k => {
    if (k.dataset.let == e.code) {
      k.classList.remove('piano-key-active');
    }
  })
})

document.querySelector('.btn-container').addEventListener('click', e => {
  if (e.target.classList.contains('btn-letters')) {
      pianoКeys.forEach(k => {
        k.classList.add('piano-key-letter');
      });
      e.target.classList.add('btn-active');
      document.querySelector('.btn-notes').classList.remove('btn-active');
  } else if (e.target.classList.contains('btn-notes')) {
      pianoКeys.forEach(k => {
          k.classList.remove('piano-key-letter');
      });
      e.target.classList.add('btn-active');
      document.querySelector('.btn-letters').classList.remove('btn-active');
  }
});


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
});

