const AudioContext = window.AudioContext || window.webkitAudioContext;
const context = new AudioContext();
const audioElem = document.querySelector('audio');
const playBtn = document.querySelector('.play-pause');
const prevBtn = document.querySelector('#previous');
const nextBtn = document.querySelector('#next');
const stopBtn = document.querySelector('#stop');
const body = document.querySelector('body');
const progressContainer = document.createElement('div');
const timer = document.createElement('h6');
const progress = document.createElement('input');
const trackContainer = document.createElement('div');
const trackNumber = document.createElement('h6');

trackNumber.style.fontSize = '12px';
trackNumber.style.fontStyle = 'italic';
trackNumber.style.fontFamily = "'Trebuchet MS', 'Lucida Sans Unicode', 'Lucida Grande', 'Lucida Sans', Arial, sans-serif"
trackContainer.className = 'timer-container';
trackContainer.append(timer)
trackContainer.append(trackNumber);

progress.type = 'range';
progress.step = 1;
progress.min = 0;
progress.value = 0;

timer.className = 'timer';
timer.textContent = '00:00/00:00';
progressContainer.className = 'timer-container';
progressContainer.style.marginTop = '200px';
progressContainer.style.marginBottom = '10px';

progressContainer.append(progress);
body.prepend(progressContainer);
body.append(trackContainer);


stopBtn.setAttribute('disabled', true);

function padZero (time) {
  return time < 10 ? '0' + time : '' + time;
}

function getMinutes(currentTime) {
  const minutes = Math.floor(currentTime/60)
  const seconds = Math.floor(currentTime % 60)
  return `${padZero(minutes)}:${padZero(seconds)}`
}


const filesUrl = [
  {
    url: './Mumford/01.mp3',
  },
  {
    url: './Mumford/02.mp3'
  },
  {
    url: './Mumford/03.mp3',
  },
  {
    url: './Mumford/04.mp3'
  },
  {
    url: './Mumford/05.mp3',
  },
  {
    url: './Mumford/06.mp3'
  },
  {
    url: './Mumford/07.mp3',
  },
  {
    url: './Mumford/08.mp3'
  },
  {
    url: './Mumford/09.mp3',
  },
  {
    url: './Mumford/10.mp3'
  },
  {
    url: './Mumford/11.mp3',
  },
  {
    url: './Mumford/12.mp3'
  },
  {
    url: './Mumford/13.mp3',
  },
  {
    url: './Mumford/14.mp3'
  }
];

let trackn = 0;
if (trackn === 0) {
  document.getElementById('previous').disabled = true;
}

trackNumber.textContent = `${trackn + 1}/${filesUrl.length}`;

audioElem.src = filesUrl[trackn].url;

function gotoStart() {
  trackn = 0;
  document.getElementById('previous').disabled = true;
  audioElem.src = filesUrl[trackn].url;
  audioElem.play();
  trackNumber.textContent = `${trackn + 1}/${filesUrl.length}`;
}

/** Event Listeners */
audioElem.addEventListener('loadedmetadata', function() {
  const valP = (progress.value/this.duration * 100).toFixed();
  timer.textContent = `${getMinutes(audioElem.currentTime)}/${getMinutes(audioElem.duration)}`;
  progress.max = audioElem.duration;
  progress.value = audioElem.currentTime;
  progress.style.background = `linear-gradient(to right, green, #a3bbbb ${valP}%, white)`;
});

audioElem.addEventListener('ended', function() {
  if (trackn === filesUrl.length - 1) {
    document.getElementById('next').disabled = true;
  } else {
    document.getElementById('next').disabled = false;
  }
  if (trackn === filesUrl.length - 1) {
    return gotoStart();
  };
  next()
});

audioElem.addEventListener('timeupdate', function() {
  const valP = (progress.value/this.duration * 100).toFixed();
  timer.textContent = `${getMinutes(audioElem.currentTime)}/${audioElem.duration ? getMinutes(audioElem.duration) : '00:00'}`;
  progress.value = audioElem.currentTime;
  progress.style.background = `linear-gradient(to right, green, #a3bbbb ${valP}%, white)`;
})

playBtn.addEventListener('click', function() {
  
  let playId = this.getAttribute('id');
  if (context.state === 'suspended') {
    context.resume();
  }

  if (playId === 'paused') {
    audioElem.play();
    this.setAttribute('id', 'playing');
    this.textContent = 'Pause';    
  } else if (playId === 'playing') {
    audioElem.pause();
    this.setAttribute('id', 'paused');
    this.textContent = 'Play';
  }

  document.getElementById('stop').disabled = false;
});

nextBtn.addEventListener('click', next);
function next () {
  timer.textContent = '00:00/00:00';
  trackn ++;
  audioElem.src = filesUrl[trackn].url;
  audioElem.play();
  audioElem.textContent = "Pause";
  document.getElementById('previous').disabled = false;
  document.getElementById('stop').disabled = false;
  if (trackn === filesUrl.length - 1) {
    document.getElementById('next').disabled = true;
  }
  trackNumber.textContent = `${trackn + 1}/${filesUrl.length}`;
}

prevBtn.addEventListener('click', function() {
  timer.textContent = '00:00/00:00';
  trackn --;
  audioElem.src = filesUrl[trackn].url;
  audioElem.play();
  audioElem.textContent = "Pause";
  document.getElementById('stop').disabled = false;
  if (trackn === 0) {
    document.getElementById('previous').disabled = true;
  }
  if (trackn < filesUrl.length - 1) {
    document.getElementById('next').disabled = false;
  }
  trackNumber.textContent = `${trackn + 1}/${filesUrl.length}`;
});

stopBtn.addEventListener('click', function () {
  audioElem.pause();
  audioElem.currentTime = 0.0;
  playBtn.setAttribute('id', 'paused');
  playBtn.textContent = 'Play';
  stopBtn.setAttribute('disabled', true);
});

progress.addEventListener('input', function() {
  audioElem.currentTime = this.value;
})
