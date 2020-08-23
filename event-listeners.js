function next() {
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

function previous() {
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
}

function stop() {
  audioElem.pause();
  audioElem.currentTime = 0.0;
  playBtn.setAttribute('id', 'paused');
  playBtn.textContent = 'Play';
  stopBtn.setAttribute('disabled', true);
}

function input() {
  audioElem.currentTime = this.value;
}

function play() {
  
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
}

function timeupdate() {
  const valP = (progress.value/this.duration * 100).toFixed();
  timer.textContent = `${getMinutes(audioElem.currentTime)}/${audioElem.duration ? getMinutes(audioElem.duration) : '00:00'}`;
  progress.value = audioElem.currentTime;
  progress.style.background = `linear-gradient(to right, green, #a3bbbb ${valP}%, white)`;
}

function trackended() {
  if (trackn === filesUrl.length - 1) {
    document.getElementById('next').disabled = true;
  } else {
    document.getElementById('next').disabled = false;
  }
  if (trackn === filesUrl.length - 1) {
    return gotoStart();
  };
  next()
}

function loadmetadata() {
  const valP = (progress.value/this.duration * 100).toFixed();
  timer.textContent = `${getMinutes(audioElem.currentTime)}/${getMinutes(audioElem.duration)}`;
  progress.max = audioElem.duration;
  progress.value = audioElem.currentTime;
  progress.style.background = `linear-gradient(to right, green, #a3bbbb ${valP}%, white)`;
}
