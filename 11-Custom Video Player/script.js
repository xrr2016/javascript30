const player = document.querySelector('.player')
const video  = player.querySelector('.viewer')
const progress = player.querySelector('.progress')
const progressBar = progress.querySelector('.progress_failled')
const toggle = player.querySelector('.toggle')
const skipButtons = player.querySelectorAll('[data-skip]')
const ranges = player.querySelectorAll('.player_slider')
let mousedown = false
function togglePlay(e){
  // if(video.paused){
  //   video.play()
  // }else{
  //   video.pause()
  // }
  const method = video.paused ? 'play' : 'pause'
  if(e.keyCode === 32){
    video[method]()
  }
  video[method]()
}
function skip(){
  video.currentTime += parseFloat(this.dataset.skip)
}

function updatePlayButton(){
  const icon = this.paused ? "►" : "II"
  toggle.textContent = icon
}
function handleRangeChange(){
  video[this.name] = this.value
}
function handleProgress(){
  const percent = (video.currentTime / video.duration) * 100
  progressBar.style.flexBasis = `${percent}%`
}
function scrub(e){
  const scrubTime = (e.offsetX / progress.offsetWidth) * video.duration
  video.currentTime = scrubTime
}

video.addEventListener('click',togglePlay)
video.addEventListener('play',updatePlayButton)
video.addEventListener('pause',updatePlayButton)
video.addEventListener('timeupdate',handleProgress)
toggle.addEventListener('click',togglePlay)
skipButtons.forEach(button => {
  button.addEventListener('click',skip)
})
ranges.forEach(range => range.addEventListener('change',handleRangeChange))
ranges.forEach(range => range.addEventListener('mousemove',handleRangeChange))
progress.addEventListener('click',scrub)
progress.addEventListener('mousemove',(e) => mousedown && scrub(e))
progress.addEventListener('mousedown',() => mousedown = true)
progress.addEventListener('mouseup',() => mousedown = false)
window.addEventListener('keydown',togglePlay)
window.addEventListener('keydown',(e)=>{
  if(e.keyCode === 37){
    skipButtons[0].click()
  }else if(e.keyCode === 39){
    skipButtons[1].click()
  }
})
