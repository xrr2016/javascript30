let countdown
const timerDisplay = document.querySelector('.display__time-left')
const endTimeDisplay = document.querySelector('.display__end-time')
const buttons = document.querySelectorAll('[data-time]')


function timer(seconds){
  clearInterval(countdown)
  const now = Date.now()
  const then = now + seconds * 1000
  displayTimeLeft(seconds)
  displayEndTime(then)
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

function displayEndTime(timestamp){
  const end = new Date(timestamp)
  const hours = end.getHours()
  const minutes = end.getMinutes()
  endTimeDisplay.textContent = `Be Back At ${hours} : ${minutes < 10 ?"0":""} ${minutes}`
}
buttons.forEach(button => {
  button.addEventListener('click',function(){
    timer(parseInt(this.dataset.time))
  })
})
document.customForm.addEventListener('submit',function(e){
  e.preventDefault()
  const minutes = this.minutes.value
  timer(minutes * 60)
  this.reset()
})
