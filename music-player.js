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
const timerContainer = document.createElement('div');
const trackNumber = document.createElement('h6');
const trackTitle = document.createElement('h6');
const trackTitleContainer = document.createElement('div');

trackNumber.className = 'track-number';
timerContainer.className = 'timer-container';
trackTitleContainer.className = 'track-title-container';
trackTitleContainer.append(trackTitle);
timerContainer.append(timer);
timerContainer.append(trackNumber);

progress.type = 'range';
progress.step = 1;
progress.min = 0;
progress.value = 0;

timer.className = 'timer';
timer.textContent = '00:00/00:00';
progressContainer.className = 'progress-container';
progressContainer.style.marginTop = '200px';
progressContainer.style.marginBottom = '10px';

progressContainer.append(progress);
body.prepend(progressContainer);
body.append(trackTitleContainer);
body.append(timerContainer);

stopBtn.setAttribute('disabled', true);

let trackn = 0;
if (trackn === 0) {
  document.getElementById('previous').disabled = true;
}

trackNumber.textContent = `${trackn + 1}/${filesUrl.length}`;
trackTitle.textContent = filesUrl[trackn].trackName;

audioElem.src = filesUrl[trackn].url;

/** Event Listeners */
audioElem.addEventListener('loadedmetadata', loadmetadata);

audioElem.addEventListener('ended', trackended);

audioElem.addEventListener('timeupdate', timeupdate)

playBtn.addEventListener('click', play);

nextBtn.addEventListener('click', next);

prevBtn.addEventListener('click', previous);

stopBtn.addEventListener('click', stop);

progress.addEventListener('input', input)
