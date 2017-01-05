let countdown
const timerDisplay = document.querySelector('.display__time-left')

function timer(seconds){
  const now = Date.now()
  const then = now + seconds * 1000
  displayTimeLeft(seconds)
  countdown = setInterval(()=>{
    const secondsLeft = Math.round((then - Date.now()) / 1000)
    // console.log(secondsLeft)
    if (secondsLeft < 0) {
      clearInterval(countdown)
      return
    }
    displayTimeLeft(secondsLeft)
  },1000)
}

function displayTimeLeft(seconds){
  const minutes = Math.floor(seconds / 60)
  const remainderSceonds = seconds % 60
  const display = `${minutes}:${remainderSceonds < 10 ? "0" :''}${remainderSceonds}`
  document.title = display
  timerDisplay.textContent = display
}
