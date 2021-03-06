function padZero (time) {
  return time < 10 ? '0' + time : '' + time;
}

function gotoStart() {
  trackn = 0;
  document.getElementById('previous').disabled = true;
  document.getElementById('next').disabled = (trackn === filesUrl.length - 1);
  audioElem.src = filesUrl[trackn].url;
  play.call(playBtn)
  trackNumber.textContent = `${trackn + 1}/${filesUrl.length}`;
}

function getMinutes (currentTime) {
  const minutes = Math.floor(currentTime/60)
  const seconds = Math.floor(currentTime % 60)
  return `${padZero(minutes)}:${padZero(seconds)}`
}
